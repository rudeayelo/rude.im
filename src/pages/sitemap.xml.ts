import { getFiles } from "src/lib/mdx";

const BLOG_URL = "https://rude.im/blog";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://rude.im</loc>
     </url>
     ${posts
       .map((post) => {
         const slug = post.replace(/\.mdx/, "");

         return `
       <url>
           <loc>${`${BLOG_URL}/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

export default function SiteMap() {}

export async function getServerSideProps({ res }) {
  const posts = await getFiles("blog");

  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
