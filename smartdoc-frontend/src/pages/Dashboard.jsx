import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  FiUpload,
  FiFileText,
  FiMessageSquare,
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiMoon,
  FiSun,
  FiBell,
  FiGlobe,
  FiEdit,
  FiClock,
  FiLayers,
  FiLogOut,
} from "react-icons/fi";
import UploadExtract from "../components/Dashboard-Components/UploadExtract";
import Summarize from "../components/Dashboard-Components/Summarize";
import AIQnA from "../components/Dashboard-Components/AIQnA";
import SmartWriter from "../components/Dashboard-Components/SmartWriter";
import RecentDocuments from "../components/Dashboard-Components/RecentDocuments";

const Dashboard = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recent");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  const { darkMode, setDarkMode } = useTheme();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const tabs = [
    {
      id: "recent",
      name: "Recent Documents",
      icon: <FiClock />,
      component: <RecentDocuments />,
    },
    {
      id: "upload",
      name: "Upload & Extract",
      icon: <FiUpload />,
      component: <UploadExtract />,
    },
    {
      id: "summarize",
      name: "Summarize",
      icon: <FiMessageSquare />,
      component: <Summarize />,
    },
    { id: "qa", name: "AI Q&A", icon: <FiFileText />, component: <AIQnA /> },
    {
      id: "generate",
      name: "SmartWriter",
      icon: <FiEdit />,
      component: <SmartWriter />,
    },
  ];

  const extractNameFromEmail = (email) => {
    if (!email) return "User";
    const username = email.split("@")[0];
    const cleanName = username.replace(/[^a-zA-Z]/g, " ");
    return (
      cleanName
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || "User"
    );
  };

  const getUserPicture = () => {
    if (user?.picture) return user.picture;
    if (user?.email) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        extractNameFromEmail(user.email)
      )}&background=4f46e5&color=fff`;
    }
    return `https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff`;
  };

  const getUserName = () => {
    if (user?.name && !user.name.includes("@")) return user.name;
    if (user?.email) return extractNameFromEmail(user.email);
    return "User";
  };

  function howToUse() {
    navigate("/how-to-use");
  }

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-white"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-zinc-400">Loading your workspace…</span>
        </div>
      </div>
    );
  }

  const activeTabName = tabs.find((t) => t.id === activeTab)?.name;

  return (
    <div
      className="flex h-screen bg-white overflow-hidden text-[#0f0f12]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@700;800&display=swap');
        .font-fraunces { font-family: 'Fraunces', Georgia, serif !important; }
        .font-syne     { font-family: 'Syne', sans-serif !important; }
        ::selection    { background: #e0e7ff; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #c7d2fe; border-radius: 99px; }
        .nav-btn { transition: background 0.15s, color 0.15s; }
        .nav-btn:hover { background: #f5f3ff; color: #4f46e5; }
        .nav-btn.active { background: #eef2ff; color: #4f46e5; border-left: 2px solid #4f46e5; }
      `}</style>

      {/* ── MOBILE BACKDROP ── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-60 flex flex-col bg-white border-r border-zinc-100 transform ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:relative lg:flex`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <FiLayers className="text-white text-sm" />
            </div>
            <span
              className="text-base font-bold text-[#0f0f12] tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              IntelliDocs
            </span>
          </div>
          <button
            className="lg:hidden text-zinc-400 hover:text-zinc-600"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* User card */}
        <div className="px-4 py-4 border-b border-zinc-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 hover:bg-indigo-50/50 transition-colors cursor-default">
            <img
              src={getUserPicture()}
              alt="User"
              className="w-9 h-9 rounded-full ring-2 ring-indigo-100 shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  getUserName()
                )}&background=4f46e5&color=fff`;
              }}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0f0f12] truncate">{getUserName()}</p>
              <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-zinc-400 px-3 mb-3">
            Workspace
          </p>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileSidebarOpen(false);
              }}
              className={`nav-btn flex items-center w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium gap-3 ${
                activeTab === tab.id ? "active" : "text-zinc-500"
              }`}
            >
              <span className={`text-base ${activeTab === tab.id ? "text-indigo-600" : "text-zinc-400"}`}>
                {tab.icon}
              </span>
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 py-4 border-t border-zinc-100 space-y-0.5">
          <button
            onClick={howToUse}
            className="nav-btn flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 gap-3"
          >
            <FiHelpCircle className="text-zinc-400 text-base" />
            How to use
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="nav-btn flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 gap-3"
          >
            <FiSettings className="text-zinc-400 text-base" />
            Settings
          </button>
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 gap-3 hover:bg-rose-50 hover:text-rose-500 transition-colors"
          >
            <FiLogOut className="text-base" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#fafafa]">

        {/* Top bar */}
        <header className="bg-white border-b border-zinc-100 z-10 shrink-0">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-zinc-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <FiMenu size={20} />
            </button>

            {/* Page title — eyebrow style */}
            <div className="flex items-center gap-3 ml-1 lg:ml-0">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.16em] text-indigo-600 uppercase">
                <span className="w-4 h-px bg-indigo-600 inline-block" />
                {activeTabName}
              </span>
              <span className="sm:hidden text-base font-semibold text-[#0f0f12]">{activeTabName}</span>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={howToUse}
                title="How to use"
                className="p-2 rounded-lg text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <FiHelpCircle size={18} />
              </button>
              <button
                onClick={() => setIsOpen(true)}
                title="Settings"
                className="p-2 rounded-lg text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <FiSettings size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-7">
          <div className="max-w-7xl mx-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden"
            >
              {tabs.find((t) => t.id === activeTab)?.component}
            </motion.div>
          </div>
        </main>
      </div>

      {/* ── SETTINGS MODAL ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative bg-white rounded-2xl shadow-2xl shadow-zinc-200/80 w-full max-w-md max-h-[90vh] overflow-hidden border border-zinc-100"
            >
              {/* Modal header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-100">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.16em] text-indigo-600 uppercase">
                    Preferences
                  </span>
                  <h3
                    className="text-xl font-black text-[#0f0f12] leading-tight mt-0.5"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    Settings
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Modal body */}
              <div className="px-6 py-6 space-y-5 overflow-y-auto">

                {/* Dark mode */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                  <div className="flex items-center gap-3">
                    {darkMode
                      ? <FiSun className="text-amber-500 text-lg" />
                      : <FiMoon className="text-indigo-500 text-lg" />}
                    <div>
                      <p className="text-sm font-semibold text-[#0f0f12]">Dark Mode</p>
                      <p className="text-xs text-zinc-400">Switch the interface theme</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ${
                      darkMode ? "bg-indigo-600" : "bg-zinc-200"
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-5 h-5 bg-white rounded-full shadow-sm"
                      animate={{ x: darkMode ? 20 : 0 }}
                    />
                  </button>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <FiBell className="text-indigo-500 text-lg" />
                    <div>
                      <p className="text-sm font-semibold text-[#0f0f12]">Notifications</p>
                      <p className="text-xs text-zinc-400">Get alerts when analysis is ready</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>

                {/* Language */}
                <div className="p-4 rounded-xl border border-zinc-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <FiGlobe className="text-indigo-500 text-lg" />
                    <div>
                      <p className="text-sm font-semibold text-[#0f0f12]">Language</p>
                      <p className="text-xs text-zinc-400">Choose your preferred language</p>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-zinc-50 text-[#0f0f12] border border-zinc-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>

              {/* Modal footer */}
              <div className="px-6 py-4 border-t border-zinc-100 flex justify-between items-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                >
                  Save changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;