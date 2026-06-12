import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ThemeProvider } from "@/lib/ThemeContext";

export const metadata = {
  title: "AgriYield — Crop Yield Prediction System",
  description:
    "An AI-powered tool to predict crop yield (tons per hectare) based on region, soil, weather, and farming practices.",
  keywords: [
    "crop yield prediction",
    "agriculture AI",
    "machine learning farming",
    "yield estimator",
  ],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌾</text></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
