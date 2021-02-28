import React from "react";
import { styled, css, themes } from "src/styles";
import { Logo } from "src/components/Logo";
import { Stack } from "src/components/Stack";
import { useTheme } from "next-themes";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const Text = styled("p", {
  color: "$primary",
  fontWeight: "$regular",
  maxWidth: "800px",
  fontSize: "$7",
});

const Quote = styled(Text, {
  fontFamily: "$serif",
  fontStyle: "italic",
  color: "$primary",
  fontSize: "$8",
});

const Heading = styled("h1", {
  variants: {
    size: {
      1: {
        fontSize: "$6",
        color: "$secondary",
        fontWeight: "$black",
      },
      2: {
        fontSize: "$3",
        color: "$secondary",
        fontWeight: "$bold",
        textTransform: "uppercase",
      },
    },
  },
  defaultVariants: {
    size: "1",
  },
});

const A = styled("a", {
  fontWeight: "$bold",
  textDecoration: "none",
  "&:visited": {
    color: "currentColor",
  },
  "&:focus": {
    outline: "2px solid $colors$blue500",
  },
});

const Band = styled("section", {
  background: "$bg",
  padding: "$10",
});

const Footer = styled(Band, {
  background: "$bg",
});

const SocialLinkList = styled("ul", {
  display: "flex",
});

const SocialLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li
    className={css({
      fontSize: "$4",
      marginRight: "$4",
    })()}
  >
    <A href={href} css={{ color: "$link" }}>
      {children}
    </A>
  </li>
);

const FollowButton = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  padding: "$2 $4 $2 $3",
  background: "linear-gradient(to bottom, $gray100, $gray200)",
  boxShadow: "inset 0 1px 0 white, inset 0 3px 5px white",
  borderRadius: "4px",
  textDecoration: "none",
  "&:hover": {
    background: "$gray100",
  },
  "&:focus": {
    outline: "2px solid $colors$blue500",
  },
  svg: {
    marginRight: "$1",
    display: "block",
    width: "24px",
  },
  span: {
    color: "$gray900",
    fontWeight: "$black",
    fontSize: "$4",
    whiteSpace: "pre",
  },
});

const TwitterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={css({ fill: "$gray900" })()}
      d="M8.08 20A11.07 11.07 0 0 0 19.52 9 8.09 8.09 0 0 0 21 6.16a.44.44 0 0 0-.62-.51 1.88 1.88 0 0 1-2.16-.38 3.89 3.89 0 0 0-5.58-.17A4.13 4.13 0 0 0 11.49 9C8.14 9.2 5.84 7.61 4 5.43a.43.43 0 0 0-.75.24 9.68 9.68 0 0 0 4.6 10.05A6.73 6.73 0 0 1 3.38 18a.45.45 0 0 0-.14.84A11 11 0 0 0 8.08 20"
    />
  </svg>
);

const ThemeIcon = () => (
  <svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
      fill="currentColor"
    />
    <path
      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      className={css({
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
      })()}
      onClick={toggleTheme}
    >
      <ThemeIcon />
      <VisuallyHidden.Root>Switch theme</VisuallyHidden.Root>
    </button>
  );
};

const Home = () => {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Band className={themes.noir} as="header">
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          })()}
        >
          <Logo chrome={resolvedTheme === "dark"} />
          <ThemeToggle />
        </div>
      </Band>
      <main>
        <Band className={themes.noir}>
          <Stack gap={10}>
            <Stack gap={6}>
              <Heading>Hi, I’m Rude Ayelo</Heading>
              <Text>
                I do UI design and development and I’m currently leading a team
                at <A href="https://www.new-work.se/en/">New Work (aka XING)</A>
                . I’m into design systems and enjoy building side projects to
                scratch my own itches.
              </Text>
            </Stack>
            <FollowButton href="https://twitter.com/Rude">
              <TwitterIcon />
              <span>Follow me</span>
            </FollowButton>
          </Stack>
        </Band>
        <Band>
          <Stack gap={6}>
            <Heading size="2">I was once told</Heading>
            <Stack gap={4}>
              <Quote>“You're not rude at all”</Quote>
              <Text css={{ color: "$tertiary", fontSize: "$4" }}>
                —{" "}
                <span
                  className={css({
                    color: "$secondary",
                    fontWeight: "$bold",
                  })()}
                >
                  Student
                </span>
                , Ironhack, 2015
              </Text>
            </Stack>
          </Stack>
        </Band>
        {/* <Band className={themes.noir}>
          <Stack gap={6}>
            <Heading size="2">Side projects</Heading>
          </Stack>
        </Band> */}
      </main>
      <Footer as="footer">
        <Stack gap={6}>
          <Heading size="2">Find me also on</Heading>
          <SocialLinkList>
            <SocialLink href="https://github.com/rudeayelo">Github</SocialLink>
            <SocialLink href="https://dribbble.com/Rude">Dribbble</SocialLink>
            <SocialLink href="https://www.linkedin.com/in/rudeayelo/">
              Linkedin
            </SocialLink>
          </SocialLinkList>
        </Stack>
      </Footer>
    </>
  );
};

export default Home;
