import React from "react";
import Layout from "../../components/layout";

import markdownToHtml from "../../utils/markdownToHtml";

// import ReactMarkdown from "react-markdown";
// import CodeBlock from "../components/codeBlock";
import { getAllPosts } from "../../utils/getLocalData";

// import { rhythm } from "../utils/typography"

const About = ({ allPosts }) => {
  return (
    <Layout
      title="About the author"
      description="Personal information about the author"
    >
      <div className="container py-16">
        <div className="md:flex m-0 justify-between lg:ml-[-0.75rem]">
          <section className="md:flex-[0_0_50%] md:max-w-[50%] md:px-[theme(spacing.grid-gutter)] pr-4">
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: allPosts[0].content }} />
            </div>
          </section>

          <section className="md:flex-[0_0_50%] md:max-w-[50%] md:px-[theme(spacing.grid-gutter)] pr-4">
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: allPosts[1].content }} />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;

export async function getStaticProps() {
  // const { slug } = context.query;

  const allPosts = getAllPosts(["id", "content"], "resume");
  for (const post of allPosts) {
    post.content = await markdownToHtml(post.content);
  }

  return {
    props: { allPosts },
  };
}
