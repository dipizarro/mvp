"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const INTERPRETATION_TYPES = {
  professional: "Profesional",
  spiritual: "Espiritual",
  youth: "Juvenil",
  psychological: "Psicológica"
};

export default function AstroHome() {
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("professional");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      );
      const geoData = await geoResponse.json();
      if (geoData.length === 0) throw new Error("Ciudad no encontrada");

      const latitude = parseFloat(geoData[0].lat);
      const longitude = parseFloat(geoData[0].lon);

      const dt = new Date(date);
      const formattedDate = `${dt.getFullYear()}/${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt.getDate().toString().padStart(2, "0")} ${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`;

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/chart/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: formattedDate, latitude, longitude, type }),
      });

      if (!response.ok) throw new Error("Error al generar carta astral");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl mt-10">
        <h1 className="text-4xl font-bold text-center mb-6">✨ Genera tu Carta Astral</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 placeholder-white/70 text-white"
            required
          />
          <input
            type="text"
            placeholder="Ciudad, País"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 placeholder-white/70 text-white"
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {Object.entries(INTERPRETATION_TYPES).map(([key, label]) => (
              <option key={key} value={key} className="text-black">
                {label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-xl font-semibold"
          >
            {loading ? "Generando..." : "Generar Carta"}
          </button>
        </form>

        {result && (
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-center mb-8">🌌 Tu Carta Astral</h2>

            {result.reading.ascendant && (
              <div className="bg-gray-800 border border-purple-600 p-4 rounded-xl shadow text-white mb-6">
                <h3 className="font-semibold text-purple-400 mb-2">
                  🌅 Ascendente en {(result.positions.ascendant as any).sign}
                </h3>
                <p className="text-sm text-white/90">{result.reading.ascendant}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(result.reading).map(([key, msg]) => {
                if (["ascendant", "houses"].includes(key)) return null;
                const pos = result.positions[key] as any;
                return (
                  <div
                    key={key}
                    className="bg-gray-800 border border-blue-500 p-4 rounded-xl shadow hover:scale-105 transition-transform duration-300"
                  >
                    <h4 className="font-semibold text-blue-400 mb-2">
                      🌟 {key.charAt(0).toUpperCase() + key.slice(1)} en {pos?.sign} ({pos?.degree}°)
                    </h4>
                    <p className="text-sm text-white/90">{msg}</p>
                  </div>
                );
              })}
            </div>

            {result.reading.houses && (
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4 text-center text-purple-300">🏠 Casas Astrológicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(result.reading.houses).map(([houseKey, interpretation]) => {
                    const houseNumber = houseKey.replace("house_", "");
                    const data = (result.positions.houses as any)[`house_${houseNumber}`];
                    return (
                      <div
                        key={houseKey}
                        className="bg-gray-800 border border-purple-600 p-4 rounded-xl shadow"
                      >
                        <h4 className="font-semibold text-purple-400 mb-2">
                          🏠 Casa {houseNumber} en {data?.sign} ({data?.degree}°)
                        </h4>
                        <p className="text-sm text-white/90">{interpretation}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        <footer className="mt-10 text-center text-sm text-white/70">
          Plataforma multiplataforma - versión inicial 🌙
        </footer>
      </div>
    </main>
  );
}
