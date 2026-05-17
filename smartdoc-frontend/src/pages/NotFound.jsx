import React from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaCompass, FaHome, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { RiErrorWarningFill } from "react-icons/ri";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const rocketVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 flex flex-col items-center justify-center p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl w-full text-center"
      >
        {/* Animated 404 Icon */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <TbError404 className="text-9xl text-blue-500 opacity-20" />
            <RiErrorWarningFill className="text-6xl text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </motion.div>

        {/* Floating Rocket Animation */}
        <motion.div variants={rocketVariants} animate="float" className="mb-10">
          <FaRocket className="text-6xl text-violet-500 mx-auto" />
        </motion.div>

        {/* Main Message */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold text-white mb-6"
        >
          Lost in Space?
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          The page you're looking for doesn't exist or has been moved. Don't
          worry, we'll help you find your way back!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link
            to="/"
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg shadow-lg hover:shadow-blue-500/50 transition transform hover:-translate-y-1"
          >
            <FaHome className="mr-2" />
            Return Home
          </Link>
          <Link
            to="/"
            className="flex items-center px-6 py-3 bg-zinc-800 text-white rounded-lg shadow-lg hover:bg-zinc-700 border border-zinc-700 transition transform hover:-translate-y-1"
          >
            <FaCompass className="mr-2" />
            Go to Dashboard
          </Link>
        </motion.div>

        {/* Animated Search Illustration */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full px-6 py-4 pr-12 border border-zinc-700 bg-zinc-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                <FaSearch className="text-xl" />
              </button>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Try searching for what you need or check out our{" "}
            <Link to="/sitemap" className="text-indigo-600 hover:underline">
              sitemap
            </Link>
          </p>
        </motion.div>

        {/* Fun Animated Elements */}
        <motion.div
          variants={containerVariants}
          className="flex justify-center space-x-6 mt-12"
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <motion.div
              key={item}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: item * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  },
                },
                hover: { scale: 1.1 },
              }}
              whileHover="hover"
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-indigo-500 cursor-pointer"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
