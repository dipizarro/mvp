import React from "react";

const SIGNS = [
  { name: "Aries", symbol: "♈", keywords: ["valiente", "iniciador", "apasionado"] },
  { name: "Tauro", symbol: "♉", keywords: ["constante", "práctico", "sensual"] },
  { name: "Géminis", symbol: "♊", keywords: ["curioso", "comunicativo", "versátil"] },
  { name: "Cáncer", symbol: "♋", keywords: ["sensible", "protector", "intuitivo"] },
  { name: "Leo", symbol: "♌", keywords: ["creativo", "líder", "generoso"] },
  { name: "Virgo", symbol: "♍", keywords: ["analítico", "servicial", "detallista"] },
  { name: "Libra", symbol: "♎", keywords: ["diplomático", "armónico", "sociable"] },
  { name: "Escorpio", symbol: "♏", keywords: ["intenso", "profundo", "transformador"] },
  { name: "Sagitario", symbol: "♐", keywords: ["aventurero", "optimista", "filosófico"] },
  { name: "Capricornio", symbol: "♑", keywords: ["disciplinado", "ambicioso", "realista"] },
  { name: "Acuario", symbol: "♒", keywords: ["original", "humanitario", "visionario"] },
  { name: "Piscis", symbol: "♓", keywords: ["empático", "soñador", "compasivo"] }
];

const SIGN_COLORS: Record<string, string> = {
  Aries: "#FF6B6B",
  Tauro: "#B8E986",
  Géminis: "#FFD93D",
  Cáncer: "#6BCBFF",
  Leo: "#FFD166",
  Virgo: "#A3A380",
  Libra: "#B5B9FF",
  Escorpio: "#C77DFF",
  Sagitario: "#FFB26B",
  Capricornio: "#A0A0A0",
  Acuario: "#6BE0FF",
  Piscis: "#8EC6FF"
};

// Interpretaciones breves por planeta
const PLANET_INTERPS: Record<string, string> = {
  Mercurio: "Comunicación, mente y aprendizaje.",
  Venus: "Amor, belleza y valores.",
  Marte: "Energía, acción y deseo.",
  Júpiter: "Expansión, suerte y filosofía.",
  Saturno: "Disciplina, límites y estructura.",
  Urano: "Cambio, innovación y libertad.",
  Neptuno: "Inspiración, sueños y espiritualidad.",
  Plutón: "Transformación, poder y renacimiento."
};

interface PlanetMark {
  name: string; // Ej: "Mercurio"
  sign: string; // Ej: "Tauro"
}

interface ZodiacWheelProps {
  sunSign?: string;
  moonSign?: string;
  ascSign?: string;
  planets?: PlanetMark[]; // Otros planetas
}

const ANIMATION_DELAY = 40; // ms entre cada signo

const ZodiacWheel: React.FC<ZodiacWheelProps> = ({ sunSign, moonSign, ascSign, planets = [] }) => {
  const size = 440;
  const center = size / 2;
  const radius = 180;
  const angleStep = (2 * Math.PI) / 12;

  // Helper para destacar
  const getHighlight = (sign: string) => {
    if (sign === sunSign) return "☉";
    if (sign === moonSign) return "☽";
    if (sign === ascSign) return "⬆";
    return null;
  };

  // Helper para planetas
  const getPlanetMarks = (sign: string) =>
    planets.filter((p) => p.sign === sign);

  return (
    <div className="flex flex-col items-center mb-8">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Círculo base */}
        <circle cx={center} cy={center} r={radius} fill="#18122B" stroke="#fff" strokeWidth={2} />
        {/* Sectores y símbolos */}
        {SIGNS.map((signObj, i) => {
          const angle = -Math.PI / 2 + i * angleStep;
          const x = center + Math.cos(angle) * (radius - 55);
          const y = center + Math.sin(angle) * (radius - 55);
          const highlight = getHighlight(signObj.name);
          // Animación escalonada
          const animStyle = {
            opacity: 1,
            transform: `scale(1)`,
            transition: `opacity 0.7s ${i * ANIMATION_DELAY}ms, transform 0.7s ${i * ANIMATION_DELAY}ms`,
          };
          return (
            <g key={signObj.name} style={animStyle}>
              {/* Línea divisoria */}
              <line
                x1={center}
                y1={center}
                x2={center + Math.cos(angle) * radius}
                y2={center + Math.sin(angle) * radius}
                stroke="#fff"
                strokeWidth={1}
                opacity={0.2}
              />
              {/* Símbolo zodiacal con tooltip */}
              <g>
                <title>{signObj.name + ': ' + signObj.keywords.join(', ')}</title>
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={38}
                  fontWeight={highlight ? "bold" : "normal"}
                  fill={highlight ? SIGN_COLORS[signObj.name] : "#fff"}
                  style={{ filter: highlight ? "drop-shadow(0 0 10px #fff)" : undefined, cursor: 'pointer', animation: highlight ? 'pulse 1.5s infinite' : undefined }}
                >
                  {signObj.symbol}
                </text>
                {/* Icono destacado */}
                {highlight && (
                  <text
                    x={center + Math.cos(angle) * (radius - 95)}
                    y={center + Math.sin(angle) * (radius - 95)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={24}
                    fontWeight="bold"
                    fill={SIGN_COLORS[signObj.name]}
                    style={{ filter: "drop-shadow(0 0 8px #fff)", animation: 'pulse 1.5s infinite' }}
                  >
                    {highlight}
                  </text>
                )}
                {/* Marcas de planetas */}
                {getPlanetMarks(signObj.name).map((p, idx) => {
                  const px = center + Math.cos(angle) * (radius - 20 - idx * 12);
                  const py = center + Math.sin(angle) * (radius - 20 - idx * 12);
                  const interp = PLANET_INTERPS[p.name] || "Planeta";
                  return (
                    <circle
                      key={p.name}
                      cx={px}
                      cy={py}
                      r={6}
                      fill="#fff"
                      stroke={SIGN_COLORS[signObj.name]}
                      strokeWidth={2}
                    >
                      <title>{`${p.name} en ${signObj.name}\n${interp}`}</title>
                    </circle>
                  );
                })}
              </g>
            </g>
          );
        })}
        {/* Círculo central */}
        <circle cx={center} cy={center} r={30} fill="#fff" opacity={0.08} />
        {/* Animación keyframes para pulso */}
        <style>{`
          @keyframes pulse {
            0% { filter: drop-shadow(0 0 0px #fff); }
            50% { filter: drop-shadow(0 0 16px #fff); }
            100% { filter: drop-shadow(0 0 0px #fff); }
          }
        `}</style>
      </svg>
      {/* Leyenda visual */}
      <div className="flex gap-6 mt-4 text-white/80 text-lg items-center flex-wrap justify-center">
        <span className="flex items-center gap-1"><span className="text-2xl">☉</span> Sol</span>
        <span className="flex items-center gap-1"><span className="text-2xl">☽</span> Luna</span>
        <span className="flex items-center gap-1"><span className="text-2xl">⬆</span> Ascendente</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-white border border-white inline-block"></span> Otros planetas</span>
      </div>
    </div>
  );
};

export default ZodiacWheel; 