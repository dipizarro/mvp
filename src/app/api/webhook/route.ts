import { NextRequest } from "next/server";
import Stripe from "stripe";
import fs from "fs/promises";
import path from "path";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

  const body = await req.text(); // 👈 importante, no usar .json()

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err);
    if (err instanceof Error) {
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
      }
      return new Response("Webhook Error", { status: 400 });
      
  }

  // 🎯 Aquí procesamos el evento
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
  
    // Guardar datos simples
    const paymentRecord = {
      id: session.id,
      email: session.customer_details?.email || null,
      amount: session.amount_total,
      status: session.payment_status,
      date: new Date().toISOString(),
    };
  
    const filePath = path.resolve(process.cwd(), "src/data/payments.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const payments = JSON.parse(fileData);
  
    payments.push(paymentRecord);
  
    await fs.writeFile(filePath, JSON.stringify(payments, null, 2), "utf-8");
  
    console.log("✅ Pago registrado:", paymentRecord);
  }
  

  return new Response("Received", { status: 200 });
}
