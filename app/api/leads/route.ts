// app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs"; // service_role работает только в Node runtime

type Payload = { name?: string; phone?: string; comment?: string };

function take(s: unknown, max = 500) {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  let body: Payload = {};
  try { body = await req.json(); } catch {}

  const name = take(body.name);
  const phone = take(body.phone);
  const comment = take(body.comment, 2000);

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Укажите имя и телефон" }, { status: 400 });
  }

  const { error } = await supabaseServer
    .from("leads")
    .insert({ name, phone, comment });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
