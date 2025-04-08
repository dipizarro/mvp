"use client";
import { useState } from "react";
import jsPDF from "jspdf";

interface ChartResponse {
  positions: {
    sun_ra: string;
    sun_dec: string;
  };
  reading: {
    sun: string;
    moon: string;
  };
}

export default function Home() {
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState<ChartResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Obtener coordenadas
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          city
        )}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        alert("No se encontró la ciudad.");
        setLoading(false);
        return;
      }

      const latitude = parseFloat(geoData[0].lat);
      const longitude = parseFloat(geoData[0].lon);

      // Preparar fecha UTC
      const utcDate = new Date(date).toISOString();

      // Enviar solicitud al backend
      const response = await fetch("http://127.0.0.1:8000/api/chart/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: utcDate,
          latitude,
          longitude,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al generar carta astral");
      }

      const data: ChartResponse = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (result: ChartResponse) => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text("Tu Carta Astral", 20, 20);
  
    doc.setFontSize(12);
    doc.text(`🌞 Sol`, 20, 40);
    doc.text(`RA: ${result.positions.sun_ra}`, 20, 50);
    doc.text(`Dec: ${result.positions.sun_dec}`, 20, 60);
    doc.text(`"${result.reading.sun}"`, 20, 70);
  
    doc.text(`🌙 Luna`, 20, 90);
    doc.text(`"${result.reading.moon}"`, 20, 100);
  
    doc.save("carta-astral.pdf");
  };

  const handlePayment = async () => {
    const res = await fetch("/api/payment", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  };
  
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Genera tu Carta Astral</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Ciudad, País"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Generando..." : "Generar"}
        </button>
      </form>

      {result && (
  <div className="mt-8 bg-white shadow-md p-6 rounded-lg w-full max-w-md">
    <h2 className="text-xl font-bold mb-4">🔮 Tu Lectura Astral</h2>
    <div className="mb-4">
      <h3 className="font-semibold">🌞 Sol</h3>
      <p>RA: {result.positions.sun_ra}</p>
      <p>Dec: {result.positions.sun_dec}</p>
      <p className="italic text-gray-700 mt-2">{result.reading.sun}</p>
    </div>
    <div className="mb-4">
      <h3 className="font-semibold">🌙 Luna</h3>
      <p className="italic text-gray-700 mt-2">{result.reading.moon}</p>
    </div>
    <button
      onClick={() => downloadPDF(result)}
      className="mt-4 bg-green-600 text-white p-2 rounded"
    >
      Descargar PDF
    </button>
  </div>
)}
<button
  onClick={handlePayment}
  className="mt-4 bg-purple-600 text-white p-2 rounded"
>
  Comprar Informe Premium ($5)
</button>

    </main>
  );
}
