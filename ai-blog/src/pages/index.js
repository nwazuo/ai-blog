import ArticleCard from '@/components/articleCard';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import slugify from 'slugify';
import Layout from '@/components/layout';



export default function Home(
  {
    articles
  }
) {
  return (
      <Layout>
        <h2 className="text-3xl font-bold mt-12">
          Blog posts
        </h2>
        <div className="flex flex-col space-y-12 mt-16">
          {articles.map((article) => (
            <Link href="/article/[slug]" as={`/article/${article.slug}`} key={article.slug}>
              <ArticleCard
                title={article.title}
                publishedAt={article.publishedAt}
                tags={article.tags}
                featuredImage={article.featuredImageURL}
              />
            </Link>
          ))}
        </div>
      </Layout>
  )
}



const getArticles = () => {
  const files = fs.readdirSync('./content');
  const articles = [];

  for (const file of files) {
    if (!file.endsWith('.md')) {
      continue;
    }

    const filePath = `./content/${file}`;
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    articles.push({
      title: data.title,
      slug: slugify(data.title, {lower: true}),
      featuredImageURL: data.featuredImageURL,
      publishedAt: (new Date(data.publishedAt)).toISOString(),
      tags: data.tags,
      excerpt: content.slice(0, 200) + '...',
    });
  }

  return articles;
};

export async function getStaticProps() {
  const articles = getArticles();

  return {
    props: {
      articles,
    },
  }
}
