// import * as React from "react";
import Link from "next/link";

import Layout from "../../components/layout";

import { getAllPosts, getPostBySlug } from "../../utils/getLocalData";

import markdownToHtml from "../../utils/markdownToHtml";
import { dateTrans } from "../../utils/smallTools";

// export default function BlogTemplate({ frontmatter, markdownBody, siteTitle }) {
function BlogTemplate({ title, description, date, content }) {
  return (
    <Layout title={title} description={description}>
      <div className="container">
        <div className="isBlog">
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <Link href="/blog">
                  <a>Blog</a>
                </Link>
              </li>
              <li>
                <span></span>
              </li>
            </ul>
          </nav>

          <article>
            <h1 className="isBlog-title text-[2.5rem]">{title}</h1>
            <span className="dateStyle-2">{dateTrans(date)}</span>
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </article>

          <Link href="/blog">
            <div className="mt-8">
              <a>← Blog</a>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // const files = fs.readdirSync("posts");

  const posts = getAllPosts(["slug"], "posts");

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // const { slug } = context.query;

  const post = getPostBySlug(
    params.slug,
    ["title", "date", "description", "slug", "content"],
    "posts"
  );
  // const content = marked(post.content || "");
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      ...post,
      content,
    },
  };
}

export default BlogTemplate;
