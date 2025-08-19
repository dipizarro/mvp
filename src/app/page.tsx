"use client";

import React from 'react';
import SocialPlanetsSection from "@/components/sections/SocialPlanetsSection";
import TranspersonalPlanetsSection from "@/components/sections/TranspersonalPlanetsSection";
import HousesSection from "@/components/sections/HousesSection";
import PersonalPlanetsSection from "@/components/sections/PersonalPlanetsSection";
import IdentitySection from "@/components/sections/IdentitySection";
import type { AstroReading } from "../types/astro";

import { useState } from "react";

import { calculateChart } from '@/services/chartService';
import Image from 'next/image';
import TableOfContents from "@/components/TableOfContents";
import Dashboard from "@/components/Dashboard";
/*
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
);
const CartaAstralPDF = dynamic(
  () => import('@/components/pdf/CartaAstralPDF'),
  { ssr: false }
);
*/

const INTERPRETATION_TYPES = {
  professional: "Profesional",
  spiritual: "Espiritual",
  youth: "Juvenil",
  psychological: "Psicológica"
};

export default function AstroHome() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("professional");
  const [result, setResult] = useState<AstroReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<"professional" | "spiritual" | "psychological" | "youth">("professional");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [showFullChart, setShowFullChart] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setNameError(null);
    setDateError(null);
    setCityError(null);
    let hasError = false;
    if (!name.trim()) {
      setNameError("El nombre es obligatorio.");
      hasError = true;
    }
    if (!date) {
      setDateError("La fecha y hora son obligatorias.");
      hasError = true;
    }
    if (!city) {
      setCityError("La ciudad es obligatoria.");
      hasError = true;
    }
    if (hasError) return;
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

      const data = await calculateChart({
        date: formattedDate,
        latitude,
        longitude,
        type,
      });

      if ('error' in data) {
        setErrorMsg(data.error);
        setResult(null);
      } else {
        setResult(data.reading);
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      setErrorMsg(error instanceof Error ? error.message : "Ocurrió un error inesperado");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start overflow-x-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      {/* Fondo astral animado */}
      <div className="absolute inset-0 -z-10">
        <Image src="/planetes.webp" alt="Fondo astral" fill priority className="object-cover opacity-60 animate-fade-in" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90" />
      </div>

      {/* Hero visual */}
      <section className="w-full max-w-3xl text-center mt-16 mb-10 animate-fade-in-up">
        <div className="flex flex-col items-center gap-2">
          {/*<Image src="/animated-star-image.gif" alt="Estrella animada" width={80} height={80} className="drop-shadow-lg" />*/}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight mb-2 font-[PlayfairDisplay]">
            <span className="inline-block align-middle">✨</span> Genera tu Carta Astral <span className="inline-block align-middle">🔮</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto">
            Descubre los secretos de tu universo interior con una experiencia visual única y personalizada.
          </p>
        </div>
      </section>

      {/* Formulario glassmorphism */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white/20 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/30 max-w-xl w-full mx-auto animate-fade-in-up"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
      >
        <label htmlFor="name" className="block text-white font-semibold mb-2">Nombre</label>
        <input
          id="name"
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/30 placeholder-white/70 text-white border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          required
          aria-required="true"
          aria-invalid={!!nameError}
        />
        {nameError && <span className="text-red-500" role="alert">{nameError}</span>}

        <label htmlFor="date" className="block text-white font-semibold mb-2">Fecha y hora de nacimiento</label>
        <input
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/30 placeholder-white/70 text-white border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          required
          aria-required="true"
          aria-invalid={!!dateError}
        />
        {dateError && <span className="text-red-500" role="alert">{dateError}</span>}

        <label htmlFor="city" className="block text-white font-semibold mb-2">Ciudad, País</label>
        <input
          id="city"
          type="text"
          placeholder="Ciudad, País"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/30 placeholder-white/70 text-white border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          required
          aria-required="true"
          aria-invalid={!!cityError}
        />
        {cityError && <span className="text-red-500" role="alert">{cityError}</span>}

        <label htmlFor="type" className="block text-white font-semibold mb-2">Tipo de interpretación</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/30 text-white border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none"
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
          aria-busy={loading}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 hover:from-pink-500 hover:to-purple-600 p-3 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
        >
          <span role="img" aria-label="estrella">🌟</span>
          {loading ? (
            <span className="flex items-center gap-2 animate-pulse">
              <Image src="/animated-star-image.gif" alt="Cargando" width={24} height={24} /> Generando...
            </span>
          ) : (
            <span>Generar Carta</span>
          )}
        </button>
      </form>

      {errorMsg && (
        <div
          className="mt-4 text-red-500 bg-red-100/80 rounded p-3 text-center max-w-xl mx-auto animate-fade-in-up border border-red-300 shadow"
          role="alert"
          aria-live="assertive"
        >
          {errorMsg}
        </div>
      )}

      {result && !showFullChart && (
        <Dashboard
          name={name}
          result={result}
          onViewFullChart={() => setShowFullChart(true)}
        />
      )}
      {result && showFullChart && (
        <>
          <TableOfContents visible={true} />
          <section className="mt-12 w-full max-w-4xl space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Image src="/globe.svg" alt="Globo astral" width={40} height={40} />
                <h2 className="text-3xl font-bold text-white drop-shadow-lg flex items-center gap-2">
                  <span role="img" aria-label="mapa">🗺️</span> Resultados de tu Carta Astral
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/80 font-semibold">Estilo:</span>
                <select
                  id="profile"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value as "professional" | "spiritual" | "psychological" | "youth")}
                  className="p-2 rounded-lg bg-white/30 text-white border border-white/30 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                >
                  <option value="professional">Profesional</option>
                  <option value="spiritual">Espiritual</option>
                  <option value="psychological">Psicológica</option>
                  <option value="youth">Juvenil</option>
                </select>
              </div>
            </div>
            <div className="space-y-6 transition-all duration-500">
              <IdentitySection data={result.identity} profile={profile} name={name} />
              <PersonalPlanetsSection data={result.personal_planets} profile={profile} />
              <SocialPlanetsSection data={result.social_planets} profile={profile} />
              <TranspersonalPlanetsSection data={result.transpersonal_planets} profile={profile} />
              <HousesSection data={result.houses} profile={profile} />
            </div>
          </section>
        </>
      )}

      {/* {result && (
        <PDFDownloadLink
          document={<CartaAstralPDF data={result} profile={profile} />}
          fileName="carta_astral_premium.pdf"
          className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 p-3 rounded-xl font-semibold text-white"
        >
          {({ loading }: { loading: boolean }) =>
            loading ? 'Generando PDF...' : 'Descargar PDF Premium'
          }
        </PDFDownloadLink>
      )} */}

      <footer className="mt-16 text-center text-sm text-white/70 animate-fade-in-up">
        Plataforma multiplataforma - versión inicial 🌙
      </footer>
    </main>
  );
}

