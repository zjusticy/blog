import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_data/_posts");

const resumeDirectory = join(process.cwd(), "_data/_resume");

export function getPostSlugs(mode) {
  return mode === "posts"
    ? fs.readdirSync(postsDirectory)
    : fs.readdirSync(resumeDirectory);
}

export function getPostBySlug(slug, fields = [], mode) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(
    mode === "posts" ? postsDirectory : resumeDirectory,
    `${realSlug}.md`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = [], mode) {
  let slugs = getPostSlugs(mode);

  for (let i = 0; i < slugs.length - 1; i++) {
    if (!/\.md$/.test(slugs[i])) {
      slugs.splice(i, 1);
    }
  }

  const posts = slugs.map((slug) => getPostBySlug(slug, fields, mode));
  // sort posts by date in descending order

  const order_posts =
    mode === "posts"
      ? posts.sort((post1, post2) => (post1.date > post2.date ? "-1" : "1"))
      : posts.sort((post1, post2) => (post1.id === "1" ? "-1" : "1"));

  return order_posts;
}
