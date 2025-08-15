module.exports = {
  client: {
    service: {
      name: "tech-story-backend",
      url: "http://localhost:3001/graphql",
    },
    includes: [
      "src/**/*.tsx",
      "src/**/*.ts",
      "src/**/*.graphql",
      "src/**/*.gql",
    ],
    excludes: ["**/node_modules", "**/__tests__"],
  },
};
