import { useEffect, useState } from "react";
import { css } from "src/styles";
import { useTheme } from "next-themes";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ThemeIcon } from "src/components/icons";

const toggleButton = css({
  borderRadius: "22px",
  position: "relative",
  display: "inline-flex",
  padding: "$3",
  color: "$gray400",
  border: 0,
  cursor: "pointer",
  background: "$gray800",
  "&:hover": {
    color: "$gray100",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px $colors$blue500",
  },
});

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const targetTheme = resolvedTheme === "light" ? "dark" : "light";

    (window as any).splitbee?.track(`Switch to ${targetTheme} theme`);

    setTheme(targetTheme);
  };

  return (
    <button className={toggleButton()} onClick={toggleTheme}>
      <ThemeIcon />
      <VisuallyHidden.Root>Switch theme</VisuallyHidden.Root>
    </button>
  );
};
