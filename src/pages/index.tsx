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
    "https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dsimple%26p%3D2g7JPD4KICA8TGluawogICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Tb3VyY2UrU2FucytQcm86d2dodEAzMDA7NjAwOzkwMCZkaXNwbGF5PWJsb2NrJwogICAgcmVsPSdzdHlsZXNoZWV0JwogIC8-CiAgPEZsZXgKICAgIHN4PXt7CiAgICAgIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywKICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LXN0YXJ0JywKICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsCiAgICAgIGJnOiAiaHNsKDIwNSw1JSw3JSkiLAogICAgICBwYWRkaW5nOiAiNDBweCIKICAgIH19CiAgPgogICAgPHN2ZwogICAgICB3aWR0aD17MTIwfQogICAgICBoZWlnaHQ9ezExMn0KICAgICAgdmlld0JveD0iMCAwIDkwIDg0IgogICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICJibG9jayIsIGZsZXhTaHJpbms6IDAgfX0KICAgID4KICAgICAgPHBhdGgKICAgICAgICBmaWxsPSJoc2woMjA1LDUlLDkwJSkiCiAgICAgICAgZD0iTTQ0LjY5NSAwQzYyLjc3Ny0uMDEgNzQuODU4IDMuNjgzIDgwLjk0IDExLjA4MmM1Ljk5OCA3LjI5NiA5LjAxOCAxNy4zODggOS4wNiAzMC4yNzR2LjM5MmMuMDMzIDEzLjI0OC0yLjk4NyAyMy42MDItOS4wNiAzMS4wNjJDNzQuOTIgODAuMjA2IDYzLjAxOCA4My45MzYgNDUuMjM2IDg0aC0uNDIxbC0uNjAzLS4wMDFDMjYuNjc0IDgzLjkxNSAxNC45MyA4MC4xODUgOC45OCA3Mi44MSAzLjAyOSA2NS40MzMuMDM2IDU1LjIyNyAwIDQyLjE5MnYtLjM5NkMtLjAyNCAyOC43IDIuOTcgMTguNDYxIDguOTggMTEuMDgyIDE0Ljk0NyAzLjc1NyAyNi43NC4wNjQgNDQuMzYzIDBMNDQuNjk1IDB6TTI5LjA1MyAxNS4xMjRsLS4xNzIuMDAxYy01LjY2Mi4wNC05LjQ1IDIuNC0xMS4zNjggNy4wODEtLjYzOCAxLjU1OS0xLjE3IDMuMzE3LTEuNTk3IDUuMjc1bC0uMTM4LjY2LS4wNzIuMzYzLS4wNTIuMjc1LS4wNS4yNzctLjA2Ni4zNzQtLjA2NC4zNzhjLS4wNTUuMzM4LS4xMDguNjgtLjE1NyAxLjAzbC0uMDczLjUyNS0uMDUyLjQtLjA1LjQwNC0uMDEyLjEwMS0uMDEyLjEwMi0uMDQ2LjQxLS4wNDQuNDE1LS4wMjEuMjEtLjAyLjIxLS4wNC40MjMtLjAzNy40MjgtLjAxLjEwNy0uMDA4LjEwOC0uMDMzLjQzNC0uMDMyLjQzOS0uMDIyLjMzMS0uMDIuMzM0LS4wMjYuNDUtLjAxOC4zNC0uMDE2LjM0Mi0uMDIuNDYtLjAxOC40NjQtLjAwOC4yMzQtLjAxNC40Ny0uMDEyLjQ3Ni0uMDA1LjI0LS4wMDQuMjQtLjAwNy40ODMtLjAwNS40ODktLjAwMS4xMjJ2LjEyM2wtLjAwMi40OTV2LjUwM2wuMDAxLjQ5NS4wMDIuMjQ2LjAwNS40ODguMDA3LjQ4NC4wMS40OC4wMTEuNDc0LjAxNC40NzEuMDA4LjIzNC4wMTguNDY0LjAyLjQ2LjAxNi4zNDMuMDE4LjM0LjAyNi40NDkuMDIuMzM0LjAyMi4zMzIuMDMyLjQzOC4wMzMuNDM0LjAxOC4yMTYuMDM3LjQyNy4wNC40MjQuMDIuMjEuMDIuMjA5LjA0NS40MTQuMDQ2LjQxLjAyNC4yMDQuMDUuNDA0LjA1Mi40Yy4wNDcuMzUzLjA5Ny43MDEuMTUgMS4wNDVsLjA4LjUxLjA2NC4zNzguMDY2LjM3NC4wNS4yNzcuMDUyLjI3NS4wNzIuMzYzYy40NDggMi4yMjUgMS4wMjYgNC4yMDMgMS43MzUgNS45MzUgMS44OTQgNC42MjUgNS42MTcgNi45ODQgMTEuMTY3IDcuMDc5bC4zNzMuMDAzLjE3Mi0uMDAxYzUuNjYxLS4wNCA5LjQ1LTIuNCAxMS4zNjctNy4wODEuNzEtMS43MzQgMS4yOS0zLjcxNCAxLjczNy01Ljk0MWwuMTE5LS42MTQuMDY4LS4zNzRjLjExNy0uNjU4LjIyNC0xLjMzNy4zMi0yLjAzNmwuMDkyLS43MDUuMDUtLjQxLjA0Ny0uNDEzLjA1Ni0uNTI0LjA1Mi0uNTMuMDM4LS40MjkuMDM3LS40MzQuMDI2LS4zMjguMDI1LS4zMy4wMy0uNDQ1LjAyOS0uNDQ5LjAyNi0uNDUzLjAxMi0uMjI4LjAxMi0uMjMuMDIxLS40NjIuMDItLjQ2Ni4wMTYtLjQ3MS4wMDgtLjIzNy4wMDctLjIzOS4wMTItLjQ4LjAxLS40ODQuMDA3LS40ODguMDA0LS4zNy4wMDItLjM3MS4wMDItLjV2LS41MDNsLS4wMDItLjUtLjAwMi0uMzcxLS4wMDQtLjM3LS4wMDgtLjQ4OC0uMDEtLjQ4NS0uMDExLS40OC0uMDA3LS4yMzgtLjAwOC0uMjM3LS4wMTctLjQ3LS4wMTktLjQ2Ny0uMDIxLS40NjItLjAxMi0uMjMtLjAxMi0uMjI4LS4wMjYtLjQ1My0uMDI4LS40NS0uMDMxLS40NDQtLjAyNS0uMzMtLjAyNi0uMzI4LS4wMzctLjQzNC0uMDM4LS40MjktLjA1Mi0uNTMtLjA1Ni0uNTIzLS4wNDctLjQxNC0uMDUtLjQxLS4wNzgtLjYwNS0uMDg0LS41OTYtLjA2LS4zOTFjLS40OC0zLjExNi0xLjE4NC01LjgwOC0yLjExNC04LjA3OC0xLjkzNi00LjcyNy01Ljc4Mi03LjA4OC0xMS41NC03LjA4MnptMzkuMTU1IDQzLjIyOGgtLjAzNmMtMS45MzcuMDA3LTMuMjMzLjQ0Mi0zLjg4OSAxLjMwNC0uNjYuODctLjk4OSAyLjA3NS0uOTg2IDMuNjE3di4wNDZjLjAwNCAxLjUzNS4zMzIgMi43MzcuOTg2IDMuNjA1LjY2My44OCAxLjk3OCAxLjMxOSAzLjk0OCAxLjMxOGguMDM3YzEuOTU0LS4wMDggMy4yNjEtLjQ0NyAzLjkyMy0xLjMxOC42NjctLjg3OCAxLTIuMDk3Ljk5Ni0zLjY1N3YtLjA0NmMtLjAwNS0xLjUxNy0uMzM3LTIuNzA1LS45OTYtMy41NjUtLjY2OC0uODctMS45OTYtMS4zMDYtMy45ODMtMS4zMDR6bS03LjY2Ni00My4yMjdsLS4zNzMuMDAzYy01LjU1LjA5NC05LjI3MyAyLjQ1My0xMS4xNjcgNy4wNzgtMS45MzYgNC43MjgtMi44OTcgMTEuMjkyLTIuODggMTkuNjkybC4zMTIuMDMuMzEuMDMgMS4yMTguMTEzIDEuMTg5LjEwMSAxLjE1OS4wOSAxLjEyOS4wNzYgMS4xLjA2NSAxLjA2OS4wNTQgMS4wNC4wNDEgMS4wMS4wMy45OC4wMTcuOTUuMDA2aC4yMzJsLjIzMS0uMDAyLjkwNi0uMDEyLjg3NS0uMDI0Ljg0Ni0uMDM2LjIwNy0uMDEuMjA1LS4wMTIuODAxLS4wNTQuMTk2LS4wMTUuMTkzLS4wMTYuNzU3LS4wNzFjMi41OTUtLjI3MSA0LjY0MS0uNzYgNi4xNC0xLjQ2OCAzLjkyNS0xLjg1NCA1Ljg4OC02LjMyNSA1Ljg4OC0xMy40MTIgMC0uODE4LS4wNjYtMS41NC0uMTktMi4xNzItLjM0NC0zLjY0LTEuNjY5LTYuMTcyLTMuOTc0LTcuNTkzLTIuNzMzLTEuNjg2LTYuMTg2LTIuNTI5LTEwLjM2LTIuNTI5eiIKICAgICAgICBmaWxsUnVsZT0iZXZlbm9kZCIKICAgICAgLz4KICAgIDwvc3ZnPgogICAgPEZsZXggc3g9e3sKICAgICAgbWFyZ2luVG9wOiA0LAogICAgICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsCiAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsCiAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLAogICAgfX0-CiAgICA8VGV4dAogICAgICBzeD17ewogICAgICAgIGZvbnRGYW1pbHk6ICdTb3VyY2UgU2FucyBQcm8nLAogICAgICAgIGZvbnRTaXplOiA1LAogICAgICAgIGZvbnRXZWlnaHQ6IDYwMCwKICAgICAgICBjb2xvcjogImhzbCgyMDUsNSUsNjUlKSIsCiAgICAgIH19CiAgICA-CiAgICAgIEhpLCBJJ20gUnVkZSBBeWVsbwogICAgPC9UZXh0PgogICAgPFRleHQKICAgICAgc3g9e3sKICAgICAgICBmb250RmFtaWx5OiAnU291cmNlIFNhbnMgUHJvJywKICAgICAgICBmb250U2l6ZTogIjU2cHgiLAogICAgICAgIGZvbnRXZWlnaHQ6IDMwMCwKICAgICAgICBsaW5lSGVpZ2h0OiAxLjEsCiAgICAgICAgY29sb3I6ICJoc2woMjA1LDUlLDkwJSkiCiAgICAgIH19CiAgICA-CiAgICAgIEkgZG8gVUkgZGVzaWduIGFuZCBkZXZlbG9wbWVudCwgSSdtIGludG8gZGVzaWduIHN5c3RlbXMgYW5kIGdlbmVyYWwgd2ViIGNyYWZ0aW5nCiAgICA8L1RleHQ-CiAgICA8L0ZsZXg-CiAgPC9GbGV4Pgo8Lz4%23",
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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Rude" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Head>
    <SiteHeader />
    <main>
      <Band variant="noir">
        <Stack gap={10} className={layout()}>
          <Stack gap={6}>
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
                css={{ color: "currentColor" }}
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
              <Stack gap={3} as="li" key={post.slug}>
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
