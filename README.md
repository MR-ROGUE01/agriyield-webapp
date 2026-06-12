<div align="center">

# 🌾 AgriYield

### AI-Powered Crop Yield Prediction Platform

<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js"/>
<img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react"/>
<img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css"/>
<img src="https://img.shields.io/badge/Machine%20Learning-Linear%20Regression-success?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge"/>

### 🚀 Browser-Based Machine Learning Inference with Zero Backend

</div>

---

# 📖 Overview

AgriYield is a production-ready crop yield prediction platform built using Next.js and Machine Learning.

The application predicts agricultural productivity (tons/hectare) using environmental and farming-related features such as:

* Region
* Soil Type
* Crop Type
* Rainfall
* Temperature
* Fertilizer Usage
* Irrigation
* Weather Conditions
* Days to Harvest

Unlike traditional ML deployments, predictions run entirely inside the browser.

No Python server.

No APIs.

No database.

No cloud inference costs.

---

# 🧠 Machine Learning Model

The prediction engine is based on a Scikit-Learn Linear Regression pipeline trained and evaluated separately.

### Model Performance

| Metric   | Score  |
| -------- | ------ |
| Train R² | 0.8869 |
| Test R²  | 0.8815 |

### Why Linear Regression?

✅ Strong Generalization

✅ Minimal Overfitting

✅ Fast Inference

✅ Easy Interpretability

---

# ⚡ Unique Engineering Approach

Instead of deploying a Python backend:

```text
Scikit-Learn Model
        ↓
Extract Coefficients
        ↓
Convert to JSON
        ↓
Rebuild Inference Logic
        ↓
Run Predictions in Browser
```

This enables:

* Instant Predictions
* Zero Server Costs
* Faster Response Time
* Simplified Deployment

---

# ✨ Features

✅ Real-Time Yield Prediction

✅ Browser-Side Machine Learning

✅ Multi-Language Support

✅ Dark / Light Mode

✅ Prediction History

✅ Share & Download Results

✅ Fully Responsive Design

✅ Accessibility Support

---

# 🌍 Supported Languages

* English
* Hindi
* Spanish
* French

---

# 🛠 Tech Stack

```text
Next.js 14
React 18
Tailwind CSS
JavaScript
Machine Learning
Scikit-Learn
Linear Regression
```

---

# 📂 Project Structure

```text
app/
components/
lib/
public/
package.json
tailwind.config.js
```

---

# 🔗 Related Repository

Machine Learning Training Repository:

crop-yield-prediction-linear-regression

Contains:

* Data Cleaning
* EDA
* Model Training
* Model Evaluation
* Pipeline Creation

---

# 🚀 Deployment

Hosted on Vercel.

```bash
npm install
npm run dev
```

---

# 🎯 Future Improvements

* Weather API Integration
* Real-Time Forecasting
* XGBoost Version
* Farmer Dashboard
* Mobile Application
* GIS Integration

---

# 👨‍💻 Author

### Raj Kumar

B.Tech CSE (AI & ML)

Amity University Jharkhand

Building AI + Software Projects

</div>
