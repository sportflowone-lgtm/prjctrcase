import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bgGradient = "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950";

const App = () => {
  const [view, setView] = useState<"landing" | "dashboard">("landing");
  const [showMentor, setShowMentor] = useState(false);

  // Закрытие поп-апа по ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowMentor(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className={`${bgGradient} min-h-screen text-slate-50 flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {/* Soft glow background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-72 w-72 rounded-full bg-blue-600/40 blur-3xl" />
        <div className="absolute -right-40 bottom-10 h-72 w-72 rounded-full bg-indigo-500/40 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <Landing
            key="landing"
            onEnter={() => setShowMentor(true)} // 👉 теперь кнопка «Що це?» открывает поп-ап
          />
        ) : (
          <Dashboard key="dashboard" onBack={() => setView("landing")} />
        )}
      </AnimatePresence>

      {/* 👉 ВАЖНО: Pop-up рендерим ПОД контентом страницы */}
      <MentorPopup
        open={showMentor}
        onClose={() => setShowMentor(false)}
        onContinue={() => {
          setShowMentor(false);
          setView("dashboard");
        }}
      />
    </div>
  );
};

interface LandingProps {
  onEnter: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnter }) => {
  return (
    <motion.div
      className="relative w-full max-w-5xl px-6 flex flex-col items-center gap-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <header className="pt-6 text-center flex flex-col gap-3">
        <span className="tracking-[0.25em] text-xs uppercase text-slate-400">
          Digital School · Self-Service Hub
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent">
          PRJCTR INSTITUTE
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          Легка точка входу в усі AI-інструменти школи. Один клік — і ти вже з ментором, базою знань або новим прототипом.
        </p>
      </header>

      {/* Orb + primary action */}
      <div className="flex flex-col items-center gap-10 pb-10">
        <motion.div
          className="relative h-72 w-72 md:h-80 md:w-80 flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-slate-700/60 bg-gradient-to-br from-blue-900/40 via-slate-900/80 to-indigo-900/60 shadow-[0_0_120px_rgba(56,189,248,0.35)]"
            animate={{
              boxShadow: [
                "0 0 120px rgba(56,189,248,0.25)",
                "0 0 160px rgba(129,140,248,0.45)",
                "0 0 120px rgba(56,189,248,0.25)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Dotted wave ring */}
          <motion.div
            className="absolute inset-6 rounded-full border border-dotted border-sky-400/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner pulse */}
          <motion.div
            className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 shadow-[0_0_60px_rgba(59,130,246,0.6)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-slate-300/90">
              AI HUB
            </span>
          </motion.div>
        </motion.div>

        {/* Primary circular button */}
        <motion.button
          onClick={onEnter}
          className="relative rounded-full px-10 py-3 text-sm md:text-base font-medium text-slate-950 bg-sky-400/90 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-[0_0_40px_rgba(56,189,248,0.7)] transition-colors"
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            <span>Що це?</span>
          </span>
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-sky-500/40 blur-xl" />
        </motion.button>
      </div>
    </motion.div>
  );
};

interface DashboardProps {
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const cards = [
    {
      id: 1,
      title: "AI Telegram Mentee",
      tag: "бот для ДЗ",
      description:
        "Тренований AI-ментор, який швидко перевіряє домашні завдання та дає структурований фідбек у стилі кураторів PRJCTR.",
      action: "Відкрити бота",
      href: "https://t.me/AI_TEAMN4_BOT",
    },
    {
      id: 2,
      title: "Personal Knowledge Base",
      tag: "база знань",
      description:
        "Персоналізована база знань під твій курс.",
      action: "Відкрити",
      href: "https://notebooklm.google.com/notebook/921a14a1-d248-4d16-ab05-e953f25de3c3?pli=1",
    },
    {
      id: 3,
      title: "Course Progress Tracker",
      tag: "Gamification",
      description:
        "Гейміфікація прогресу курсу для більш ефективного навчання.",
      action: "Подивитися",
      href: "https://www.youtube.com/watch?v=GwLsw3IJTs0",
    },
    {
      id: 4,
      title: "Mockup #2",
      tag: "prototype",
      description:
        "Ще один слот під майбутній продукт: дашборд, трекер прогресу або експериментальну фічу.",
      action: "Додати пізніше",
      href: "#",
    },
  ];

  return (
    <motion.div
      className="relative w-full max-w-6xl px-6 pb-10 pt-6 flex flex-col gap-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl border border-slate-700/70 bg-gradient-to-br from-sky-500/70 to-indigo-500/80 shadow-[0_0_30px_rgba(56,189,248,0.7)]" />
          <div>
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-50">
              PRJCTR INSTITUTE
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              Self-Service · AI-ментори · курсові інструменти
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="text-xs md:text-sm text-slate-300 hover:text-sky-300 border border-slate-700/70 rounded-full px-3 py-1 bg-slate-900/60 backdrop-blur-md transition-colors"
        >
          ◀ Назад
        </button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {cards.map((card, index) => (
          <motion.a
            key={card.id}
            href={card.href}
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={card.href.startsWith("http") ? "noreferrer" : undefined}
            className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-5 md:p-6 flex flex-col justify-between shadow-[0_18px_50px_rgba(15,23,42,0.85)] cursor-pointer"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.08 * index, ease: "easeOut" }}
          >
            {/* Accent gradients */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-sky-500/25 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-indigo-500/25 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-400 mb-1">
                    {card.tag}
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-50">
                    {card.title}
                  </h3>
                </div>
                <div className="h-9 w-9 rounded-2xl border border-slate-700/70 bg-slate-900/80 flex items-center justify-center text-slate-300 text-xs">
                  {index + 1}
                </div>
              </div>

              <p className="text-sm text-slate-300/90 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between text-xs md:text-sm text-sky-300">
              <span className="flex items-center gap-2">
                <span className="font-medium">{card.action}</span>
                <span className="opacity-80 group-hover:translate-x-0.5 transition-transform">↗</span>
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-500">
                {card.href === "#" ? "SOON" : "LIVE"}
              </span>
            </div>
          </motion.a>
        ))}
      </main>
    </motion.div>
  );
};

/** ---------- Mentor Popup Component ---------- */
const MentorPopup: React.FC<{ open: boolean; onClose: () => void; onContinue: () => void; }> = ({ open, onClose, onContinue }) => {
  const videoSrc = `${import.meta.env.BASE_URL}heygen.mp4`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-md rounded-3xl border border-slate-700/60 bg-slate-900/80 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.85)] overflow-hidden"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-sky-300 px-2 py-1 text-xs"
            >
              ✕
            </button>

            <div className="flex flex-col gap-4 mt-6">
              
              {/* Bounded video container */}
              <div className="rounded-2xl overflow-hidden border border-slate-700/60 bg-black max-h-[420px]">
                <video
                  src={videoSrc}
                  autoPlay
                  playsInline
                  muted
                  controls
                  className="w-full max-h-[420px] object-contain bg-black"
                />
              </div>

              <div className="text-center text-slate-300 text-sm">
                Я — <span className="text-sky-300 font-medium">AI Ментор PRJCTR</span>.  
                Дозволь показати, як працює наш Hub.
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-center gap-3 mt-2">
                <button
                  onClick={onContinue}
                  className="rounded-full px-5 py-2 text-slate-950 bg-sky-400/90 hover:bg-sky-300 transition-colors shadow-[0_0_24px_rgba(56,189,248,0.5)]"
                >
                  Перейти в дашборд
                </button>

                <button
                  onClick={onClose}
                  className="rounded-full px-5 py-2 border border-slate-700/70 text-slate-300 hover:text-sky-300 bg-slate-900/60"
                >
                  Закрити
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default App;