import { createStitches } from "@stitches/react";
import { leadingTrim } from "leading-trim";

const lineHeights = {
  1: "1.5",
  2: "1.6",
  3: "1.6",
  4: "1.5",
  5: "1.5",
  6: "1.3",
  7: "1.3",
  8: "1.1",
  9: "1",
  10: "1",
};

export const {
  css,
  styled,
  globalCss,
  theme,
  createTheme,
  keyframes,
  getCssText,
} = createStitches({
  theme: {
    colors: {
      gray900: "hsl(205,5%,7%)",
      gray800: "hsl(205,5%,10%)",
      gray750: "hsl(205,5%,15%)",
      gray700: "hsl(205,5%,25%)",
      gray600: "hsl(205,5%,30%)",
      gray500: "hsl(205,5%,35%)",
      gray400: "hsl(205,5%,45%)",
      gray300: "hsl(205,5%,65%)",
      gray200: "hsl(205,5%,80%)",
      gray100: "hsl(205,5%,90%)",
      gray50: "hsl(205,5%,95%)",
      blue500: "hsl(205,90%,45%)",

      // Alias
      primary: "$gray900",
      secondary: "$gray700",
      tertiary: "$gray500",

      darkPrimary: "$gray100",
      darkSecondary: "$gray200",
      darkTertiary: "$gray300",

      link: "$blue500",
      mutedLink: "$gray900",

      brightBg: "$gray50",
      lightBg: "$gray100",
      darkBg: "$gray800",
      noirBg: "$gray900",
      codeBg: "#fbfbfb",

      border: "$gray900",
      codeBorder: "$gray100",
    },
    space: {
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      13: "52px",
      14: "56px",
      15: "60px",
      16: "64px",
    },
    fonts: {
      sourceSans:
        "Source Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      lindenHill: "Linden Hill, MS Serif, New York, serif",
      sans: "$sourceSans",
      serif: "$lindenHill",
      mono: "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
    },
    fontWeights: {
      regular: "400",
      bold: "600",
      black: "900",
    },
    fontSizes: {
      1: "10px",
      2: "12px",
      3: "14px",
      4: "16px",
      5: "18px",
      6: "24px",
      7: "30px",
      8: "40px",
      9: "52px",
      10: "64px",
    },
    lineHeights,
    letterSpacings: {
      title: "-1px",
    },
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
  utils: {
    textSize: (value: string) => {
      const values = value.match(/[^\/]+/g).map((v) => v.trim());

      const fontSize = values[0];
      const lineHeight = values[1];
      const correctionTop = values[2];
      const correctionBottom = values[3];

      const clampedFontSizes = fontSize.match(/\$(\d+)/g);
      const lineHeightLiteral = lineHeight && lineHeight.match(/(\d+)/g)[0];
      const lineHeightScale =
        clampedFontSizes[clampedFontSizes.length - 1].substring(1);

      return {
        fontSize,
        margin: 0,
        ...leadingTrim({
          lineHeight:
            Number(lineHeightLiteral) || Number(lineHeights[lineHeightScale]),
          reference: {
            fontSize: 40,
            lineHeight: 1,
            topCrop: 6,
            bottomCrop: 5,
          },
          correction: {
            top: Number(correctionTop),
            bottom: Number(correctionBottom),
          },
        }),
      };
    },
  },
  media: {
    dark: "(prefers-color-scheme: dark)",
  },
});

export const darkTheme = createTheme("dark", {
  colors: {
    primary: "$gray100",
    secondary: "$gray200",
    tertiary: "$gray300",

    darkPrimary: "$gray100",
    darkSecondary: "$gray200",
    darkTertiary: "$gray300",

    link: "$blue500",
    mutedLink: "$gray100",

    brightBg: "$gray900",
    lightBg: "$gray800",
    darkBg: "$gray900",
    noirBg: "$gray900",
    codeBg: "#011627",

    border: "$gray100",
    codeBorder: "#0D2A45",
  },
});

const sansUnicodeRange =
  "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";

export const globalStyles = globalCss({
  "@font-face": [
    {
      fontFamily: "Source Sans",
      fontStyle: "normal",
      fontWeight: "600",
      fontDisplay: "swap",
      src: 'url("/fonts/sourcesans-600.woff2") format("woff2")',
      unicodeRange: sansUnicodeRange,
    },
    {
      fontFamily: "Source Sans",
      fontStyle: "normal",
      fontWeight: "900",
      fontDisplay: "swap",
      src: 'url("/fonts/sourcesans-900.woff2") format("woff2")',
      unicodeRange: sansUnicodeRange,
    },
    {
      fontFamily: "Source Sans",
      fontStyle: "normal",
      fontWeight: "400",
      fontDisplay: "swap",
      src: 'url("/fonts/sourcesans-400.woff2") format("woff2")',
      unicodeRange: sansUnicodeRange,
    },
    {
      fontFamily: "Linden Hill",
      fontStyle: "italic",
      fontWeight: "400",
      fontDisplay: "swap",
      src: 'url("/fonts/lindenhill-italic.woff") format("woff")',
      unicodeRange: "U+0000-00FF",
    },
  ],
  "*": { boxSizing: "border-box" },
  "html, body, ul, ol": { margin: 0, padding: 0 },
  html: { background: "$lightBg" },
  body: {
    fontFamily: "$sans",
    textSize: "$4",
    fontWeight: "$regular",
    lineHeight: "$4",
    color: "$primary",
  },
  li: { listStyle: "none" },
  "::-moz-selection": {
    background: "$blue500",
    color: "white",
    textShadow: ".05em .05em 0 #0005",
  },
  "::selection": {
    background: "$blue500",
    color: "white",
    textShadow: ".05em .05em 0 #0005",
  },
  "@dark": {
    ":root:not(.light)": {
      // @ts-ignore
      ...Object.keys(darkTheme.colors).reduce((varSet, currentColorKey) => {
        // @ts-ignore
        const currentColor = darkTheme.colors[currentColorKey];
        const currentColorValue =
          currentColor.value.substring(0, 1) === "$"
            ? `$colors${currentColor.value}`
            : currentColor.value;

        return {
          [currentColor.variable]: currentColorValue,
          ...varSet,
        };
      }, {}),
    },
  },
});
