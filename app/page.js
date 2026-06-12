"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";

function LeafIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
    </svg>
  );
}

function ChartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 3v18h18M7 16l4-4 3 3 5-6" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function MoonStarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      <path d="M19 3v4M21 5h-4" />
    </svg>
  );
}

function DeviceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="14" height="11" rx="1.5" />
      <path d="M9 19h2M2 19h20M18 9h4v6h-4z" />
    </svg>
  );
}

function ZapIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

export default function HomePage() {
  const { tr } = useLanguage();

  const features = [
    { icon: ZapIcon, title: tr("feature_1_title"), desc: tr("feature_1_desc") },
    { icon: GlobeIcon, title: tr("feature_2_title"), desc: tr("feature_2_desc") },
    { icon: ChartIcon, title: tr("feature_3_title"), desc: tr("feature_3_desc") },
    { icon: ClockIcon, title: tr("feature_4_title"), desc: tr("feature_4_desc") },
    { icon: MoonStarIcon, title: tr("feature_5_title"), desc: tr("feature_5_desc") },
    { icon: DeviceIcon, title: tr("feature_6_title"), desc: tr("feature_6_desc") },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="field-texture relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                <LeafIcon className="h-3.5 w-3.5" />
                {tr("hero_badge")}
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-balance md:text-6xl">
                {tr("hero_title")}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[rgb(var(--text-soft))] md:text-lg">
                {tr("hero_subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/predict"
                  className="rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30"
                >
                  {tr("hero_cta")}
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-[rgb(var(--bg-soft))]"
                >
                  {tr("hero_cta_secondary")}
                </Link>
              </div>
            </div>

            {/* Signature visual: animated "field plot" with growth bars */}
            <div className="relative animate-fade-in">
              <div className="card relative overflow-hidden rounded-3xl p-8 shadow-2xl shadow-primary-900/5">
                <div className="flex items-end justify-between gap-3 h-56">
                  {[
                    { h: "55%", label: "🌾", delay: "0s" },
                    { h: "78%", label: "🌽", delay: "0.5s" },
                    { h: "40%", label: "🌱", delay: "1s" },
                    { h: "92%", label: "🌿", delay: "1.5s" },
                    { h: "65%", label: "🍚", delay: "2s" },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-2">
                      <div className="relative flex w-full flex-1 items-end overflow-hidden rounded-t-xl bg-[rgb(var(--bg-soft))]">
                        <div
                          className="growth-bar w-full rounded-t-xl bg-gradient-to-t from-primary-600 to-primary-400 animate-float"
                          style={{ height: bar.h, animationDelay: bar.delay }}
                        />
                      </div>
                      <span className="text-2xl" aria-hidden="true">
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl bg-[rgb(var(--bg-soft))] px-4 py-3">
                  <span className="text-xs font-medium text-[rgb(var(--text-soft))]">
                    {tr("result_unit")}
                  </span>
                  <span className="font-display text-2xl font-semibold text-primary-600">
                    3.91 t/ha
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-700/20" />
              <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-earth-200/50 blur-3xl dark:bg-earth-700/20" />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { label: tr("stat_accuracy"), value: tr("stat_accuracy_val") },
              { label: tr("stat_features"), value: tr("stat_features_val") },
              { label: tr("stat_crops"), value: tr("stat_crops_val") },
            ].map((s, i) => (
              <div key={i} className="card rounded-2xl px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-soft))]">
                  {s.label}
                </p>
                <p className="mt-1 font-display text-xl font-semibold">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {tr("about_features_title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="card group rounded-2xl p-6 transition-transform hover:-translate-y-1"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text-soft))]">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="card relative overflow-hidden rounded-3xl px-8 py-14 text-center md:py-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 to-earth-50 dark:from-primary-900/20 dark:to-earth-900/10" />
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-4xl">
            {tr("hero_title")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[rgb(var(--text-soft))] md:text-base">
            {tr("form_subtitle")}
          </p>
          <Link
            href="/predict"
            className="mt-7 inline-flex rounded-full bg-primary-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-xl"
          >
            {tr("hero_cta")}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
