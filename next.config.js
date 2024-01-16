//next.config.js
module.exports = {
  webpack: function (config) {
    // config.module.rules.push({
    //   test: /\.md$/,
    //   use: 'raw-loader',
    // });
    // config.node = {
    //   fs: "empty",
    // };
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };
    return config;
  },
};
