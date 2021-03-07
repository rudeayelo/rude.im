import React from "react";
import { styled, css } from "src/styles";
import { Stack } from "src/components/Stack";
import { TwitterIcon } from "src/components/icons";
import { Band } from "src/components/Band";
import { SiteHeader } from "src/components/SiteHeader";
import { SectionHeading } from "src/components/SectionHeading";
import { Text } from "src/components/Text";
import { A } from "src/components/A";
import { SiteFooter } from "src/components/SiteFooter";
import { getAllFilesFrontMatter } from "src/lib/mdx";
import { formatShortDate } from "src/lib/dates";

const layout = css({
  maxWidth: "800px",
});

const articleGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gridRowGap: "$8",
  gridColumnGap: "$6",
  maxWidth: "70vw",
});

const FollowButton = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  padding: "$2 $4 $2 $3",
  background: "linear-gradient(to bottom, $gray100, $gray200)",
  borderRadius: "4px",
  textDecoration: "none",
  color: "$gray900",
  "&:hover": {
    background: "$gray100",
  },
  "&:focus": {
    outline: "2px solid $colors$link",
  },
  svg: {
    marginRight: "$1",
    display: "block",
    width: "24px",
  },
  span: {
    fontWeight: "$bold",
    fontSize: "$4",
    whiteSpace: "pre",
  },
});

const Home = ({ posts }) => (
  <>
    <SiteHeader />
    <main>
      <Band variant="noir">
        <Stack gap={10} className={layout()}>
          <Stack gap={6}>
            <Text
              css={{
                fontSize: "clamp($5, 4vw, $6)",
                color: "$darkTertiary",
                fontWeight: "$bold",
              }}
            >
              Hi, I’m Rude Ayelo
            </Text>
            <Text
              css={{
                fontSize: "clamp($5, 5vw, $7)",
                color: "$darkPrimary",
              }}
            >
              I do UI design and development and I’m currently leading a team at{" "}
              <A
                href="https://www.new-work.se/en/"
                css={{ color: "currentColor" }}
              >
                New Work (aka XING)
              </A>
              . I’m into design systems and enjoy building side projects to
              scratch my own itches.
            </Text>
          </Stack>
          <FollowButton
            href="https://twitter.com/Rude"
            data-splitbee-event="Follow on Twitter CTA"
          >
            <TwitterIcon />
            <span>Follow me</span>
          </FollowButton>
        </Stack>
      </Band>
      {/* <Band as="section" variant="bright">
        <Stack>
          <SectionHeading>I wrote about</SectionHeading>
          <ul className={articleGrid()}>
            {posts.map((post) => (
              <Stack gap={3} as="li" key={post.slug}>
                <Text
                  as="div"
                  css={{
                    fontSize: "$5",
                    fontWeight: "$black",
                  }}
                >
                  <A href={`/blog/${post.slug}`}>{post.title}</A>
                </Text>
                <Text css={{ color: "$tertiary", fontSize: "$4" }}>
                  {formatShortDate(post.publishedAt)}
                </Text>
              </Stack>
            ))}
          </ul>
        </Stack>
      </Band> */}
    </main>
    <SiteFooter />
  </>
);

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
}

export default Home;
