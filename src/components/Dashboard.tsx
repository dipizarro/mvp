import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import ZodiacWheel from "./ZodiacWheel";

// Utilidad para fase lunar (placeholder, se puede mejorar)
function getLunarPhase(date = new Date()) {
  // Algoritmo simple, puedes reemplazarlo por uno más preciso
  const phases = [
    "Luna Nueva",
    "Cuarto Creciente",
    "Luna Llena",
    "Cuarto Menguante"
  ];
  const day = date.getDate();
  if (day < 8) return phases[0];
  if (day < 15) return phases[1];
  if (day < 23) return phases[2];
  return phases[3];
}

// Palabras clave por signo (ejemplo, puedes expandirlo)
const SIGN_KEYWORDS: Record<string, string[]> = {
  Aries: ["valiente", "iniciador", "apasionado"],
  Tauro: ["constante", "práctico", "sensual"],
  Géminis: ["curioso", "comunicativo", "versátil"],
  Cáncer: ["sensible", "protector", "intuitivo"],
  Leo: ["creativo", "líder", "generoso"],
  Virgo: ["analítico", "servicial", "detallista"],
  Libra: ["diplomático", "armónico", "sociable"],
  Escorpio: ["intenso", "profundo", "transformador"],
  Sagitario: ["aventurero", "optimista", "filosófico"],
  Capricornio: ["disciplinado", "ambicioso", "realista"],
  Acuario: ["original", "humanitario", "visionario"],
  Piscis: ["empático", "soñador", "compasivo"]
};

// Mensajes inspiradores (puedes expandir el array)
const INSPIRATIONAL_MESSAGES = [
  "Esta semana es ideal para cerrar ciclos y soltar lo que ya no necesitas.",
  "Confía en tu intuición y abre tu corazón a nuevas oportunidades.",
  "Recuerda que cada día es una nueva oportunidad para brillar.",
  "Escucha tu voz interior y sigue tu propio camino."
];

// Tipos
import type { AstroReading } from "../types/astro";

type DashboardProps = {
  name: string;
  result: AstroReading;
  onViewFullChart: () => void;
};

// Normaliza el nombre del signo para que coincida con el gráfico
function normalizeSign(sign?: string): string | undefined {
  if (!sign) return undefined;
  const map: Record<string, string> = {
    Aries: "Aries",
    Tauro: "Tauro",
    Geminis: "Géminis",
    Géminis: "Géminis",
    Cancer: "Cáncer",
    Cáncer: "Cáncer",
    Leo: "Leo",
    Virgo: "Virgo",
    Libra: "Libra",
    Escorpio: "Escorpio",
    Sagitario: "Sagitario",
    Capricornio: "Capricornio",
    Acuario: "Acuario",
    Piscis: "Piscis"
  };
  // Quitar espacios, tildes y poner mayúscula inicial
  const clean = sign.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  for (const key in map) {
    if (clean === key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) {
      return map[key];
    }
  }
  return sign;
}

