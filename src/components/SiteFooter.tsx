import { useRouter } from "next/router";
import { css, styled } from "src/styles";
import { Band } from "src/components/Band";
import { Stack } from "src/components/Stack";
import { A } from "src/components/A";
import { Text } from "src/components/Text";
import { SectionHeading } from "src/components/SectionHeading";

const Quote = styled(Text, {
  fontFamily: "$serif",
  fontStyle: "italic",
  color: "$primary",
  textSize: "clamp($7, 8vw, $8) / $8 / 3 / -4",
});

const SocialLinkList = styled("ul", {
  display: "flex",
});

const socialLink = css({
  textSize: "$4",
  marginRight: "$4",
});

const SocialLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li className={socialLink()}>
    <A
      href={href}
      variant="muted"
      data-splitbee-event={`Click on ${children} link`}
    >
      {children}
    </A>
  </li>
);

const quoteAuthor = css({
  color: "$secondary",
  fontWeight: "$bold",
});

export const SiteFooter = () => {
  const { pathname } = useRouter();

  return (
    <Band as="footer">
      <Stack gap={10} divider>
        {pathname === "/" && (
          <Stack as="section">
            <SectionHeading>I was once told</SectionHeading>
            <Stack gap={4}>
              <Quote>“You're not rude at all”</Quote>
              <Text css={{ color: "$tertiary", textSize: "$4" }}>
                — <span className={quoteAuthor()}>Student</span>, Ironhack, 2015
              </Text>
            </Stack>
          </Stack>
        )}
        <Stack as="section">
          <SectionHeading>Find me also on</SectionHeading>
          <SocialLinkList>
            <SocialLink href="https://github.com/rudeayelo">Github</SocialLink>
            <SocialLink href="https://dribbble.com/Rude">Dribbble</SocialLink>
            <SocialLink href="https://www.linkedin.com/in/rudeayelo/">
              Linkedin
            </SocialLink>
          </SocialLinkList>
        </Stack>
      </Stack>
    </Band>
  );
};
