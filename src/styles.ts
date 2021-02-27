import { createCss } from "@stitches/react";
import { leadingTrim } from "leading-trim";

export const {
  css,
  styled,
  global,
  theme,
  keyframes,
  getCssString,
} = createCss({
  theme: {
    colors: {
      gray900: "hsl(205,5%,10%)",
      gray800: "hsl(205,5%,15%)",
      gray700: "hsl(205,5%,25%)",
      gray600: "hsl(205,5%,30%)",
      gray500: "hsl(205,5%,35%)",
      gray400: "hsl(205,5%,45%)",
      gray300: "hsl(205,5%,60%)",
      gray200: "hsl(205,5%,75%)",
      gray100: "hsl(205,5%,90%)",
      blue500: "hsl(205,90%,45%)",

      // Alias
      primary: "$gray900",
      secondary: "$gray700",
      tertiary: "$gray500",
      link: "$gray800",
      bg: "$gray100",
      logo: "$gray100",
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
      inter:
        "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      varta:
        "Varta, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      fanwood: "Fanwood, MS Serif, New York, serif",
      lindenHill: "Linden Hill, MS Serif, New York, serif",
      sans: "$varta",
      serif: "$lindenHill",
      mono:
        "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
    },
    fontWeights: {
      regular: "300",
      bold: "600",
      black: "700",
    },
    fontSizes: {
      1: "10px",
      2: "12px",
      3: "14px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "30px",
      8: "40px",
      9: "52px",
      10: "64px",
    },
    lineHeights: {
      1: "1.5",
      2: "1.6",
      3: "1.5",
      4: "1.4",
      5: "1.4",
      6: "1.3",
      7: "1.3",
      8: "1.1",
      9: "0.9",
      10: "0.9",
    },
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
  utils: {
    fontSize: ({ theme }) => (value: string) => ({
      fontSize: value,
      margin: 0,
      ...leadingTrim({
        lineHeight: theme.lineHeights[value.slice(1)],
        reference: {
          fontSize: 40,
          lineHeight: 1,
          topCrop: 0,
          bottomCrop: 12,
        },
      }),
    }),
  },
  conditions: {
    sm: "@media (min-width: 576px)",
    md: "@media (min-width: 768px)",
    lg: "@media (min-width: 992px)",
  },
});

global({
  "@font-face": {
    fontFamily: "Varta",
    fontStyle: "normal",
    fontWeight: "300 700",
    fontDisplay: "swap",
    src: 'url("/fonts/varta.woff2") format("woff2")',
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  },
  "*": {
    boxSizing: "border-box",
  },
  "html, body, ul, ol": {
    margin: 0,
    padding: 0,
  },
  html: { background: "$bg" },
  body: {
    fontFamily: "$sans",
    color: "$primary",
    fontSize: "$4",
    lineHeight: "$4",
  },
  li: {
    listStyle: "none",
  },
})();

global({
  "@font-face": {
    fontFamily: "Linden Hill",
    fontStyle: "italic",
    fontWeight: "400",
    fontDisplay: "swap",
    src: 'url("/fonts/lindenhill-italic.woff") format("woff")',
    unicodeRange: "U+0000-00FF",
  },
})();

const morning = theme({
  colors: {
    primary: "$gray900",
    secondary: "$gray700",
    tertiary: "$gray500",
    link: "$gray800",
    bg: "$gray100",
  },
});

const dark = theme({
  colors: {
    primary: "$gray100",
    secondary: "$gray300",
    tertiary: "$gray400",
    link: "$gray100",
    bg: "$gray800",
  },
});

const noir = theme({
  colors: {
    primary: "$gray100",
    secondary: "$gray300",
    tertiary: "$gray500",
    link: "$gray900",
    bg: "$gray900",
  },
});

export const themes = {
  morning,
  dark,
  noir,
};
