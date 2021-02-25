import React from "react";
import Head from "next/head";

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.svg" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      <meta name="theme-color" content="#fffff" />

      <title>Rude Ayelo</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
