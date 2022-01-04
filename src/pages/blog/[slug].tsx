import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import { css } from "src/styles";
import { getFiles, getFileBySlug } from "src/lib/mdx";
import { formatShortDate } from "src/lib/dates";
import { SiteHeader } from "src/components/SiteHeader";
import { MDXComponents } from "src/components/MDXComponents";
import { Band } from "src/components/Band";
import { SiteFooter } from "src/components/SiteFooter";
import { Stack } from "src/components/Stack";
import { Text } from "src/components/Text";
import { PrismTheme } from "src/components/PrismTheme";
import { Inline } from "src/components/Inline";
import { useRouter } from "next/router";

const layout = css({
  maxWidth: "700px",
});

const Blog = ({ source, frontMatter }) => {
  const router = useRouter();

  const meta = {
    title: `Rude Ayelo / ${frontMatter.title}`,
    description: frontMatter.summary,
    image: frontMatter.image,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://rude.im${router.asPath}`} />
        <link rel="canonical" href={`https://rude.im${router.asPath}`} />
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
      <PrismTheme />
      <SiteHeader />
      <Band as="main" variant="bright">
        <Stack as="article" gap="8" className={layout()}>
          <Stack gap="6">
            <Text
              as="h1"
              css={{
                textSize: "clamp($7, 5vw, $9)",
                color: "$primary",
                fontWeight: "$black",
                letterSpacing: "$title",
              }}
            >
              {frontMatter.title}
            </Text>
            <Inline>
              <Text
                css={{
                  color: "$secondary",
                  textSize: "$5",
                  fontWeight: "$bold",
                }}
              >
                Rude Ayelo
              </Text>
              <Text css={{ color: "$tertiary", textSize: "$5" }}>/</Text>
              <Text css={{ color: "$secondary", textSize: "$5" }}>
                {formatShortDate(frontMatter.publishedAt)}
              </Text>
            </Inline>
          </Stack>
          <MDXRemote {...source} components={MDXComponents} />
        </Stack>
      </Band>
      <SiteFooter />
    </>
  );
};

export async function getStaticPaths() {
  const posts = await getFiles("blog");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug("blog", params.slug);

  return { props: post };
}

export default Blog;
