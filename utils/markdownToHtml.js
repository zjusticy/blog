import prism from "@mapbox/rehype-prism";
import math from "remark-math";
import remark2rehype from "remark-rehype";
import katex from "rehype-katex";
import remarkParse from "remark-parse";
import stringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import { unified } from "unified";

export default async function markdownToHtml(textContent) {
  const postHtml = await unified()
    .use(remarkParse) // parse markdown
    .use(remarkGfm)
    .use(math)
    .use(remark2rehype) // convert to syntax tree
    .use(katex) // my custom html modifications
    .use(prism)
    // .use(html, { allowDangerousHtml: true }) // convert to html
    // .use(rehype2react, {createElement: React.createElement})
    .use(stringify)
    // .use(htmlKatex)
    // .use(html)
    // .processSync(textContent); // provide article content as input
    .process(textContent); // provide article content as input

  // return postHtml.result;
  return postHtml.toString();
}
