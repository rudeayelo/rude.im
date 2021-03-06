import { Logo } from "src/components/Logo";
import { ThemeToggle } from "src/components/ThemeToggle";
import { styled } from "src/styles";
import { Band } from "src/components/Band";
import { Link } from "./A";

const Header = styled(Band, {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const SiteHeader = () => (
  <Header as="header" variant="noir">
    <Link href="/" css={{ display: "block", minHeight: "84px" }}>
      <Logo />
    </Link>
    <ThemeToggle />
  </Header>
);
