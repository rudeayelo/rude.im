import React from "react";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { darkTheme } from "src/styles";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="theme-color" content="#fffff" />

        <title>Rude Ayelo</title>
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
};

export default App;
