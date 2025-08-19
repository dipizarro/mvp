"use client"

import React, { useState, useEffect } from "react";

const SECTIONS = [
  { id: "identidad", label: "Identidad", icon: "🌸" },
  { id: "personales", label: "Personales", icon: "🪐" },
  { id: "sociales", label: "Sociales", icon: "🌍" },
  { id: "transpersonales", label: "Transpersonales", icon: "✨" },
  { id: "casas", label: "Casas", icon: "🏛️" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);
  useEffect(() => {
    const handleScroll = () => {
      let found = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.3) {
            found = section.id;
          }
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return active;
}

interface TableOfContentsProps {
  visible?: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ visible = false }) => {
  // Los hooks siempre deben ir al inicio
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!visible) return null;

  // Sidebar fijo en desktop
  if (!isMobile) {
    return (
      <nav
        aria-label="Índice de secciones"
        className="fixed top-24 left-6 z-40 flex flex-col gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 w-56 max-h-[80vh] overflow-auto animate-fade-in"
      >
        <span className="text-lg font-bold mb-2 text-white/80 flex items-center gap-2">
          <span className="text-2xl">📑</span> Índice
        </span>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-semibold text-left w-full
              ${active === s.id ? "bg-gradient-to-r from-indigo-600/40 to-purple-600/40 text-white shadow-md" : "hover:bg-white/20 text-white/80"}
            `}
            aria-current={active === s.id ? "page" : undefined}
          >
            <span className="text-xl">{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </nav>
    );
  }

  // Botón flotante en mobile
  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full p-4 shadow-2xl flex items-center gap-2 text-xl hover:scale-110 transition-all"
        aria-label="Abrir índice"
        onClick={() => setOpen(true)}
      >
        <span>📑</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end" role="dialog" aria-modal="true">
          <div className="w-full rounded-t-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-6 pb-10 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-white/80 flex items-center gap-2">
                <span className="text-2xl">📑</span> Índice
              </span>
              <button
                className="text-white/70 text-2xl p-2 hover:text-white"
                aria-label="Cerrar índice"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    scrollToSection(s.id);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-3 rounded-lg transition-all font-semibold text-left w-full text-lg
                    ${active === s.id ? "bg-gradient-to-r from-indigo-600/40 to-purple-600/40 text-white shadow-md" : "hover:bg-white/20 text-white/80"}
                  `}
                  aria-current={active === s.id ? "page" : undefined}
                >
                  <span className="text-xl">{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableOfContents; 