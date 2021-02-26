import { styled, css } from "src/styles";
import { Logo } from "src/components/Logo";
import { Stack } from "src/components/Stack";

const Text = styled("p", {
  color: "$gray100",
  fontWeight: "$regular",
  maxWidth: "800px",
  fontSize: "$7",
});

const Quote = styled(Text, {
  fontFamily: "$serif",
  fontStyle: "italic",
  color: "$gray800",
  fontSize: "$8",
});

const Heading = styled("h1", {
  variants: {
    size: {
      1: {
        fontSize: "$6",
        color: "$gray400",
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
  variants: {
    variant: {
      normal: {
        color: "$gray100",
      },
      invert: {
        color: "$gray800",
      },
    },
  },
  defaultVariants: {
    variant: "normal",
  },
});

const Band = styled("div", {
  background: "$gray900",
  padding: "$10",
});

const Footer = styled(Band, {
  background: "white",
});

const SocialLinks = styled("ul", {
  display: "flex",
});

const SocialItem = styled("li", {
  fontSize: "$4",
  marginRight: "$4",
});

const FollowButton = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  padding: "$2 $4 $2 $3",
  // background: "linear-gradient(to bottom, $gray200, $gray300)",
  background: "$gray100",
  borderRadius: "4px",
  textDecoration: "none",
  "&:hover": {
    background: "$gray200",
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

const Home = () => {
  return (
    <>
      <Band as="header">
        <Logo />
      </Band>
      <main>
        <Band as="section">
          <Stack gap={10}>
            <Stack gap={6}>
              <Heading>Hi, I’m Rude Ayelo</Heading>
              <Text>
                I do software design and development and I’m currently leading a
                team at{" "}
                <A href="https://www.new-work.se/en/">New Work (aka XING)</A>.
                I’m into design systems and enjoy building side projects to
                scratch my own itches.
              </Text>
            </Stack>
            <FollowButton href="https://twitter.com/Rude">
              <TwitterIcon />
              <span>Follow me</span>
            </FollowButton>
          </Stack>
        </Band>
        <Band as="section" css={{ background: "$gray100" }}>
          <Stack gap={6}>
            <Heading size="2">I was once told</Heading>
            <Stack gap={4}>
              <Quote>“You're not rude at all”</Quote>
              <Text css={{ color: "$gray500", fontSize: "$4" }}>
                —{" "}
                <span
                  className={css({ color: "$gray700", fontWeight: "$bold" })()}
                >
                  Student
                </span>
                , Ironhack, 2015
              </Text>
            </Stack>
          </Stack>
        </Band>
      </main>
      <Footer as="footer">
        <Stack gap={6}>
          <Heading size="2">Find me also on</Heading>
          <SocialLinks>
            <SocialItem>
              <A variant="invert" href="https://github.com/rudeayelo">
                Github
              </A>
            </SocialItem>
            <SocialItem>
              <A variant="invert" href="https://dribbble.com/Rude">
                Dribbble
              </A>
            </SocialItem>
            <SocialItem>
              <A variant="invert" href="https://www.linkedin.com/in/rudeayelo/">
                Linkedin
              </A>
            </SocialItem>
          </SocialLinks>
        </Stack>
      </Footer>
    </>
  );
};

export default Home;
