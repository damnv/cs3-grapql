// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "cs3-grapql",
      // URL to the GraphQL API
      url: "https://qtpypos3yfbg7owcwdskumhi3m.appsync-api.ap-southeast-1.amazonaws.com/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
