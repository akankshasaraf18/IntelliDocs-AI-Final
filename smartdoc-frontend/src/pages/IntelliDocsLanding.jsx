import { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiUpload, FiFileText, FiMessageSquare, FiShield,
  FiMenu, FiX, FiBarChart2, FiHelpCircle,
  FiTrendingUp, FiZap, FiCheckCircle, FiBookOpen,
  FiBriefcase, FiClipboard, FiActivity, FiEdit3, FiTool,
  FiArrowRight, FiLayers, FiCpu, FiAlignLeft,
} from "react-icons/fi";

const IntelliDocsLanding = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -80]);

  useEffect(() => {
    if (isAuthenticated && !isLoading) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  const go = () =>
    isAuthenticated
      ? navigate("/dashboard")
      : loginWithRedirect({ appState: { returnTo: "/dashboard" } });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  const capabilities = [
    { num: "01", title: "Executive Summary", body: "Compress 40-page reports into a 200-word brief a board can act on. AI handles the heavy lifting.", accent: "indigo" },
    { num: "02", title: "Deep Insight Mining", body: "Surface buried patterns, sentiment shifts, and recurring signals your eye would miss on a first read.", accent: "violet" },
    { num: "03", title: "Topic Mapping", body: "Every entity, concept, and theme — ranked by relevance and cross-linked across the entire document.", accent: "sky" },
    { num: "04", title: "Research Extraction", body: "Pull data points, methodology, and conclusions from academic papers into a clean structured output.", accent: "emerald" },
    { num: "05", title: "Inquiry Generator", body: "Let the AI suggest questions that push your analysis further — great for researchers and analysts.", accent: "rose" },
    { num: "06", title: "Document Metrics", body: "Reading time, vocabulary density, complexity index — know what you're dealing with at a glance.", accent: "amber" },
  ];

  const accentMap = {
    indigo:  { text: "text-indigo-600",  dot: "bg-indigo-500" },
    violet:  { text: "text-violet-600",  dot: "bg-violet-500" },
    sky:     { text: "text-sky-600",     dot: "bg-sky-500" },
    emerald: { text: "text-emerald-600", dot: "bg-emerald-500" },
    rose:    { text: "text-rose-600",    dot: "bg-rose-500" },
    amber:   { text: "text-amber-600",   dot: "bg-amber-500" },
  };

  const useCases = [
    { icon: <FiBookOpen />, label: "Research Papers" },
    { icon: <FiBriefcase />, label: "Business Reports" },
    { icon: <FiClipboard />, label: "Legal Contracts" },
    { icon: <FiActivity />, label: "Medical Records" },
    { icon: <FiEdit3 />, label: "Study Notes" },
    { icon: <FiTool />, label: "Tech Docs" },
    { icon: <FiAlignLeft />, label: "News Articles" },
    { icon: <FiFileText />, label: "Whitepapers" },
  ];

  const marqueeItems = [...useCases, ...useCases];

  return (
    <div className="bg-white text-[#0f0f12] overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@700;800&display=swap');
        .font-fraunces { font-family: 'Fraunces', Georgia, serif; }
        .font-syne     { font-family: 'Syne', sans-serif; }
        ::selection { background: #e0e7ff; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #c7d2fe; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 22s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .ink-line { position: relative; padding-bottom: 2px; }
        .ink-line::after { content: ''; display: block; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: #4f46e5; transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
        .ink-line:hover::after { transform: scaleX(1); }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FiLayers className="text-white text-sm" />
            </div>
            <span className="font-syne font-bold text-[#0f0f12] text-base tracking-tight">IntelliDocs</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#capabilities" className="ink-line text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Features</a>
            <a href="#works-for" className="ink-line text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Use Cases</a>
            <a href="#trust" className="ink-line text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Privacy</a>
            <button onClick={go} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors">
              {isAuthenticated ? "Dashboard →" : "Try Free →"}
            </button>
          </div>
          <button className="md:hidden text-zinc-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden bg-white border-t border-zinc-100">
              <div className="px-5 py-4 flex flex-col gap-4">
                <a href="#capabilities" className="text-sm text-zinc-600">Features</a>
                <a href="#works-for" className="text-sm text-zinc-600">Use Cases</a>
                <a href="#trust" className="text-sm text-zinc-600">Privacy</a>
                <button onClick={go} className="py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl">{isAuthenticated ? "Dashboard" : "Try Free"}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <motion.section ref={heroRef} style={{ y: heroParallax }} className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-5 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-8 -left-4 font-fraunces text-[18vw] font-black text-zinc-50 leading-none select-none" aria-hidden="true">DOCS</div>
        <div className="pointer-events-none absolute top-1/3 right-0 w-[45vw] h-[45vw] bg-indigo-100/60 rounded-full blur-[100px]" />

        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-8">
            <span className="w-6 h-px bg-indigo-600" /> AI Document Intelligence
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }} className="font-fraunces text-6xl sm:text-8xl md:text-[104px] font-black leading-[0.95] mb-8 tracking-tight">
            Every doc,<br />
            <span className="text-indigo-600 italic">fully</span><br />
            understood.
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }} className="max-w-xl text-zinc-500 text-lg sm:text-xl leading-relaxed mb-10">
            Upload any PDF, Word file, or image. IntelliDocs extracts what matters — summaries, themes, questions, data points — so you can think, not just read.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button onClick={go} className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold rounded-2xl transition-all duration-200 shadow-[0_8px_30px_rgba(79,70,229,0.35)] hover:shadow-[0_12px_40px_rgba(79,70,229,0.5)]">
              <FiUpload className="text-lg" />
              {isAuthenticated ? "Open Dashboard" : "Upload a Document"}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-zinc-400 text-sm">Free · No card needed · Open source</span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-zinc-100 pt-8">
            {[["PDF · DOCX · TXT · Images", "All formats"], ["Zero Storage", "Your data stays yours"], ["Open Source", "Fully auditable"]].map(([val, label], i) => (
              <div key={i}>
                <div className="font-syne font-bold text-sm text-[#0f0f12]">{val}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* MARQUEE STRIP */}
      <div id="works-for" className="bg-zinc-950 py-5 overflow-hidden border-y border-zinc-800">
        <div className="flex whitespace-nowrap marquee-track">
          {marqueeItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 px-8 text-zinc-300 text-sm font-medium shrink-0">
              <span className="text-indigo-400 text-base">{item.icon}</span>
              <span>{item.label}</span>
              <span className="ml-4 text-zinc-700">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* CAPABILITIES — alternating numbered rows */}
      <section id="capabilities" className="py-28 px-5 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">What it does</span>
              <h2 className="font-fraunces text-5xl sm:text-6xl font-black mt-3 leading-tight">
                Six ways to <br /><span className="italic text-indigo-600">know faster.</span>
              </h2>
            </div>
            <p className="text-zinc-500 max-w-xs text-base leading-relaxed md:text-right">
              Every feature built around one goal — less time reading, more time acting on what you found.
            </p>
          </div>

          <div className="divide-y divide-zinc-200">
            {capabilities.map((cap, i) => {
              const c = accentMap[cap.accent];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-7 hover:bg-white transition-colors duration-300 px-4 -mx-4 rounded-xl cursor-default"
                >
                  <span className={`font-syne font-bold text-5xl ${c.text} opacity-20 group-hover:opacity-100 transition-opacity duration-300 w-16 shrink-0 leading-none`}>
                    {cap.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-syne font-bold text-xl text-[#0f0f12] mb-1">{cap.title}</h3>
                    <p className="text-zinc-500 text-[15px] leading-relaxed">{cap.body}</p>
                  </div>
                  <div className={`hidden sm:flex w-2 h-2 rounded-full ${c.dot} shrink-0 opacity-0 group-hover:opacity-100 transition-opacity`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL-BLEED QUOTE SECTION */}
      <section className="bg-indigo-600 py-28 px-5 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.5) 39px,rgba(255,255,255,.5) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.5) 39px,rgba(255,255,255,.5) 40px)" }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="font-fraunces text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-10">
              "I used to spend four hours reading a report.
              <span className="italic text-indigo-200"> Now it takes four minutes."</span>
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg"><FiCpu /></div>
              <div>
                <div className="text-white font-semibold text-sm">Powered by advanced LLMs</div>
                <div className="text-indigo-200 text-xs">Understands context, not just keywords</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRIVACY — horizontal two-column */}
      <section id="trust" className="py-28 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-16">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:w-1/2">
              <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6">
                <FiShield className="text-4xl text-indigo-600" />
              </div>
              <h2 className="font-fraunces text-5xl font-black leading-tight mb-4">Your data never leaves your hands.</h2>
              <p className="text-zinc-500 text-lg leading-relaxed">Documents are processed in-memory and immediately discarded. No profiles, no selling, no ads. Since IntelliDocs is open source, you can verify every claim yourself.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:w-1/2 flex flex-col gap-4">
              {[
                { emoji: "🔒", title: "Encrypted in Transit", sub: "TLS on every request — nothing travels in plain text." },
                { emoji: "🗑️", title: "Zero Persistence", sub: "Files are discarded the moment processing completes." },
                { emoji: "👁️", title: "No Tracking", sub: "No analytics pixels, no fingerprinting, no ad networks." },
                { emoji: "🌐", title: "Open Source", sub: "Every line of code is public and auditable on GitHub." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                  <span className="text-2xl mt-0.5">{item.emoji}</span>
                  <div>
                    <div className="font-semibold text-[#0f0f12] text-sm">{item.title}</div>
                    <div className="text-zinc-400 text-sm mt-0.5">{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-5 bg-zinc-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-indigo-900/30 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">— Start now —</span>
            <h2 className="font-fraunces text-5xl sm:text-7xl font-black text-white mt-4 mb-6 leading-tight">
              One upload changes<br /><span className="italic text-indigo-400">how you work.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">No setup. No credit card. Drop a document and see structured intelligence in under 30 seconds.</p>
            <button onClick={go} className="group inline-flex items-center gap-3 px-12 py-5 bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-lg rounded-2xl transition-all duration-200 shadow-[0_0_60px_rgba(99,102,241,0.3)] hover:shadow-[0_0_80px_rgba(99,102,241,0.5)]">
              {isAuthenticated ? "Open Dashboard" : "Upload Your First Document"}
              <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
              <FiLayers className="text-white text-xs" />
            </div>
            <span className="font-syne font-bold text-white text-sm">IntelliDocs</span>
          </div>
          <span className="text-zinc-600 text-xs">AI document intelligence · Open source · No ads</span>
        </div>
      </footer>
    </div>
  );
};

export default IntelliDocsLanding;             