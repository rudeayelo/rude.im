import { useEffect, useState } from "react";
import { css } from "src/styles";
import { useTheme } from "next-themes";
import { ThemeIcon } from "src/components/icons";

const toggleButton = css({
  borderRadius: "22px",
  marginBottom: "$8",
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  fontFamily: "$body",
  fontSize: "$4",
  fontWeight: "$bold",
  padding: "$3 $4",
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

export const ThemeToggleDemo = () => {
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
      <ThemeIcon className={css({ display: "block", marginRight: "$2" })()} />
      Switch theme
    </button>
  );
};
