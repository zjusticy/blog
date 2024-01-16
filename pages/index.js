import Link from "next/link";

import Layout from "../components/layout";
import Portrait from "../content/assets/imgs/portrait";
import Linkedin from "../content/assets/icons/linkedin";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DEFAULT_SEO } from "../config";

export default function Home() {
  return (
    <Layout title={DEFAULT_SEO.title} description={DEFAULT_SEO.description}>
      <div className="items-stretch flex flex-col justify-between bg-[#8ba3af]">
        <div className="py-32 px-0">
          <div className={`container`}>
            <h1 className="text-[3rem] mb-6 text-[color:white] font-bold leading-none">
              Tong's Site
            </h1>
            <h2 className="text-[color:white] mb-6 text-[2rem] pb-8 font-normal">
              Try to be a web developer
            </h2>
            <div className="w-12 h-[1px] mb-4 bg-[#ffffff]"></div>
            <h3 className="text-[color:white] text-[1.5rem] pb-4 font-normal">
              A whole new world 💪
            </h3>
            <div className="flex justify-end leading-4">
              <div className="p-4 last:mr-4">
                <a
                  href="https://github.com/zjusticy"
                  className="text-[color:white]"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
              </div>

              <div className="p-4 last:mr-2">
                <a href="#" className="text-[color:white]">
                  <Linkedin width="42" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="justify-between m-0 md:flex">
          <div className="md:flex-[0_0_33.3333333333%] md:max-w-[33.3333333333%] py-3 md:py-0 md:px-[theme(spacing.grid-gutter)]">
            <Portrait className="my-0 mx-auto block" />
          </div>

          <div className="md:flex-[0_0_50%] md:max-w-[50%] xl:ml-24 py-3 md:py-0 md:px-[theme(spacing.grid-gutter)]">
            <div className="content">
              <h1>About him</h1>
              <p>
                Tong is a web developer with passion and energy. Ocasionlly, He
                uses blogs to record his ideas and his thoughts.
              </p>
              <p className="pb-6">
                His mind is full of thoughts. And to be a web developer is a
                great to fulfill his ideas. Simple, elegent and functional
                design is the goal he wants to achieve. React is now the best
                choice for him to build web applications.{" "}
              </p>
              <button
                className="border-[1px] border-solid border-[#dbdbdb] 
              text-center rounded cursor-pointer"
              >
                <Link href="/about">
                  <a
                    className="text-[color:#272727] py-3 px-2 block leading-normal"
                    aria-label="Learn more about the author"
                  >
                    learn more
                  </a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
