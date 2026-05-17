import DocumentAnalytics from "./DocumentAnalytics";
import {
  FiUpload,
  FiZoomIn,
  FiZoomOut,
  FiSearch,
  FiCopy,
  FiMessageSquare,
} from "react-icons/fi";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  extractTextFromPDF,
  extractTextFromDocx,
  extractTextFromImage,
  extractTextFromTxt,
} from "../../services/clientTextExtractors";
import { toast } from "react-toastify";
import AIExplanation from "./AIExplanation";

const CHUNK_SIZE = 5000; // Characters per page

const UploadExtract = () => {
  // State management
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [textChunks, setTextChunks] = useState([]);
  const [isTextCopied, setIsTextCopied] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState("");
  const [processingTime, setProcessingTime] = useState(0);

  // Refs
  const textContainerRef = useRef(null);
  const contentContainerRef = useRef(null);

  // Helper functions
  const formatText = (text) => {
    if (!text) return "";

    return text
      .split("\n")
      .map((line) => {
        const leadingWhitespace = line.match(/^\s*/)[0];
        const content = line.trim();

        if (/^\d+\./.test(content)) return `${leadingWhitespace}${content}`;
        if (/^[-•*]/.test(content)) return `${leadingWhitespace}${content}`;
        if (line.includes("  ") && line.trim().split(/\s{2,}/).length > 2) {
          return line.replace(/\s{2,}/g, "    ");
        }

        return line;
      })
      .join("\n");
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // Event handlers
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection.toString().trim()) {
      setSelectedText(selection.toString().trim());
    }
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(extractedText)
      .then(() => {
        setIsTextCopied(true);
        toast.success("Text copied to clipboard!");
        setTimeout(() => setIsTextCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast.error("Failed to copy text");
      });
  };

  // File processing
  const processFile = async (file) => {
    if (!file) return;
    setError("");

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "image/jpeg",
      "image/png",
    ];

    if (!validTypes.includes(file.type)) {
      toast.error("Unsupported file type");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit");
      return false;
    }

    setIsProcessing(true);
    setFileName(file.name);
    setExtractedText("");
    setSearchTerm("");
    setZoomLevel(100);
     const startTime = performance.now();

    try {
      let text;
      switch (file.type) {
        case "application/pdf":
          text = await extractTextFromPDF(file);
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          text = await extractTextFromDocx(file);
          break;
        case "image/jpeg":
        case "image/png":
          text = await extractTextFromImage(file);
          break;
        case "text/plain":
          text = await extractTextFromTxt(file);
          break;
        default:
          throw new Error("Unsupported file type");
      }

      setExtractedText(text);
       const endTime = performance.now();
       const duration = ((endTime - startTime) / 1000).toFixed(2);
       setProcessingTime(duration);
      toast.success("Text extracted successfully!");
      return true;
    } catch (error) {
      console.error("Extraction error:", error);
      setError(
        `${file.name} is damaged or cannot be opened. Please try a different file.`
      );
      toast.error(error.message || "Failed to extract text");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (e) => {
    await processFile(e.target.files[0]);
  };

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback(async (acceptedFiles) => {
      if (acceptedFiles?.length > 0) await processFile(acceptedFiles[0]);
    }, []),
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  // Effects
  useEffect(() => {
    const container = textContainerRef.current;
    if (container) {
      container.addEventListener("mouseup", handleTextSelection);
      return () =>
        container.removeEventListener("mouseup", handleTextSelection);
    }
  }, [handleTextSelection]);

  useEffect(() => {
    if (extractedText) {
      const formattedText = formatText(extractedText);
      const chunks = [];
      for (let i = 0; i < formattedText.length; i += CHUNK_SIZE) {
        chunks.push(formattedText.substring(i, i + CHUNK_SIZE));
      }
      setTextChunks(chunks);
      setCurrentPage(1);
    }
  }, [extractedText]);

  useEffect(() => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  // Render functions
  const highlightText = (text) => {
    if (!text) return null;

    return text.split(/\n\s*\n/).map((section, i) => {
      if (/^#\s/.test(section)) {
        return (
          <h1 key={i} className="document-title">
            {section.replace(/^#\s/, "")}
          </h1>
        );
      } else if (/^##\s/.test(section)) {
        return (
          <h2 key={i} className="document-section">
            {section.replace(/^##\s/, "")}
          </h2>
        );
      } else if (/^###\s/.test(section)) {
        return (
          <h3 key={i} className="document-subsection">
            {section.replace(/^###\s/, "")}
          </h3>
        );
      } else if (
        /^\*\s/.test(section) ||
        /^-\s/.test(section) ||
        /^\d+\.\s/.test(section)
      ) {
        return (
          <ul key={i} className="document-list">
            {section.split("\n").map((item, j) => (
              <li key={j} className="document-list-item">
                {item.replace(/^[*-]\s|^\d+\.\s/, "")}
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <p key={i} className="document-paragraph">
            {section}
          </p>
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
          <FiUpload className="text-blue-500" />
          Upload & Extract
        </h2>
        <p className="text-gray-400">Upload documents and extract text instantly</p>
      </div>

      {/* File Upload Dropzone */}
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
          isDragActive
            ? "border-cyan-500 bg-cyan-500/10 scale-105"
            : "border-zinc-700 bg-zinc-800/30 hover:border-cyan-500/50 hover:bg-zinc-800/50"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ y: isDragActive ? 0 : [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiUpload
            className={`mx-auto h-16 w-16 mb-4 ${
              isDragActive ? "text-cyan-400" : "text-blue-500"
            }`}
          />
        </motion.div>
        <p className="text-lg font-semibold text-white mb-1">
          {isDragActive ? "Drop your file here" : "Drop files here to upload"}
        </p>
        <p className="text-gray-400 text-sm mb-6">
          or click to browse from your computer
        </p>
        <button
          className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
            isProcessing
              ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/30"
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              ⟳
            </motion.span>
          ) : (
            "Select File"
          )}
        </button>
        <p className="mt-4 text-xs text-gray-500">
          Supports PDF, DOCX, TXT, JPG, PNG (Max 10MB)
        </p>
      </motion.div>

      {/* Document Processing Section */}
      {(extractedText || isProcessing) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl backdrop-blur-sm"
        >
          {/* Header with filename and controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-zinc-800">
            <div>
              <h4 className="font-semibold text-white truncate max-w-full flex items-center gap-2">
                {isProcessing && (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⟳
                  </motion.span>
                )}
                {fileName}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{textChunks.length} pages</p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {/* Zoom Controls */}
              <div className="flex items-center bg-zinc-800 rounded-lg p-1">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded hover:bg-zinc-700 transition-colors text-gray-400 hover:text-cyan-400"
                  title="Zoom Out"
                  disabled={isProcessing}
                >
                  <FiZoomOut />
                </button>
                <span className="px-2 text-sm text-gray-300">{zoomLevel}%</span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded hover:bg-zinc-700 transition-colors text-gray-400 hover:text-cyan-400"
                  title="Zoom In"
                  disabled={isProcessing}
                >
                  <FiZoomIn />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${
                    isTextCopied
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-zinc-800 text-gray-300 hover:text-cyan-300 hover:border-cyan-500/30 border border-zinc-700"
                  }`}
                  title="Copy to Clipboard"
                  disabled={isProcessing}
                >
                  <FiCopy size={16} />
                  <span className="hidden sm:inline">{isTextCopied ? "Copied!" : "Copy"}</span>
                </motion.button>

                <motion.button
                  onClick={() => setShowExplanation(!showExplanation)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${
                    showExplanation
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-zinc-800 text-gray-300 hover:text-blue-300 hover:border-blue-500/30 border border-zinc-700"
                  }`}
                  disabled={isProcessing}
                >
                  <FiMessageSquare size={16} />
                  <span className="hidden sm:inline">{showExplanation ? "AI On" : "AI"}</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search in document..."
              className="pl-10 pr-4 py-2 w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              value={searchTerm}
              onChange={handleSearch}
              disabled={isProcessing}
            />
            {searchTerm && searchResults.length > 0 && (
              <div className="absolute right-3 top-2.5 flex items-center gap-1 text-xs bg-zinc-700 text-gray-300 px-2 py-1 rounded">
                {searchResults.length > 0
                  ? `${currentSearchIndex + 1}/${searchResults.length}`
                  : "0/0"}
              </div>
            )}
          </div>

          {/* Document Content */}
          <div
            ref={contentContainerRef}
            className="p-3 rounded border border-gray-200 min-h-[200px] max-h-[400px] sm:max-h-[500px] overflow-auto bg-white shadow-inner"
            style={{
              fontFamily: "monospace",
              fontSize: `${zoomLevel}%`,
              lineHeight: "1.5",
            }}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div
                ref={textContainerRef}
                className="prose max-w-none"
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "inherit",
                }}
              >
                {highlightText(textChunks[currentPage - 1] || extractedText)}
              </div>
            )}
          </div>

          {/* Document Stats */}
          {!isProcessing && extractedText && (
            <div className="mt-3 flex flex-wrap justify-between items-center text-sm text-gray-500 bg-gray-50 p-2 rounded">
              <div className="flex gap-3">
                <span>Characters: {extractedText.length.toLocaleString()}</span>
                <span>
                  Words:{" "}
                  {extractedText
                    .split(/\s+/)
                    .filter(Boolean)
                    .length.toLocaleString()}
                </span>
              </div>
              <div className="mt-1 sm:mt-0 text-xs text-gray-400">
                Page {currentPage} of {textChunks.length || 1}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Analytics Section */}
      {!isProcessing && extractedText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DocumentAnalytics text={extractedText} processingTime={processingTime} />
        </motion.div>
      )}

      {showExplanation && !isProcessing && extractedText && (
        <div className="mt-2 animate-fade-in">
          <AIExplanation
            selectedText={selectedText}
            fullText={extractedText}
            onClose={() => setShowExplanation(false)}
            disabled={isProcessing}
          />
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadExtract;
