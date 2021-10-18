import { Logo } from "src/components/Logo";
import { ThemeToggle } from "src/components/ThemeToggle";
import { band } from "src/components/Band";
import { Link } from "./A";

export const SiteHeader = () => (
  <header
    className={band({
      variant: "noir",
      css: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    })}
  >
    <Link href="/" css={{ display: "block", minHeight: "84px" }}>
      <Logo />
    </Link>
    <ThemeToggle />
  </header>
);
