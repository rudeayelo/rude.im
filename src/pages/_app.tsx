import React from "react";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { darkTheme, globalStyles } from "src/styles";

globalStyles();

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.svg" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      <meta name="theme-color" content="#111213" />
    </Head>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        dark: darkTheme.className,
        light: "light",
      }}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;
