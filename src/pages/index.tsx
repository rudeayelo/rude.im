import React from "react";
import Head from "next/head";
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
    textSize: "$4 / $4 / 0 / 1",
    whiteSpace: "pre",
  },
});

const meta = {
  title: "Rude Ayelo / UI designer and developer",
  description:
    "I do UI design and development, I'm into design systems and general web crafting",
  image:
    "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dajames%26p%3D2gQLPD4KICA8TGluawogICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Tb3VyY2UrU2FucytQcm86d2dodEAzMDA7NjAwOzkwMCZkaXNwbGF5PWJsb2NrJwogICAgcmVsPSdzdHlsZXNoZWV0JwogIC8-CiAgPEZsZXgKICAgIHN4PXt7CiAgICAgIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywKICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JywKICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsCiAgICAgIGJnOiAiaHNsKDIwNSw1JSw3JSkiLAogICAgICBwYWRkaW5nOiAiNDBweCIKICAgIH19CiAgPgogICAgPGltZyBzcmM9Imh0dHBzOi8vcnVkZS5pbS9mYXZpY29uLWRhcmsuc3ZnIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgLz4KICAgIDxGbGV4IHN4PXt7CiAgICAgIG1hcmdpblRvcDogNCwKICAgICAgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLAogICAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtc3RhcnQnLAogICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywKICAgIH19PgogICAgPFRleHQKICAgICAgc3g9e3sKICAgICAgICBmb250RmFtaWx5OiAnU291cmNlIFNhbnMgUHJvJywKICAgICAgICBmb250U2l6ZTogNSwKICAgICAgICBmb250V2VpZ2h0OiA2MDAsCiAgICAgICAgY29sb3I6ICJoc2woMjA1LDUlLDY1JSkiLAogICAgICB9fQogICAgPgogICAgICBIaSwgSSdtIFJ1ZGUgQXllbG8KICAgIDwvVGV4dD4KICAgIDxUZXh0CiAgICAgIHN4PXt7CiAgICAgICAgZm9udEZhbWlseTogJ1NvdXJjZSBTYW5zIFBybycsCiAgICAgICAgZm9udFNpemU6ICI1NnB4IiwKICAgICAgICBmb250V2VpZ2h0OiAzMDAsCiAgICAgICAgbGluZUhlaWdodDogMS4xLAogICAgICAgIGNvbG9yOiAiaHNsKDIwNSw1JSw5MCUpIgogICAgICB9fQogICAgPgogICAgICBJIGRvIFVJIGRlc2lnbiBhbmQgZGV2ZWxvcG1lbnQsIEknbSBpbnRvIGRlc2lnbiBzeXN0ZW1zIGFuZCBnZW5lcmFsIHdlYiBjcmFmdGluZwogICAgPC9UZXh0PgogICAgPC9GbGV4PgogIDwvRmxleD4KPC8-%23",
};

const Home = ({ posts }) => (
  <>
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content="https://rude.im" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rude Ayelo" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:width" content="1686" />
      <meta property="og:image:height" content="956" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Rude" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Head>
    <SiteHeader />
    <main>
      <Band variant="noir">
        <Stack gap="10" className={layout()}>
          <Stack gap="6">
            <Text
              css={{
                textSize: "clamp($5, 4vw, $6)",
                color: "$darkTertiary",
                fontWeight: "$bold",
              }}
            >
              Hi, I’m Rude Ayelo
            </Text>
            <Text
              css={{
                textSize: "clamp($5, 5vw, $7)",
                color: "$darkPrimary",
              }}
            >
              I do UI design and development and I’m currently leading a team at{" "}
              <A
                href="https://www.new-work.se/en/"
                variant="discrete"
                data-splitbee-event="Clicked on New Work link"
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
      <Band as="section" variant="bright">
        <Stack>
          <SectionHeading>I wrote about</SectionHeading>
          <ul className={articleGrid()}>
            {posts.map((post) => (
              <Stack gap="4" as="li" key={post.slug}>
                <Text
                  as="div"
                  css={{
                    textSize: "$5",
                    fontWeight: "$black",
                  }}
                >
                  <A href={`/blog/${post.slug}`}>{post.title}</A>
                </Text>
                <Text css={{ color: "$tertiary", textSize: "$4" }}>
                  {formatShortDate(post.publishedAt)}
                </Text>
              </Stack>
            ))}
          </ul>
        </Stack>
      </Band>
    </main>
    <SiteFooter />
  </>
);

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
}

export default Home;
