import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText, FiFile, FiImage, FiMoreHorizontal,
  FiTrash2, FiDownload, FiLayers, FiArrowRight,
  FiClock, FiCheckCircle, FiLoader,
} from "react-icons/fi";
import { useState } from "react";

const RecentDocuments = () => {
  const [hoveredDoc, setHoveredDoc] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  // Mock recent documents data
  const recentDocs = [
    {
      id: 1,
      name: "Q1_Financial_Report.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "Today",
      status: "processed",
      pages: 24,
      uploadTime: "2 hours ago",
    },
    {
      id: 2,
      name: "Research_Paper_2024.docx",
      type: "DOCX",
      size: "1.8 MB",
      uploadDate: "Yesterday",
      status: "processed",
      pages: 18,
      uploadTime: "1 day ago",
    },
    {
      id: 3,
      name: "Contract_Review.pdf",
      type: "PDF",
      size: "0.9 MB",
      uploadDate: "2 days ago",
      status: "processing",
      pages: 12,
      uploadTime: "2 days ago",
    },
    {
      id: 4,
      name: "Medical_Notes.txt",
      type: "TXT",
      size: "0.3 MB",
      uploadDate: "3 days ago",
      status: "processed",
      pages: 5,
      uploadTime: "3 days ago",
    },
    {
      id: 5,
      name: "Meeting_Transcript.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: "1 week ago",
      status: "processed",
      pages: 8,
      uploadTime: "1 week ago",
    },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case "PDF":   return <FiFile className="text-rose-500" />;
      case "DOCX":  return <FiFileText className="text-indigo-500" />;
      case "TXT":   return <FiFileText className="text-zinc-400" />;
      case "IMG":   return <FiImage className="text-violet-500" />;
      default:      return <FiFile className="text-zinc-400" />;
    }
  };

  const typeConfig = {
    PDF:  { bg: "bg-rose-50",   text: "text-rose-600",   border: "border-rose-200"   },
    DOCX: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
    TXT:  { bg: "bg-zinc-100",  text: "text-zinc-500",   border: "border-zinc-200"   },
  };

  const getStatusBadge = (status) => {
    if (status === "processed") return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-200">
        <FiCheckCircle size={11} /> Processed
      </span>
    );
    if (status === "processing") return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-200">
        <FiLoader size={11} className="animate-spin" /> Processing
      </span>
    );
    return null;
  };

  const totalDocs      = recentDocs.length;
  const processedCount = recentDocs.filter(d => d.status === "processed").length;
  const processingCount= recentDocs.filter(d => d.status === "processing").length;

  return (
    <div
      className="min-h-screen bg-white text-[#0f0f12]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@700;800&display=swap');
        .font-fraunces { font-family: 'Fraunces', Georgia, serif !important; }
        .font-syne     { font-family: 'Syne', sans-serif !important; }
        ::selection { background: #e0e7ff; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #c7d2fe; }
        .row-hover { transition: background 0.18s, box-shadow 0.18s; }
        .row-hover:hover { background: #f5f3ff; }
      `}</style>

      {/* ── HERO HEADER ── */}
      <div className="border-b border-zinc-100 bg-white px-8 pt-14 pb-10 relative overflow-hidden">
        {/* big faded watermark */}
        <div
          className="pointer-events-none select-none absolute -top-4 -right-6 text-[120px] font-black leading-none text-zinc-50"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          aria-hidden="true"
        >
          DOCS
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {/* eyebrow */}
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-indigo-600 uppercase mb-5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="w-5 h-px bg-indigo-600 inline-block" />
            Your Library
          </span>

          {/* main heading */}
          <h1
            className="font-fraunces text-5xl sm:text-6xl font-black leading-[1.0] mb-3 text-[#0f0f12]"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Recent{" "}
            <span className="text-indigo-600 italic">Documents.</span>
          </h1>
          <p className="text-zinc-400 text-[15px] leading-relaxed max-w-md">
            Everything you've uploaded — summarized, analyzed, and waiting for you.
          </p>
        </motion.div>

        {/* ── STATS STRIP ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-10 mt-10 pt-8 border-t border-zinc-100"
        >
          {[
            { num: totalDocs,       label: "Total documents" },
            { num: processedCount,  label: "Processed" },
            { num: processingCount, label: "In progress" },
          ].map((s, i) => (
            <div key={i}>
              <div
                className="text-4xl font-black text-[#0f0f12] leading-none"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {s.num}
              </div>
              <div className="text-xs text-zinc-400 mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="px-8 py-10">

        {/* ── DESKTOP TABLE ── */}
        <div className="hidden md:block">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_100px_80px_140px_160px_100px] gap-4 px-5 pb-3 border-b border-zinc-100">
            {["File", "Type", "Pages", "Uploaded", "Status", "Actions"].map((h, i) => (
              <div
                key={i}
                className={`text-[11px] font-bold tracking-[0.14em] uppercase text-zinc-400 ${i === 5 ? "text-right" : ""}`}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-zinc-50">
            {recentDocs.map((doc, index) => {
              const tc = typeConfig[doc.type] || typeConfig.TXT;
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  onMouseEnter={() => setHoveredDoc(doc.id)}
                  onMouseLeave={() => setHoveredDoc(null)}
                  className="row-hover grid grid-cols-[2fr_100px_80px_140px_160px_100px] gap-4 items-center px-5 py-5 rounded-xl cursor-default"
                >
                  {/* File name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${tc.bg} flex items-center justify-center text-lg shrink-0`}>
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="font-semibold text-[#0f0f12] truncate text-[14px]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {doc.name}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">{doc.size}</p>
                    </div>
                  </div>

                  {/* Type badge */}
                  <div>
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-bold ${tc.bg} ${tc.text} border ${tc.border}`}>
                      {doc.type}
                    </span>
                  </div>

                  {/* Pages */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-[14px] font-medium text-[#0f0f12]">
                      {doc.pages}
                    </span>
                    <span className="text-zinc-400 text-xs">pg</span>
                  </div>

                  {/* Uploaded */}
                  <div>
                    <p className="text-[13px] font-semibold text-[#0f0f12]">{doc.uploadDate}</p>
                    <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
                      <FiClock size={10} />{doc.uploadTime}
                    </p>
                  </div>

                  {/* Status */}
                  <div>{getStatusBadge(doc.status)}</div>

                  {/* Actions */}
                  <div className="flex justify-end items-center gap-1">
                    <AnimatePresence>
                      {hoveredDoc === doc.id ? (
                        <motion.div
                          key="actions"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-1"
                        >
                          <button className="p-2 rounded-xl hover:bg-indigo-50 text-zinc-400 hover:text-indigo-600 transition-colors">
                            <FiDownload size={14} />
                          </button>
                          <button className="p-2 rounded-xl hover:bg-rose-50 text-zinc-400 hover:text-rose-500 transition-colors">
                            <FiTrash2 size={14} />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="dots"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-2 text-zinc-300 hover:text-zinc-500 transition-colors"
                        >
                          <FiMoreHorizontal size={16} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE CARDS ── */}
        <div className="md:hidden space-y-3">
          {recentDocs.map((doc, index) => {
            const tc = typeConfig[doc.type] || typeConfig.TXT;
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className="border border-zinc-100 rounded-2xl p-4 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${tc.bg} flex items-center justify-center text-lg shrink-0`}>
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#0f0f12] truncate text-sm">{doc.name}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{doc.size} · {doc.pages} pages</p>
                    </div>
                  </div>
                  <button className="p-1.5 text-zinc-300 hover:text-zinc-500 transition-colors ml-2 shrink-0">
                    <FiMoreHorizontal size={15} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <FiClock size={10} />
                    {doc.uploadTime}
                  </div>
                  {getStatusBadge(doc.status)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── EMPTY STATE ── */}
        {recentDocs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-28 border border-dashed border-zinc-200 rounded-3xl mt-4"
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FiFile className="text-2xl text-indigo-400" />
            </div>
            <p
              className="text-3xl font-black text-[#0f0f12] mb-2"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Nothing here yet.
            </p>
            <p className="text-zinc-400 text-sm mb-6">Upload a document to get started.</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors">
              Upload a document <FiArrowRight />
            </button>
          </motion.div>
        )}

        {/* ── FOOTER NOTE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-zinc-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
              <FiLayers className="text-white text-xs" />
            </div>
            <span
              className="text-sm font-bold text-zinc-400"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              IntelliDocs
            </span>
          </div>
          <span className="text-xs text-zinc-300">
            All documents are processed securely · Zero storage
          </span>
        </motion.div>

      </div>
    </div>
  );
};

export default RecentDocuments;