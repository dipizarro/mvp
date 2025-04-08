"use client";
export const dynamic = "force-dynamic";


import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface PaymentRecord {
  id: string;
  email: string | null;
  amount: number;
  status: string;
  date: string;
}

export default function SuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [payment, setPayment] = useState<PaymentRecord | null>(null);


  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/verify-payment?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setIsValid(data.valid);
        if (data.valid) setPayment(data.payment);
      })
      .catch(() => setIsValid(false));
  }, [sessionId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {isValid === null && <p>Verificando tu pago...</p>}

      {isValid === false && (
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold">❌ Pago no encontrado</h1>
          <p className="mt-2">Tu sesión de pago no ha sido validada.</p>
          <Link href="/" className="text-blue-600 underline mt-4 inline-block">
            Volver al inicio
          </Link>
        </div>
      )}

      {isValid === true && (
        <div className="text-center bg-white shadow p-6 rounded-lg max-w-md">
          <h1 className="text-2xl font-bold text-green-700 mb-4">
            ✅ ¡Gracias por tu compra!
          </h1>
          <p className="mb-4">
            Accede a tu informe premium y descarga tu PDF personalizado.
          </p>
          <button
  onClick={() => payment && generatePDF(payment)}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Descargar PDF Premium
</button>

        </div>
      )}
    </main>
  );
}

import jsPDF from "jspdf";

const generatePDF = (payment: {
  id: string;
  email: string | null;
  amount: number;
  date: string;
}) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Carta Astral Premium", 20, 20);

  doc.setFontSize(12);
  doc.text(`🧾 ID de pago: ${payment.id}`, 20, 40);
  doc.text(`📧 Email: ${payment.email}`, 20, 50);
  doc.text(`💰 Monto: $${(payment.amount / 100).toFixed(2)}`, 20, 60);
  doc.text(`📅 Fecha: ${new Date(payment.date).toLocaleString()}`, 20, 70);

  doc.text("🔮 Tu lectura personalizada va aquí...", 20, 90);
  doc.text("Sol en Aries - Luna en Piscis", 20, 100);

  doc.save("informe-carta-astral.pdf");
};

