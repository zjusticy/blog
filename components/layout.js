import { useState } from "react";

import Link from "next/link";
import House from "../content/assets/icons/house";
import NextHead from "./nextHead";

import { useRouter } from "next/router";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const myClasses = (path, pwd) => {
  if (pwd.test(path)) {
    return `items-center flex grow-0 shrink-0 text-[#4a4a4a] relative leading-normal py-0 px-2 my-2 mx-4 border-2 border-solid border-[color:theme(colors.gray)]`;
  } else {
    return `items-center flex grow-0 shrink-0 text-[#4a4a4a] relative leading-normal py-0 px-2 my-2 mx-4 border-2 border-solid border-[color:transparent]`;
  }
};

export default function Layout({ title, description, children }) {
  const router = useRouter();

  const [menuActive, setMenuState] = useState(false);

  return (
    <>
      <NextHead title={title} description={description} />
      <div>
        <nav
          className="min-h-13 bg-transparent relative z-30 shadow-[0_2px_0_0_#f5f5f5]"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="items-strtch flex min-h-7 relative w-full">
              <div className="items-stretch flex shrink-0 min-h-13 ml-[-0.75rem]">
                <Link href="/">
                  <a
                    className="items-center flex grow-0 shrink-0 
                text-[#4a4a4a] py-2 px-3 relative leading-normal"
                  >
                    <House />
                  </a>
                </Link>

                <a
                  role="button"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={() => setMenuState((prev) => !prev)}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>

              <div id="navbarBasicExample" className="grow shrink-0">
                <div className="justify-end ml-auto items-stretch flex">
                  <Link href="/">
                    <a
                      className={myClasses(router.pathname, /^\/$/)}
                      aria-label="Home page"
                    >
                      Home
                    </a>
                  </Link>

                  <Link href="/blog">
                    <a
                      className={myClasses(router.pathname, /^\/blog/)}
                      aria-label="Blog page"
                    >
                      Blog
                    </a>
                  </Link>

                  <Link href="/about">
                    <a
                      className={`${myClasses(
                        router.pathname,
                        /^\/about$/
                      )} mr-0`}
                      aria-label="About the author"
                    >
                      About
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>
        <footer className="pb-6 pt-6 text-[1rem] border-t-1 border-solid border-[theme(colors.light-gray)]">
          <div className={"container"}>
            <div>
              Email me: &nbsp;&nbsp;&nbsp;&nbsp;
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              <a href="mailto:tzhu618@gmail.com">tzhu618@gmail.com</a>
            </div>
            <div className="text-[theme(colors.gray)] pt-[0.8rem]">
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://nextjs.org/">NextJs</a>
              {` and `}
              <a href="https://getbase.org">Base</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
