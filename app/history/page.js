"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import { getHistory, clearHistory } from "@/lib/history";

const CROP_EMOJI = {
  Wheat: "🌾",
  Rice: "🍚",
  Maize: "🌽",
  Soybean: "🫘",
  Cotton: "☁️",
  Barley: "🌿",
};

function TrashIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
    </svg>
  );
}

export default function HistoryPage() {
  const { tr, lang } = useLanguage();
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(getHistory());
    setMounted(true);
  }, []);

  const handleClear = () => {
    clearHistory();
    setItems([]);
  };

  const locale = { en: "en-US", hi: "hi-IN", es: "es-ES", fr: "fr-FR" }[lang] || "en-US";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="mx-auto w-full max-w-4xl px-5 py-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {tr("history_title")}
          </h1>
          {mounted && items.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-colors hover:bg-[rgb(var(--bg-soft))]"
            >
              <TrashIcon className="h-3.5 w-3.5" />
              {tr("history_clear")}
            </button>
          )}
        </div>

        {!mounted ? (
          <div className="card animate-fade-in rounded-2xl p-6 h-24" />
        ) : items.length === 0 ? (
          <div className="card flex flex-col items-center justify-center rounded-3xl p-12 text-center animate-fade-in">
            <span className="text-5xl">📋</span>
            <p className="mt-4 max-w-xs text-sm text-[rgb(var(--text-soft))]">
              {tr("history_empty")}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={item.id}
                className="card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 animate-slide-up"
                style={{ animationDelay: `${Math.min(i, 8) * 0.04}s` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{CROP_EMOJI[item.Crop] || "🌾"}</span>
                  <div>
                    <p className="font-display text-lg font-semibold">
                      {tr("crop")[item.Crop] || item.Crop}
                    </p>
                    <p className="text-xs text-[rgb(var(--text-soft))]">
                      {tr("region")[item.Region] || item.Region} ·{" "}
                      {new Date(item.date).toLocaleString(locale)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-semibold text-primary-600">
                    {item.yield.toFixed(2)}
                  </p>
                  <p className="text-xs text-[rgb(var(--text-soft))]">{tr("result_unit")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
