import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Divider, Stack, Typography } from "@mui/material";
type Props = {
  repo: {
    owner: {
      avatar_url: string;
    };
    stargazers_count: number;
    name: string;
    description: string | null;
  };
  prs: any;
};
export default function RepoCover({ repo, prs }: Props) {
  return (
    <>
      <Stack alignItems="center" gap={1}>
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
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <img
              className="rounded-sm"
              src={repo.owner.avatar_url}
              height={46}
              width={46}
            />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Icon icon="ri:star-line" width={16} height={16} />
              <Typography variant="body2">{repo.stargazers_count}</Typography>
            </Stack>
          </Stack>

          <Typography variant="h5" fontWeight={700}>
            {repo.name}
          </Typography>
          <Typography variant="body2">{repo.description}</Typography>
          <Divider
            sx={{ borderColor: "divider", borderStyle: "dashed", my: 1 }}
          />
          <Stack gap={2} alignItems="left">
            {prs.map((pr: any, index: number) => {
              return (
                <Stack
                  width="100%"
                  direction="row"
                  justifyContent="left"
                  gap={2}
                  key={pr.title}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className={`h-full text-xs capitalize px-2 py-1 rounded-full font-bold ${
                      pr.state === "open" ? "bg-[#df4242]" : "bg-[#9a49dd]"
                    }`}
                  >
                    <Icon
                      icon={
                        pr.state === "open"
                          ? "tabler:git-pull-request"
                          : "tabler:git-merge"
                      }
                    />
                    {pr.state === "open" ? "Open" : "Merged"}
                  </Stack>
                  <a
                    href={pr.html_url}
                    className="hover:text-[#1c77ff] hover:underline"
                  >
                    <Typography variant="subtitle2" fontWeight={700} flex={1}>
                      {pr.title}
                    </Typography>
                  </a>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
