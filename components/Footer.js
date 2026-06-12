"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { tr } = useLanguage();
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto max-w-6xl px-5 py-10 text-center">
        <div className="mb-3 flex items-center justify-center gap-2 font-display text-lg font-semibold">
          <span>🌾</span>
          <span>
            Agri<span className="text-primary-600">Yield</span>
          </span>
        </div>
        <p className="text-sm text-[rgb(var(--text-soft))]">{tr("footer_text")}</p>
        <p className="mt-1 text-xs text-[rgb(var(--text-soft))]">{tr("footer_disclaimer")}</p>
        <p className="mt-4 text-xs text-[rgb(var(--text-soft))]">
          © {new Date().getFullYear()} AgriYield
        </p>
      </div>
    </footer>
  );
}
