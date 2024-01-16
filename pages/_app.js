import "../style/global.css";
import "../prism.css";

import React from "react";

// import Head from "next/head";
import "katex/dist/katex.min.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     gtag.pageview(url)
  //   }
  //   Router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     Router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, []);

  return <Component {...pageProps} />;
}
