import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"
      />
    </div>
  );
}