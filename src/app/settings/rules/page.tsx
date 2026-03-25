"use client";

import { useEffect, useState } from "react";

type Mode = "code" | "md";

export default function RulesPage() {
  const [content, setContent] = useState("");
  const [mode, setMode] = useState<Mode>("code");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/rules")
      .then((res) => res.json())
      .then((data) => {
        setContent(data.content ?? "");
        setMode(data.mode ?? "code");
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, mode }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Rules</h1>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-gray-400">Mode:</span>
        <div className="inline-flex rounded-md bg-gray-800 p-0.5">
          <button
            onClick={() => setMode("code")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              mode === "code"
                ? "bg-gray-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setMode("md")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              mode === "md"
                ? "bg-gray-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Markdown
          </button>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          mode === "code"
            ? "Enter your code rules here..."
            : "Enter your markdown instructions here..."
        }
        className="w-full h-80 bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-gray-200 font-mono focus:outline-none focus:border-blue-500 resize-y placeholder-gray-600"
        spellCheck={mode === "md"}
      />

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {saved && (
          <span className="text-sm text-green-400">Saved successfully</span>
        )}
      </div>
    </div>
  );
}
