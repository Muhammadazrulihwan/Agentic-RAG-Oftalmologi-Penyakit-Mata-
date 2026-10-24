import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  plugins: [forms, containerQueries],
  darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "surface-container-lowest": "#ffffff",
            "on-secondary-fixed": "#2c0051",
            "primary": "#630ed4",
            "surface-bright": "#faf8ff",
            "surface-variant": "#dae2fd",
            "outline": "#7b7487",
            "on-primary-fixed": "#25005a",
            "error": "#ba1a1a",
            "secondary-container": "#9e41f5",
            "on-secondary": "#ffffff",
            "tertiary-fixed-dim": "#4cd7f6",
            "on-surface": "#131b2e",
            "on-background": "#131b2e",
            "error-container": "#ffdad6",
            "primary-fixed-dim": "#d2bbff",
            "on-secondary-fixed-variant": "#6800b4",
            "on-primary": "#ffffff",
            "surface-dim": "#d2d9f4",
            "surface-container-high": "#e2e7ff",
            "surface-container-low": "#f2f3ff",
            "inverse-surface": "#283044",
            "on-error": "#ffffff",
            "on-primary-fixed-variant": "#5a00c6",
            "secondary-fixed-dim": "#ddb8ff",
            "secondary": "#831ada",
            "on-primary-container": "#ede0ff",
            "surface-tint": "#732ee4",
            "on-surface-variant": "#4a4455",
            "background": "#faf8ff",
            "on-tertiary-container": "#b7efff",
            "tertiary-container": "#007184",
            "on-tertiary-fixed-variant": "#004e5c",
            "outline-variant": "#ccc3d8",
            "primary-container": "#7c3aed",
            "surface-container": "#eaedff",
            "surface": "#faf8ff",
            "inverse-on-surface": "#eef0ff",
            "tertiary-fixed": "#acedff",
            "surface-container-highest": "#dae2fd",
            "on-error-container": "#93000a",
            "primary-fixed": "#eaddff",
            "secondary-fixed": "#f0dbff",
            "tertiary": "#005766",
            "on-secondary-container": "#fffbff",
            "on-tertiary": "#ffffff",
            "on-tertiary-fixed": "#001f26",
            "inverse-primary": "#d2bbff"
          },
          "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          "spacing": {
            "space-sm": "0.5rem",
            "margin": "3rem",
            "gutter": "1.5rem",
            "space-lg": "1.5rem",
            "space-md": "1rem",
            "margin-mobile": "1.25rem",
            "space-xl": "2.5rem",
            "space-xs": "0.25rem",
            "gutter-mobile": "1rem",
            "space-2xl": "4rem",
            "space-3xl": "6rem"
          },
          "fontFamily": {
            "body-md": ["Inter"],
            "label-md": ["Inter"],
            "display-hero-mobile": ["Plus Jakarta Sans"],
            "headline-lg-mobile": ["Plus Jakarta Sans"],
            "code-metric": ["Inter"],
            "headline-lg": ["Plus Jakarta Sans"],
            "headline-md": ["Plus Jakarta Sans"],
            "display-hero": ["Plus Jakarta Sans"],
            "headline-sm": ["Plus Jakarta Sans"],
            "body-lg": ["Inter"],
            "title-md": ["Plus Jakarta Sans"],
            "body-sm": ["Inter"]
          },
          "fontSize": {
            "body-md": ["15px", { "lineHeight": "24px", "fontWeight": "400" }],
            "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.04em", "fontWeight": "600" }],
            "display-hero-mobile": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
            "headline-lg-mobile": ["28px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
            "code-metric": ["13px", { "lineHeight": "18px", "fontWeight": "500" }],
            "headline-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.015em", "fontWeight": "700" }],
            "headline-md": ["28px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
            "display-hero": ["56px", { "lineHeight": "64px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
            "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
            "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
            "title-md": ["16px", { "lineHeight": "24px", "fontWeight": "600" }],
            "body-sm": ["13px", { "lineHeight": "20px", "fontWeight": "400" }]
          }
        }
      }
};

export default config;
