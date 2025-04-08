import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const YOUR_DOMAIN = "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Lectura Astral Premium",
            description: "Informe extendido con PDF detallado",
          },
          unit_amount: 500, // $5.00 USD (en centavos)
        },
        quantity: 1,
      },
    ],
    success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/`,
  });

  return Response.json({ url: session.url });
}
