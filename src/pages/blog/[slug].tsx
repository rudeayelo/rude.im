import hydrate from "next-mdx-remote/hydrate";
import { getFiles, getFileBySlug } from "src/lib/mdx";
import { SiteHeader } from "src/components/SiteHeader";
import { MDXComponents } from "src/components/MDXComponents";
import { Band } from "src/components/Band";
import { css } from "src/styles";
import { SiteFooter } from "src/components/SiteFooter";
import { Stack } from "src/components/Stack";
import { Text } from "src/components/Text";
import { formatShortDate } from "src/lib/dates";
import { PrismTheme } from "src/components/PrismTheme";

const layout = css({
  maxWidth: "700px",
});

const Blog = ({ mdxSource, frontMatter }) => {
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  });

  return (
    <>
      <PrismTheme />
      <SiteHeader />
      <Band as="main" variant="bright">
        <Stack as="article" gap={8} className={layout()}>
          <Stack gap={4}>
            <Text
              as="h1"
              css={{
                fontSize: "clamp($7, 5vw, $9)",
                color: "$primary",
                fontWeight: "$black",
              }}
            >
              {frontMatter.title}
            </Text>
            <Text css={{ color: "$secondary", fontSize: "$5" }}>
              {formatShortDate(frontMatter.publishedAt)}
            </Text>
          </Stack>
          <>{content}</>
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
