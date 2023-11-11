import Header from '@/components/header';
import fs from 'fs';
import matter from 'gray-matter';
import slugify from 'slugify';
import Layout from '@/components/layout';
import ReactMarkdown from 'react-markdown';

import styled from 'styled-components'



// single article component to display the article. exported as default
const Article = ({article}) => {
  const { title, publishedAt, tags, featuredImageURL } = article

  return (
     <Layout>
       <div className="rounded-lg shadow-md pt-12">
          <div className="pb-8">
            <h1 className="text-5xl font-semibold mb-2">{title}</h1>
            <p className="text-gray-500 mb-2">{publishedAt}</p>
            <div className="flex flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-600 rounded-full py-1 px-2 text-sm mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className='w-full text-center overflow-hidden'>
            <img src={featuredImageURL} alt={title} className="block mx-auto w-full" />
          </div>
          <div className='mt-12'>
            <MarkdownRenderer content={article.content} />
          </div>
        </div>
     </Layout>
  );
};

export default Article;

const MarkdownStyler = styled.div`
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  p {
    font-size: 1.25rem;
    line-height: 1.75rem;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  li {
    font-size: 1.25rem;
    line-height: 1.75rem;
    margin-bottom: 1.5rem;
  }
`

const MarkdownRenderer = ({ content }) => {
  return (
    <MarkdownStyler>
      <ReactMarkdown>{content}</ReactMarkdown>
    </MarkdownStyler>
  );
};


// getStaticPaths to generate static paths from markdown files
export async function getStaticPaths() {
  const files = fs.readdirSync('./content');
  const paths = [];

  for (const file of files) {
    if (!file.endsWith('.md')) {
      continue;
    }

    const filePath = `./content/${file}`;
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    paths.push({
      params: {
        slug: slugify(data.title, { lower: true }),
      },
    });
  }

  console.log(JSON.stringify(paths, null, 2));

  return {
    paths,
    fallback: false,
  };
}

// getStaticProps to fetch data from markdown file for corresponding slug
export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = `./content/${slug}.md`;
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  console.log('data tags', data.tags)

  return {
    props: {
      article: {
        title: data.title,
        slug: slug,
        featuredImageURL: data.featuredImageURL,
        publishedAt: (new Date(data.publishedAt)).toISOString(),
        tags: data.tags,
        content: content,
      },
    },
  };
}