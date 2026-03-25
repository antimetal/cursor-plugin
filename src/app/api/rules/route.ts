import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const rule = db
    .prepare("SELECT * FROM rules ORDER BY id DESC LIMIT 1")
    .get() as { id: number; content: string; mode: string } | undefined;

  return NextResponse.json(rule ?? { content: "", mode: "code" });
}

export async function POST(request: Request) {
  const { content, mode } = await request.json();

  if (mode !== "code" && mode !== "md") {
    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  }

  const db = getDb();
  const existing = db
    .prepare("SELECT id FROM rules ORDER BY id DESC LIMIT 1")
    .get() as { id: number } | undefined;

  if (existing) {
    db.prepare(
      "UPDATE rules SET content = ?, mode = ?, updated_at = datetime('now') WHERE id = ?"
    ).run(content, mode, existing.id);
  } else {
    db.prepare("INSERT INTO rules (content, mode) VALUES (?, ?)").run(
      content,
      mode
    );
  }

  return NextResponse.json({ success: true });
}
