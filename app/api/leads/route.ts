import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";

function take(s: unknown) { return typeof s === "string" ? s.trim().slice(0, 500) : ""; }

export async function POST(req: NextRequest) {
  try {
    const { name, phone, comment } = await req.json().catch(() => ({}));
    const nm = take(name), ph = take(phone), cm = take(comment);
    if (!nm || !ph) {
      return NextResponse.json({ ok:false, error:"Укажите имя и телефон" }, { status: 400 });
    }
    const { error } = await supabaseServer.from("leads").insert({ name: nm, phone: ph, comment: cm });
    if (error) {
      console.error("INSERT ERROR:", error.message);
      return NextResponse.json({ ok:false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok:true });
  } catch (e:any) {
    console.error("API /api/leads failed:", e?.message || e);
    return NextResponse.json({ ok:false, error: e?.message ?? "Server error" }, { status: 500 });
  }
}