const Dashboard: React.FC<DashboardProps> = ({ name, result, onViewFullChart }) => {
  // Fecha y fase lunar
  const today = new Date();
  const formattedDate = format(today, "d 'de' MMMM 'de' yyyy", { locale: es });
  const lunarPhase = getLunarPhase(today);

  // Extraer Sol, Luna, Ascendente
  const sun = result.identity.sun;
  const moon = result.identity.moon;
  const asc = result.identity.ascendant;
  const sunSign = normalizeSign(sun?.sign);
  const moonSign = normalizeSign(moon?.sign);
  const ascSign = normalizeSign(asc?.sign);

  // Palabras clave
  const getKeywords = (signo?: string) =>
    signo && SIGN_KEYWORDS[signo] ? SIGN_KEYWORDS[signo] : ["único", "especial", "auténtico"];

  // Mensaje inspirador aleatorio
  const message = INSPIRATIONAL_MESSAGES[
    Math.floor(Math.random() * INSPIRATIONAL_MESSAGES.length)
  ];

  // Extraer planetas personales y sociales
  const planets = [
    { name: "Mercurio", sign: normalizeSign(result.personal_planets.mercury?.sign) },
    { name: "Venus", sign: normalizeSign(result.personal_planets.venus?.sign) },
    { name: "Marte", sign: normalizeSign(result.personal_planets.mars?.sign) },
    { name: "Júpiter", sign: normalizeSign(result.social_planets.jupiter?.sign) },
    { name: "Saturno", sign: normalizeSign(result.social_planets.saturn?.sign) },
    { name: "Urano", sign: normalizeSign(result.transpersonal_planets.uranus?.sign) },
    { name: "Neptuno", sign: normalizeSign(result.transpersonal_planets.neptune?.sign) },
    { name: "Plutón", sign: normalizeSign(result.transpersonal_planets.pluton?.sign || result.transpersonal_planets.pluto?.sign) },
  ].filter((p): p is { name: string; sign: string } => typeof p.sign === 'string');

  return (
    <section className="w-full max-w-3xl mx-auto mt-12 mb-8 p-6 bg-white/10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 animate-fade-in-up">
      <ZodiacWheel sunSign={sunSign} moonSign={moonSign} ascSign={ascSign} planets={planets} />
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent mb-2">
          Hola, {name}! <span role="img" aria-label="luna">🌙</span> Bienvenido a tu espacio astral.
        </h2>
        <div className="text-white/80 text-lg mb-2">
          Hoy: {formattedDate} | {lunarPhase} en <span className="font-bold">{moon?.sign || "-"}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Sol */}
        <div className="bg-gradient-to-br from-yellow-400/30 to-yellow-700/30 rounded-2xl p-5 shadow-lg flex flex-col items-center">
          <span className="text-4xl mb-2">☉</span>
          <div className="font-bold text-lg mb-1">Sol en {sun?.sign || "-"}</div>
          <div className="text-sm text-white/80 mb-2">{getKeywords(sun?.sign).join(", ")}</div>
          <div className="text-xs text-white/60">{sun?.profiles.professional?.split(".")[0] || "-"}</div>
        </div>
        {/* Luna */}
        <div className="bg-gradient-to-br from-blue-400/30 to-blue-700/30 rounded-2xl p-5 shadow-lg flex flex-col items-center">
          <span className="text-4xl mb-2">☽</span>
          <div className="font-bold text-lg mb-1">Luna en {moon?.sign || "-"}</div>
          <div className="text-sm text-white/80 mb-2">{getKeywords(moon?.sign).join(", ")}</div>
          <div className="text-xs text-white/60">{moon?.profiles.professional?.split(".")[0] || "-"}</div>
        </div>
        {/* Ascendente */}
        <div className="bg-gradient-to-br from-pink-400/30 to-purple-700/30 rounded-2xl p-5 shadow-lg flex flex-col items-center">
          <span className="text-4xl mb-2">⬆</span>
          <div className="font-bold text-xl mb-1 text-center">
            {asc?.sign
              ? `Ascendente en ${asc.sign}`
              : <span className="italic text-white/60 flex flex-col items-center justify-center text-lg"><span>⚠️</span>Ascendente no disponible</span>
            }
          </div>
          <div className="text-sm text-white/80 mb-2">
            {asc?.sign ? getKeywords(asc.sign).join(", ") : "Explora tu carta para descubrir tu ascendente."}
          </div>
          <div className="text-xs text-white/60">
            {asc?.profiles?.professional?.split(".")[0] || "El ascendente representa tu forma de presentarte al mundo."}
          </div>
        </div>
      </div>
      {/* Mensaje inspirador */}
      <div className="text-center mb-8">
        <div className="text-xl text-white/90 font-semibold italic mb-2">
          “{message}”
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onViewFullChart}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          Ver Carta Completa <span className="text-2xl">➔</span>
        </button>
      </div>
    </section>
  );
};

export default Dashboard; 