import Head from "next/head";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const PrismTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Head>
      {resolvedTheme === "dark" ? (
        <link
          href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/style.css"
          rel="stylesheet"
        />
      ) : (
        <link
          href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/light.css"
          rel="stylesheet"
        />
      )}
    </Head>
  );
};
