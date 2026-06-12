// Auto-extracted from crop_yield_pipeline.pkl
// Pipeline: ColumnTransformer(OneHotEncoder + passthrough) -> LinearRegression

export const MODEL_PARAMS = {
  intercept: -0.02215704239637617,
  categories: {
    Region: ["East", "North", "South", "West"],
    Soil_Type: ["Chalky", "Clay", "Loam", "Peaty", "Sandy", "Silt"],
    Crop: ["Barley", "Cotton", "Maize", "Rice", "Soybean", "Wheat"],
    Weather_Condition: ["Cloudy", "Rainy", "Sunny"],
  },
  coefficients: {
    Region__East: 0.005728492935561073,
    Region__North: 0.007760783445643859,
    Region__South: -0.007899485596134147,
    Region__West: -0.005589790785070942,
    Soil_Type__Chalky: 0.005199419550212379,
    Soil_Type__Clay: 0.007274112050823414,
    Soil_Type__Loam: 0.011189157172926064,
    Soil_Type__Peaty: -0.011683334934033934,
    Soil_Type__Sandy: -0.007366806511683063,
    Soil_Type__Silt: -0.004612547328245033,
    Crop__Barley: 0.010727440748388266,
    Crop__Cotton: -0.01932117615388103,
    Crop__Maize: -0.005761924779771719,
    Crop__Rice: 0.006192394038222996,
    Crop__Soybean: -0.010107774643860626,
    Crop__Wheat: 0.01827104079090172,
    Weather_Condition__Cloudy: 0.0014709218735028259,
    Weather_Condition__Rainy: -0.008294796443053429,
    Weather_Condition__Sunny: 0.006823874569550562,
    Rainfall_mm: 0.004995167494915875,
    Temperature_Celsius: 0.019742746363741254,
    Fertilizer_Used: 1.4957085004224526,
    Irrigation_Used: 1.2034333915576025,
    Days_to_Harvest: 0.00031184527483076713,
  },
  numericalCols: [
    "Rainfall_mm",
    "Temperature_Celsius",
    "Fertilizer_Used",
    "Irrigation_Used",
    "Days_to_Harvest",
  ],
};

/**
 * Pure JS re-implementation of:
 *   ColumnTransformer([OneHotEncoder(handle_unknown='ignore'), passthrough])
 *   -> LinearRegression
 *
 * @param {Object} input
 * @returns {number} predicted yield (tons per hectare)
 */
export function predictYield(input) {
  const { intercept, coefficients, categories, numericalCols } = MODEL_PARAMS;
  let sum = intercept;

  // One-hot encoded categorical contributions
  for (const col of Object.keys(categories)) {
    const value = input[col];
    const key = `${col}__${value}`;
    if (coefficients[key] !== undefined) {
      sum += coefficients[key];
    }
    // handle_unknown='ignore' -> contributes 0 if value not in categories
  }

  // Numerical (passthrough) contributions
  for (const col of numericalCols) {
    const value = Number(input[col]) || 0;
    sum += coefficients[col] * value;
  }

  return sum;
}
