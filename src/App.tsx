import { getContributions, getRepository } from "./services/github";
import { Container, Stack, Typography } from "@mui/material";
import { useQueries } from "@tanstack/react-query";
import RepoCover from "./components/RepoCover";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
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
        <Stack
          sx={{
            height: "70vh",
            justifyContent: "center",
          }}
          gap={1}
        >
          <Typography variant="h2" fontWeight={900}>
            FirstName LastName
          </Typography>
          <Typography variant="body2">
            Web developer that loves to build amazing experiences.
          </Typography>
          <Stack direction="row" gap={1}>
            <Icon
              icon="mdi:github"
              width={24}
              height={24}
              className="transition-colors hover:text-white text-neutral-400 cursor-pointer"
            />
            <Icon
              icon="mdi:linkedin"
              width={24}
              height={24}
              className="transition-colors hover:text-white text-neutral-400 cursor-pointer"
            />
            <Icon
              icon="mdi:instagram"
              width={24}
              height={24}
              className="transition-colors hover:text-white text-neutral-400 cursor-pointer"
            />
          </Stack>
        </Stack>
        <Typography variant="h6" fontWeight={700}>
          Open source contributions
        </Typography>
        <Typography variant="body2" mb={2}>
          Contributing to open source has been one of the most rewarding
          experiences I have had as a developer.
        </Typography>
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
            </Stack>
          )}
        </Stack>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Private contributions
        </Typography>
        <Stack gap={2}>
          <Stack
            sx={{
              px: 2,
              py: 2,
              transition: "all .4s",
              border: "1px solid #3D3D3D",
              borderRadius: 1,
              gap: 1,
            }}
          >
            <Stack
              className="text-orange-500 bg-slate-50 text-center rounded-sm justify-center items-center"
              height={46}
              width={46}
            >
              AZ
            </Stack>
            <Typography variant="h5" fontWeight={700}>
              Autozone: BTSSC
            </Typography>
            <Typography variant="body2">
              A script was developed that read information from an excel file
              and returned an updated file. The ipdates where made according to
              rules that had to be applied to each row of the document. This
              script managet to have 99% of succesfull results.
            </Typography>
            <Stack direction="row" gap={1}>
              <Typography
                className="flex justify-center items-center rounded-full px-3 py-[2px] border border-yellow-500 bg-yellow-500/25"
                variant="body2"
              >
                Js
              </Typography>
              <Typography
                className="flex justify-center items-center rounded-full px-3 py-[2px] border border-purple-500 bg-purple-500/25"
                variant="body2"
              >
                C#
              </Typography>
              <Typography
                className="flex justify-center items-center rounded-full px-3 py-[2px] border border-purple-500 bg-purple-500/25"
                variant="body2"
              >
                ASP.NET
              </Typography>
              <Typography
                className="flex justify-center items-center rounded-full px-3 py-[2px] border border-blue-500 bg-blue-500/25"
                variant="body2"
              >
                MySql
              </Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{
              px: 2,
              py: 2,
              transition: "all .4s",
              border: "1px solid #3D3D3D",
              borderRadius: 1,
              gap: 1,
            }}
          >
            <Stack
              className="text-blue-900 bg-slate-50 text-center rounded-sm justify-center items-center"
              height={46}
              width={46}
            >
              HCA
            </Stack>
            <Typography variant="h5" fontWeight={700}>
              HCA Healthcare
            </Typography>
            <Typography variant="body2">
              A work suite that provides: Patient management, Messaging, User
              Management, etc. is being developed.
            </Typography>
            <Stack direction="row" gap={1}>
              <Typography
                className="flex justify-center items-center rounded-full px-3 py-[2px] border border-blue-500 bg-blue-500/25"
                variant="body2"
              >
                React
              </Typography>
              <Typography
                className="flex justify-center items-center rounded-full px-3 py-[2px] border border-blue-500 bg-blue-500/25"
                variant="body2"
              >
                Ts
              </Typography>
              <Typography
                className="flex justify-center items-center rounded-full px-3 py-[2px] border border-neutral-700 bg-neutral-900"
                variant="body2"
              >
                NextJs
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default App;
