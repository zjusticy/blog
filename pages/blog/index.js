import Link from "next/link";
import Layout from "../../components/layout";

// import { faGithub } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Portrait from "../../content/assets/imgs/portrait";

import { getAllPosts } from "../../utils/getLocalData";
import { dateTrans } from "../../utils/smallTools";

export default function Services({ allPosts }) {
  return (
    <Layout title="Blog index page" description="List of the blog index">
      <div className="container">
        <div className="isBlog">
          <h1 className="isBlog-title is-1">Tong's Blog</h1>
          <section className="flex justify-start">
            <figure className="mr-3.5">
              <Portrait
                viewBox="0 0 162 162"
                width="50"
                height="50"
                className="rounded-[50%]"
              />
            </figure>
            <p className="text-[1rem]">Explore and learn</p>
          </section>

          {allPosts.length ? (
            <ul className="list-none">
              {allPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-[2rem] mt-12 mb-2 mx-0 font-bold leading-[1.125]">
                      <a>{post.title}</a>
                    </h2>
                  </Link>
                  <span className={`dateStyle-1`}>{dateTrans(post.date)}</span>
                  <p className="text-[1rem] mt-2 mb-0 mx-0 text-[color: rgba(0, 0, 0, 0.6)]">
                    {post.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(
    ["title", "date", "description", "slug"],
    "posts"
  );

  return {
    props: { allPosts },
  };
}
