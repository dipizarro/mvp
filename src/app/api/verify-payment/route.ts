import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

interface PaymentRecord {
    id: string;
    email: string | null;
    amount: number;
    status: string;
    date: string;
  }

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return new Response(JSON.stringify({ valid: false }), {
      status: 400,
    });
  }

  const filePath = path.resolve(process.cwd(), "src/data/payments.json");
  const fileData = await fs.readFile(filePath, "utf-8");
  const payments = JSON.parse(fileData);

  const payment = (payments as PaymentRecord[]).find((p) => p.id === sessionId);

  return new Response(
    JSON.stringify({
      valid: !!payment,
      payment,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
