---
title: "A shopping cart project using Nextjs and React Hook for e-commerce"
date: "2020-08-2T21:20:16.173Z"
description: "A simple and elegant shopping cart component that can be easily integrated in e-commerce project, using Nextjs, Hook and Typescript"
---

**[DEMO](https://next-shopping-cart.vercel.app)**

This project is based on [react-shopping-cart](https://github.com/sivadass/react-shopping-cart), which is a web shopping cart using react and sass. However, in this fast-chaning world, this react-shopping cart is outdated. We will refactore this project using Nextjs, react hook and typescript.

You can check the code of this project on [Github](https://github.com/zjusticy/next-shopping-cart).

![](/img/next-react-shopping-cart.gif)

## Next.js

Next.js is a lightweight React server-side rendering application framework. With it, we can simply and easily implement React server-side rendering, thus speeding up the first screen, and also doing SEO. Now Next.js is more powerful that can combine server-side rendering (SSR) and static site generation (SSG) to provide a more fluid experience. You can check more about Next.js [here](https://nextjs.org/docs/getting-started).

Since we only have one single page, the file structure for page folder:

```bash
project
├── index.tsx
└── _app.tsx # add head section
```

We also use SSG to get a better performance. Also, Because static site does not rely on Web Server, deployment is just to put the generated web page on the CDN. Data are fetched by build in function "getStaticProps“.

```js
export const getStaticProps: GetStaticProps = async () => {
  const url =
    "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";
  const res = await axios.get(url);

  const data = await res.data;

  return { props: { products: data } };
};
```

Its time to first byte (TTFB) performance is the best.

## Hook

Hook is a new feature of React 16.8. It allows you to use state and other React features without writing a class. Comparing to higher order component, it can be more elegant and efficient.

Below we have a state `isAdded` to indicate a product has successfully added to the cart.

```js
this.state = {
  isAdded: false,
};
```

Change to the hook:

```js
const [isAdded, setAddState] = useState < boolean > false;
```

Moreover, we can customise our own hooks. Below is some code from the original project to determine the position of the click:

```js
handleClickOutside(event) {
  const cartNode = findDOMNode(this.refs.cartPreview);
  const buttonNode = findDOMNode(this.refs.cartButton);
  if (cartNode.classList.contains("active")) {
    if (!cartNode || !cartNode.contains(event.target)) {
      this.setState({
        showCart: false
      });
      event.stopPropagation();
    }
  }
}
componentDidMount() {
  document.addEventListener(
    "click",
    this.handleClickOutside.bind(this),
    true
  );
}
componentWillUnmount() {
  document.removeEventListener(
    "click",
    this.handleClickOutside.bind(this),
    true
  );
}
```

To make the code more reusable, we implement the same function by hook:

```js
import { useEffect } from "react";

const useClickOutside = (
  closeModel: () => void,
  ref: React.RefObject<HTMLDivElement>,
  // whether to check if the component active or not
  activeCheck: boolean
) => {
  const  handleClickOutside  = (e:  MouseEvent) => {

  if (ref && ref.current && !ref.current.contains(e.target as Element)) {
    if (activeCheck) {
      e.stopPropagation();
    }
    closeModel();
  }
};

  useEffect(() => {
    // add when mounted
    document.addEventListener("click", handleClickOutside, true);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
};

export default useClickOutside;
```

We also put some states: `cart`, `totalItems` and `totalAmount` to the context which enable a more organized global state management. After this, we can use `useContext` hook inside the pages or components to introduce the needed state or function.

```js
const { cart, totalItems, totalAmount, removeProduct, bounce, bouceEnd } =
  useContext < Init > CartContext;
```

## Typescript

[Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) is a strongly typed version of JavaScript. Then the type and unique syntax are removed during the compile time to generate pure JavaScript code. Since it is still JavaScript running in the browser in the end, TypeScript does not depend on the support of the browser, nor does it cause compatibility issues.

TypeScript increases the readability and maintainability of the code.

## Height fixed when the image is not loaded

The width of some pictures is determined, and the height is adaptive. When the picture is not loaded, the height is 0. After the loading is completed, its height is stretched, which will cause the page to flicker and jitter during this process. But there is no way to control the height. If the width and height of the picture are inconsistent, and the width setting is the same, the height will be uneven.

At this time, you can use padding to control the height of the picture, so that the pictures in the list are forced to set the same height. Take the setting on Amazon as an example. The height of the img-box is opened with padding-top/padding-bottom.

```html
<head>
  <style>
    .img-box {
      position: relative;
      padding-top: 100%;
    }

    .img {
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      max-width: 100%;
      max-height: 100%;
    }
  </style>
</head>

<div class="img-box">
  <img class="img" src="./images/melon.png" alt="" />
</div>
```

The result is illustrated by the image below. Although the three images of pan have different heights, they all have the image boxes that have the same height and width. The image itself is centered by setting the margin to auto.

![Settings on Amazon website](/img/amazonPic.png)

## Reference

[react-shopping-cart](https://github.com/sivadass/react-shopping-cart)
