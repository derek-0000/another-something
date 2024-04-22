import { getContributions, getRepository } from "./services/github";
import { Container, Stack } from "@mui/material";
import { useQueries } from "@tanstack/react-query";
import RepoCover from "./components/RepoCover";
function App() {
  const { data, pending, error } = useQueries({
    queries: [
      {
        queryKey: ["pr"],
        queryFn: getContributions,
      },
      {
        queryKey: ["repo"],
        queryFn: getRepository,
      },
    ],
    combine: (results) => ({
      data: {
        contributions: results[0].data,
        repo: results[1].data,
      },
      pending: results.some((result) => result.isPending),
      error: results.some((result) => result.isError),
    }),
  });

  if (pending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <Container
        sx={{
          pt: 4,
        }}
      >
        <Stack gap={2}>
          {data?.repo && (
            <Stack direction="row" gap={4}>
              <RepoCover
                repo={{
                  owner: {
                    avatar_url: data.repo.owner.avatar_url,
                  },
                  stargazers_count: data.repo.stargazers_count,
                  name: data.repo.name,
                  description: data.repo.description,
                }}
                prs={data.contributions}
              />
              <RepoCover
                repo={{
                  owner: {
                    avatar_url: data.repo.owner.avatar_url,
                  },
                  stargazers_count: data.repo.stargazers_count,
                  name: data.repo.name,
                  description: data.repo.description,
                }}
                prs={data.contributions}
              />
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default App;
