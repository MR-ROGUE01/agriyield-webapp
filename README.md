# 🌾 AgriYield

### Machine Learning-Powered Crop Yield Prediction Platform

<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js"/>
<img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react"/>
<img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css"/>
<img src="https://img.shields.io/badge/Machine%20Learning-Linear%20Regression-success?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge"/>

### 🚀 Browser-Based Machine Learning Inference with Zero Backend

---

# 📖 Overview

AgriYield is a crop yield prediction platform built using Next.js and Machine Learning.

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

* No Python server
* No APIs
* No database
* No cloud inference costs

---

# 🧠 Machine Learning Model

The prediction engine is based on a Scikit-Learn Linear Regression pipeline trained, evaluated, and serialized in a separate Machine Learning repository.

## Model Performance

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

# ⚡ Deployment Architecture

The original model was trained using Scikit-Learn.

For deployment, the learned coefficients and intercept were extracted from the trained model and implemented in JavaScript, allowing predictions to run directly in the browser without requiring a backend server.

```text
Training Dataset
        ↓
Scikit-Learn Pipeline
        ↓
Linear Regression Model
        ↓
Coefficient Extraction
        ↓
JavaScript Inference Engine
        ↓
Next.js Web Application
        ↓
Browser Prediction
```

This approach provides:

* Instant Predictions
* Zero Server Costs
* Faster Response Time
* Simplified Deployment
* No Backend Infrastructure

---

# ✨ Features

✅ Real-Time Yield Prediction

✅ Browser-Side Machine Learning Inference

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
Scikit-Learn
Linear Regression
Machine Learning
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

### Machine Learning Training Repository

crop-yield-prediction-linear-regression

Contains:

* Data Cleaning
* Exploratory Data Analysis (EDA)
* Feature Engineering
* Model Training
* Model Evaluation
* Pipeline Creation
* Model Serialization

---

# 🚀 Deployment

Hosted on Vercel.

```bash
npm install
npm run dev
```

---

# 🎯 Future Improvements

* FastAPI Model Serving Version
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

Building AI, Machine Learning & Software Projects
