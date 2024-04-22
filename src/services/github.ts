import { Octokit, RequestError } from "octokit";
const token = import.meta.env.VITE_GITHUB_API_FINE_GRAINED_TOKEN;
const github = new Octokit({ auth: token });

const getContributions = async () => {
  try {
    const pullRequest = await github.request("GET /search/issues", {
      q: "type:pr author:derek-0000 repo:mui/mui-x",
    });
    return pullRequest.data.items;
  } catch (err) {
    if (err instanceof RequestError) {
      throw new Error(err.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

const getRepository = async () => {
  try {
    const repository = await github.rest.repos.get({
      owner: "mui",
      repo: "mui-x",
    });
    return repository.data;
  } catch (err) {
    if (err instanceof RequestError) {
      throw new Error(err.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

export { getContributions, getRepository };
