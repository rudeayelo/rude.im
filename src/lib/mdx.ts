import fs from "fs";
import matter from "gray-matter";
import mdxPrism from "mdx-prism";
import path from "path";
import renderToString from "next-mdx-remote/render-to-string";
import { MDXComponents } from "src/components/MDXComponents";

const root = process.cwd();

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, "src", "data", type));
}

export async function getFileBySlug(type, slug) {
  const source = slug
    ? fs.readFileSync(
        path.join(root, "src", "data", type, `${slug}.mdx`),
        "utf8"
      )
    : fs.readFileSync(path.join(root, "src", "data", `${type}.mdx`), "utf8");

  const { data, content } = matter(source);
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require("remark-autolink-headings"),
        require("remark-slug"),
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\S+/g).length,
      slug: slug || null,
      ...data,
    },
  };
}

export async function getAllFilesFrontMatter(type) {
  const files = fs.readdirSync(path.join(root, "src", "data", type));

  const posts = files.reduce((allPosts, postSlug) => {
    if (postSlug.substr(postSlug.lastIndexOf(".") + 1) !== "mdx")
      return [...allPosts];

    const source = fs.readFileSync(
      path.join(root, "src", "data", type, postSlug),
      "utf8"
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(".mdx", ""),
      },
      ...allPosts,
    ];
  }, []);

  posts.sort((a, b) => {
    // @ts-ignore
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  return posts;
}
