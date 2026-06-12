"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import { predictYield, MODEL_PARAMS } from "@/lib/model";
import { addHistoryEntry } from "@/lib/history";

const DEFAULTS = {
  Region: "North",
  Soil_Type: "Loam",
  Crop: "Wheat",
  Rainfall_mm: 120,
  Temperature_Celsius: 28,
  Fertilizer_Used: 1,
  Irrigation_Used: 1,
  Weather_Condition: "Sunny",
  Days_to_Harvest: 110,
};

const CROP_EMOJI = {
  Wheat: "🌾",
  Rice: "🍚",
  Maize: "🌽",
  Soybean: "🫘",
  Cotton: "☁️",
  Barley: "🌿",
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51 15.42 17.49M15.41 6.51 8.59 10.49" />
    </svg>
  );
}

function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function SaveIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </svg>
  );
}

export default function PredictPage() {
  const { tr, lang } = useLanguage();
  const [form, setForm] = useState(DEFAULTS);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const categories = MODEL_PARAMS.categories;

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setResult(null);
    setSaved(false);
  };

  const handlePredict = (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    // tiny delay for perceived computation + smooth UX
    setTimeout(() => {
      const input = {
        ...form,
        Rainfall_mm: Number(form.Rainfall_mm),
        Temperature_Celsius: Number(form.Temperature_Celsius),
        Fertilizer_Used: Number(form.Fertilizer_Used),
        Irrigation_Used: Number(form.Irrigation_Used),
        Days_to_Harvest: Number(form.Days_to_Harvest),
      };
      const y = predictYield(input);
      setResult({ value: y, input });
      setLoading(false);
    }, 450);
  };

  const handleReset = () => {
    setForm(DEFAULTS);
    setResult(null);
    setSaved(false);
  };

  const handleSave = () => {
    if (!result) return;
    addHistoryEntry({
      yield: result.value,
      ...result.input,
    });
    setSaved(true);
  };

  const handleShare = async () => {
    if (!result) return;
    const text = `${tr("result_title")}: ${result.value.toFixed(2)} ${tr("result_unit")}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "AgriYield", text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled share */
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const lines = [
      "AgriYield - Crop Yield Prediction Report",
      "==========================================",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      `Predicted Yield: ${result.value.toFixed(2)} ${tr("result_unit")}`,
      "",
      "Input Parameters:",
      `  Region: ${result.input.Region}`,
      `  Soil Type: ${result.input.Soil_Type}`,
      `  Crop: ${result.input.Crop}`,
      `  Rainfall (mm): ${result.input.Rainfall_mm}`,
      `  Temperature (°C): ${result.input.Temperature_Celsius}`,
      `  Fertilizer Used: ${result.input.Fertilizer_Used ? "Yes" : "No"}`,
      `  Irrigation Used: ${result.input.Irrigation_Used ? "Yes" : "No"}`,
      `  Weather Condition: ${result.input.Weather_Condition}`,
      `  Days to Harvest: ${result.input.Days_to_Harvest}`,
      "",
      tr("result_disclaimer"),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agriyield-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Factor breakdown for the visual
  const breakdown = useMemo(() => {
    if (!result) return [];
    const { coefficients } = MODEL_PARAMS;
    const input = result.input;

    const items = [
      {
        label: tr("label_fertilizer"),
        contribution: coefficients.Fertilizer_Used * input.Fertilizer_Used,
      },
      {
        label: tr("label_irrigation"),
        contribution: coefficients.Irrigation_Used * input.Irrigation_Used,
      },
      {
        label: tr("label_crop"),
        contribution: coefficients[`Crop__${input.Crop}`] || 0,
      },
      {
        label: tr("label_soil"),
        contribution: coefficients[`Soil_Type__${input.Soil_Type}`] || 0,
      },
      {
        label: tr("label_region"),
        contribution: coefficients[`Region__${input.Region}`] || 0,
      },
      {
        label: tr("label_weather"),
        contribution: coefficients[`Weather_Condition__${input.Weather_Condition}`] || 0,
      },
      {
        label: tr("label_temperature"),
        contribution: coefficients.Temperature_Celsius * input.Temperature_Celsius,
      },
      {
        label: tr("label_rainfall"),
        contribution: coefficients.Rainfall_mm * input.Rainfall_mm,
      },
      {
        label: tr("label_days"),
        contribution: coefficients.Days_to_Harvest * input.Days_to_Harvest,
      },
    ];

    const max = Math.max(...items.map((i) => Math.abs(i.contribution)), 0.001);
    return items
      .map((i) => ({ ...i, pct: (Math.abs(i.contribution) / max) * 100 }))
      .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
  }, [result, tr]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="mx-auto w-full max-w-6xl px-5 py-10 md:py-14">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {tr("form_title")}
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[rgb(var(--text-soft))] md:text-base">
            {tr("form_subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Form */}
          <form onSubmit={handlePredict} className="card rounded-3xl p-6 md:p-8 animate-slide-up">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Region */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">{tr("label_region")}</label>
                <select
                  value={form.Region}
                  onChange={(e) => handleChange("Region", e.target.value)}
                  className="w-full rounded-xl border bg-[rgb(var(--surface))] px-3.5 py-2.5 text-sm transition-colors focus:border-primary-500"
                >
                  {categories.Region.map((r) => (
                    <option key={r} value={r}>
                      {tr("region")[r] || r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Soil Type */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">{tr("label_soil")}</label>
                <select
                  value={form.Soil_Type}
                  onChange={(e) => handleChange("Soil_Type", e.target.value)}
                  className="w-full rounded-xl border bg-[rgb(var(--surface))] px-3.5 py-2.5 text-sm transition-colors focus:border-primary-500"
                >
                  {categories.Soil_Type.map((s) => (
                    <option key={s} value={s}>
                      {tr("soil")[s] || s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Crop */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">{tr("label_crop")}</label>
                <select
                  value={form.Crop}
                  onChange={(e) => handleChange("Crop", e.target.value)}
                  className="w-full rounded-xl border bg-[rgb(var(--surface))] px-3.5 py-2.5 text-sm transition-colors focus:border-primary-500"
                >
                  {categories.Crop.map((c) => (
                    <option key={c} value={c}>
                      {CROP_EMOJI[c]} {tr("crop")[c] || c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Weather */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">{tr("label_weather")}</label>
                <select
                  value={form.Weather_Condition}
                  onChange={(e) => handleChange("Weather_Condition", e.target.value)}
                  className="w-full rounded-xl border bg-[rgb(var(--surface))] px-3.5 py-2.5 text-sm transition-colors focus:border-primary-500"
                >
                  {categories.Weather_Condition.map((w) => (
                    <option key={w} value={w}>
                      {tr("weather")[w] || w}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rainfall */}
              <div>
                <label className="mb-1.5 flex items-center justify-between text-sm font-medium">
                  <span>{tr("label_rainfall")}</span>
                  <span className="text-primary-600">{form.Rainfall_mm} mm</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="1"
                  value={form.Rainfall_mm}
                  onChange={(e) => handleChange("Rainfall_mm", e.target.value)}
                  className="w-full accent-primary-600"
                />
              </div>

              {/* Temperature */}
              <div>
                <label className="mb-1.5 flex items-center justify-between text-sm font-medium">
                  <span>{tr("label_temperature")}</span>
                  <span className="text-primary-600">{form.Temperature_Celsius} °C</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={form.Temperature_Celsius}
                  onChange={(e) => handleChange("Temperature_Celsius", e.target.value)}
                  className="w-full accent-primary-600"
                />
              </div>

              {/* Days to Harvest */}
              <div>
                <label className="mb-1.5 flex items-center justify-between text-sm font-medium">
                  <span>{tr("label_days")}</span>
                  <span className="text-primary-600">{form.Days_to_Harvest}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="300"
                  step="1"
                  value={form.Days_to_Harvest}
                  onChange={(e) => handleChange("Days_to_Harvest", e.target.value)}
                  className="w-full accent-primary-600"
                />
              </div>

              {/* Fertilizer & Irrigation toggles */}
              <div className="flex flex-col gap-4 sm:col-span-1">
                <ToggleField
                  label={tr("label_fertilizer")}
                  value={form.Fertilizer_Used}
                  onChange={(v) => handleChange("Fertilizer_Used", v)}
                  yes={tr("option_yes")}
                  no={tr("option_no")}
                />
                <ToggleField
                  label={tr("label_irrigation")}
                  value={form.Irrigation_Used}
                  onChange={(v) => handleChange("Irrigation_Used", v)}
                  yes={tr("option_yes")}
                  no={tr("option_no")}
                />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-xl disabled:opacity-70 sm:flex-none"
              >
                {loading ? tr("btn_predicting") : tr("btn_predict")}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-[rgb(var(--bg-soft))]"
              >
                {tr("btn_reset")}
              </button>
            </div>
          </form>

          {/* Result panel */}
          <div className="lg:sticky lg:top-24">
            {!result && !loading && (
              <div className="card flex h-full min-h-[20rem] flex-col items-center justify-center rounded-3xl p-8 text-center animate-fade-in">
                <span className="text-5xl">🌱</span>
                <p className="mt-4 max-w-xs text-sm text-[rgb(var(--text-soft))]">
                  {tr("form_subtitle")}
                </p>
              </div>
            )}

            {loading && (
              <div className="card flex h-full min-h-[20rem] flex-col items-center justify-center rounded-3xl p-8 text-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
                <p className="mt-4 text-sm text-[rgb(var(--text-soft))]">{tr("btn_predicting")}</p>
              </div>
            )}

            {result && !loading && (
              <div className="card animate-scale-in overflow-hidden rounded-3xl">
                <div className="field-texture relative bg-gradient-to-br from-primary-50 to-earth-50 px-6 py-8 text-center dark:from-primary-900/20 dark:to-earth-900/10">
                  <span className="text-4xl">{CROP_EMOJI[result.input.Crop]}</span>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-soft))]">
                    {tr("result_title")}
                  </p>
                  <p className="mt-1 font-display text-5xl font-semibold text-primary-600">
                    {result.value.toFixed(2)}
                  </p>
                  <p className="text-sm text-[rgb(var(--text-soft))]">{tr("result_unit")}</p>
                </div>

                <div className="px-6 py-5">
                  <p className="text-xs leading-relaxed text-[rgb(var(--text-soft))]">
                    {tr("result_disclaimer")}
                  </p>

                  <h3 className="mt-5 text-sm font-semibold">{tr("result_breakdown")}</h3>
                  <div className="mt-3 space-y-3">
                    {breakdown.slice(0, 6).map((b, i) => (
                      <div key={i}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-medium">{b.label}</span>
                          <span
                            className={
                              b.contribution > 0
                                ? "text-primary-600"
                                : b.contribution < 0
                                ? "text-earth-600"
                                : "text-[rgb(var(--text-soft))]"
                            }
                          >
                            {b.contribution >= 0 ? "+" : ""}
                            {b.contribution.toFixed(3)}
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgb(var(--bg-soft))]">
                          <div
                            className={`h-full rounded-full ${
                              b.contribution >= 0 ? "bg-primary-500" : "bg-earth-500"
                            }`}
                            style={{ width: `${b.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-colors hover:bg-[rgb(var(--bg-soft))]"
                    >
                      {saved ? <CheckIcon className="h-3.5 w-3.5" /> : <SaveIcon className="h-3.5 w-3.5" />}
                      {tr("result_save")}
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-colors hover:bg-[rgb(var(--bg-soft))]"
                    >
                      {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <ShareIcon className="h-3.5 w-3.5" />}
                      {tr("result_share")}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-colors hover:bg-[rgb(var(--bg-soft))]"
                    >
                      <DownloadIcon className="h-3.5 w-3.5" />
                      {tr("result_download")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ToggleField({ label, value, onChange, yes, no }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <div className="flex rounded-xl border p-1">
        <button
          type="button"
          onClick={() => onChange(0)}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            value === 0
              ? "bg-[rgb(var(--bg-soft))] text-[rgb(var(--text))]"
              : "text-[rgb(var(--text-soft))]"
          }`}
        >
          {no}
        </button>
        <button
          type="button"
          onClick={() => onChange(1)}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            value === 1 ? "bg-primary-600 text-white" : "text-[rgb(var(--text-soft))]"
          }`}
        >
          {yes}
        </button>
      </div>
    </div>
  );
}
