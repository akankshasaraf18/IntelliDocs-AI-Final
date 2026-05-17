import { motion } from "framer-motion";
import { FiBarChart2, FiClock, FiFileText, FiZap } from "react-icons/fi";

const DocumentAnalytics = ({ text, processingTime }) => {
  const calculateAnalytics = (documentText) => {
    if (!documentText) {
      return {
        wordCount: 0,
        charCount: 0,
        paragraphCount: 0,
        averageWordLength: 0,
        readingTime: 0,
        complexity: "N/A",
        pageCount: 0,
      };
    }

    const words = documentText.trim().split(/\s+/);
    const wordCount = words.length;
    const charCount = documentText.length;
    const paragraphs = documentText.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    const paragraphCount = paragraphs.length;
    const totalChars = words.reduce((sum, word) => sum + word.length, 0);
    const averageWordLength = wordCount > 0 ? totalChars / wordCount : 0;
    const readingTimeMinutes = Math.ceil(wordCount / 200);

    let complexity = "Simple";
    if (averageWordLength > 6) {
      complexity = "Complex";
    } else if (averageWordLength > 4.5) {
      complexity = "Moderate";
    }

    const pageCount = Math.ceil(wordCount / 250);

    return {
      wordCount,
      charCount,
      paragraphCount,
      averageWordLength,
      readingTime: readingTimeMinutes,
      complexity,
      pageCount,
    };
  };

  const analytics = calculateAnalytics(text);

  const metrics = [
    {
      label: "Word Count",
      value: analytics.wordCount.toLocaleString(),
      icon: <FiFileText className="text-xl" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Pages",
      value: analytics.pageCount,
      icon: <FiBarChart2 className="text-xl" />,
      color: "from-violet-500 to-purple-500",
    },
    {
      label: "Reading Time",
      value: `${analytics.readingTime} min`,
      icon: <FiClock className="text-xl" />,
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Complexity",
      value: analytics.complexity,
      icon: <FiZap className="text-xl" />,
      color: "from-emerald-500 to-green-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${metric.color} p-0.5 rounded-xl`}
          >
            <div className="bg-zinc-900 p-4 rounded-[10px] h-full flex flex-col justify-between hover:bg-zinc-800/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  {metric.icon}
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-medium mb-1">{metric.label}</p>
                <p className="text-white text-2xl font-bold">{metric.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FiBarChart2 className="text-cyan-500" />
          Detailed Breakdown
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50">
            <p className="text-gray-400 text-sm mb-1">Characters</p>
            <p className="text-white text-xl font-semibold">{analytics.charCount.toLocaleString()}</p>
          </div>

          <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50">
            <p className="text-gray-400 text-sm mb-1">Paragraphs</p>
            <p className="text-white text-xl font-semibold">{analytics.paragraphCount}</p>
          </div>

          <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50">
            <p className="text-gray-400 text-sm mb-1">Avg Word Length</p>
            <p className="text-white text-xl font-semibold">
              {analytics.averageWordLength.toFixed(1)} chars
            </p>
          </div>
        </div>
      </motion.div>

      {processingTime && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4"
        >
          <p className="text-gray-400 text-sm">Processing Duration</p>
          <p className="text-white font-semibold">{processingTime}s</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DocumentAnalytics;