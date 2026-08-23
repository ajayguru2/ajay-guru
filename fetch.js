const {writeFile} = require("node:fs/promises");
require("dotenv").config();

const {GITHUB_USERNAME, REACT_APP_GITHUB_TOKEN, USE_GITHUB_DATA} = process.env;

async function fetchProfile() {
  if (USE_GITHUB_DATA !== "true") return;
  if (!GITHUB_USERNAME || !REACT_APP_GITHUB_TOKEN) {
    throw new Error("GitHub username and token are required to fetch projects.");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REACT_APP_GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-build"
    },
    body: JSON.stringify({
      query: `
{
  user(login:"${GITHUB_USERNAME}") { 
    name
    bio
    isHireable
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
          node {
            ... on Repository {
              name
              description
              forkCount
              stargazers {
                totalCount
              }
              url
              id
              diskUsage
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
}
`
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}.`);
  }

  const profile = await response.json();
  if (profile.errors) throw new Error(profile.errors[0].message);

  await writeFile("./public/profile.json", JSON.stringify(profile));
  console.log(`Fetched projects for ${GITHUB_USERNAME}`);
}

fetchProfile().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
