"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";

function DatabaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function CpuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  );
}

function TargetIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export default function AboutPage() {
  const { tr } = useLanguage();

  const pipeline = [
    {
      icon: DatabaseIcon,
      title: "Data",
      desc: "10,000 records covering region, soil, crop, weather, and farming inputs.",
    },
    {
      icon: CpuIcon,
      title: "Pipeline",
      desc: "One-hot encoding for categorical fields + passthrough numerical features.",
    },
    {
      icon: TargetIcon,
      title: "Model",
      desc: "Linear Regression trained to estimate yield in tons per hectare.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="mx-auto w-full max-w-3xl px-5 py-10 md:py-14">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {tr("about_title")}
        </h1>
        <p className="mt-5 leading-relaxed text-[rgb(var(--text-soft))]">{tr("about_p1")}</p>
        <p className="mt-4 leading-relaxed text-[rgb(var(--text-soft))]">{tr("about_p2")}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {pipeline.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="card rounded-2xl p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-[rgb(var(--text-soft))]">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800 dark:border-amber-900/40 dark:bg-amber-900/15 dark:text-amber-300">
          ⚠️ {tr("result_disclaimer")}
        </div>

        <div className="mt-10">
          <Link
            href="/predict"
            className="inline-flex rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-xl"
          >
            {tr("hero_cta")}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
