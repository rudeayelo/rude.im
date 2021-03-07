import { Band } from "src/components/Band";
import { Stack } from "src/components/Stack";
import { A } from "src/components/A";
import { Text } from "src/components/Text";
import { SectionHeading } from "src/components/SectionHeading";
import { css, styled } from "src/styles";

const Quote = styled(Text, {
  fontFamily: "$serif",
  fontStyle: "italic",
  color: "$primary",
  fontSize: "clamp($7, 8vw, $8)",
});

const SocialLinkList = styled("ul", {
  display: "flex",
});

const socialLink = css({
  fontSize: "$4",
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
      data-splitbee-event={`Clicked on ${children} link`}
    >
      {children}
    </A>
  </li>
);

const quoteAuthor = css({
  color: "$secondary",
  fontWeight: "$bold",
});

export const SiteFooter = () => (
  <Band as="footer">
    <Stack gap={10} divider>
      <Stack as="section">
        <SectionHeading>I was once told</SectionHeading>
        <Stack gap={4}>
          <Quote>“You're not rude at all”</Quote>
          <Text css={{ color: "$tertiary", fontSize: "$4" }}>
            — <span className={quoteAuthor()}>Student</span>, Ironhack, 2015
          </Text>
        </Stack>
      </Stack>
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
