# 🌾 AgriYield — Crop Yield Prediction System

A polished, production-ready Next.js web app that predicts crop yield (tons/hectare)
using a machine-learning model trained on regional, soil, weather, and farming-practice data.

The trained scikit-learn pipeline (`OneHotEncoder` + `LinearRegression`) has been
faithfully ported to pure JavaScript (`lib/model.js`), so predictions run
instantly in the browser — no Python backend, no API calls, nothing to break.

## Features

- ⚡ Instant client-side predictions (no server round trip)
- 🌍 4 languages: English, Hindi, Spanish, French
- 🌗 Dark / Light theme with system preference detection
- 📊 Visual factor breakdown for every prediction
- 🕓 Prediction history (saved locally in your browser)
- 📤 Share & download results
- 📱 Fully responsive, accessible (keyboard focus, reduced motion)

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Zero external ML/runtime dependencies

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no configuration needed.
4. Click **Deploy**.

That's it — no environment variables, no database, no Python runtime required.

## Project Structure

```
app/
  page.js          → Home
  predict/page.js  → Prediction form + results
  history/page.js  → Saved predictions
  about/page.js    → About / methodology
  layout.js        → Root layout, fonts, providers
  globals.css      → Theme tokens & global styles
components/
  Navbar.js
  Footer.js
lib/
  model.js         → Ported ML model (coefficients extracted from .pkl)
  i18n.js          → Translations (en, hi, es, fr)
  LanguageContext.js
  ThemeContext.js
  history.js        → localStorage-based history
```

## Updating the Model

If you retrain the model, re-export its parameters into `lib/model.js`:

```python
import joblib, json

pipeline = joblib.load("crop_yield_pipeline.pkl")
pre = pipeline.named_steps["preprocessor"]
ohe = pre.named_transformers_["categorical"]
lr = pipeline.named_steps["model"]

cat_cols = ["Region", "Soil_Type", "Crop", "Weather_Condition"]
num_cols = ["Rainfall_mm", "Temperature_Celsius", "Fertilizer_Used", "Irrigation_Used", "Days_to_Harvest"]

categories = {c: list(v) for c, v in zip(cat_cols, ohe.categories_)}
feat_names = [f"{c}__{v}" for c, vals in zip(cat_cols, ohe.categories_) for v in vals] + num_cols
coefficients = dict(zip(feat_names, lr.coef_.tolist()))

print(json.dumps({
    "intercept": float(lr.intercept_),
    "categories": categories,
    "coefficients": coefficients,
    "numericalCols": num_cols,
}, indent=2))
```

Paste the resulting values into `MODEL_PARAMS` in `lib/model.js`.
