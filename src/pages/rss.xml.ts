import rss from '@astrojs/rss';
import { getCollection } from "astro:content";

export async function GET(context) {
  const [projects, blog] = await Promise.all([getCollection("project", ({data}) => {
    return import.meta.env.PROD ? data.isDraft !== true : true;
  }), getCollection("blog", ({data}) => {
    return import.meta.env.PROD ? data.isDraft !== true : true;
  })]);

  return rss({
    title: 'MarvinL.com | RSS Feed',
    description: 'Découvre l\'actualité de MarvinL.com',
    site: context.site,
    items:[...projects.map((post) => ({
          title: post.data.title,
          pubDate: post.data.createdAt,
          description: post.data.description,
          // Compute RSS link from post `slug`
          link: `/projets/${post.slug}/`,
        })), ...blog.map((post) => ({
              title: post.data.title,
              pubDate: post.data.createdAt,
              description: post.data.description,
              // Compute RSS link from post `slug`
              // This example assumes all posts are rendered as `/blog/[slug]` routes
              link: `/blog/${post.slug}/`,
            })),],
    customData: `<language>fr-fr</language>`,
  });
}
