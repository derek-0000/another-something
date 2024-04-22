import { useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Button } from "@mui/base";
import { Divider, Stack, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
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
  const [prsVisible, setPrsVIsible] = useState(false);
  const handleClick = () => {
    setPrsVIsible(!prsVisible);
  };
  return (
    <>
      <Stack alignItems="center" gap={1}>
        <motion.header>
          <Stack
            gap={1}
            sx={{
              px: 2,
              py: 2,
              transition: "all .4s",
              border: "1px solid #3D3D3D",
              borderRadius: 1,
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
                height={32}
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <Icon icon="ri:star-line" width={16} height={16} />
                <div className="text-sm">{repo.stargazers_count}</div>
              </Stack>
            </Stack>

            <Typography variant="h5" fontWeight={700}>
              {repo.name}
            </Typography>
            <Typography variant="body2">{repo.description}</Typography>
          </Stack>
          <Stack alignItems="center">
            <AnimatePresence initial={false}>
              {prsVisible && (
                <motion.section
                  style={{ overflow: "visible" }}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: {
                      clipPath: "inset(0% 0% 0% 0% round 0)",
                      height: "auto",
                    },
                    collapsed: {
                      clipPath: "inset(0 0 100% 0 round 0)",
                      height: 0,
                    },
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Stack gap={2}>
                    {prs.map((pr: any, index: number) => {
                      return (
                        <Stack key={pr.id} alignItems="center" gap={2}>
                          <Stack
                            direction="row"
                            justifyContent="left"
                            alignItems="center"
                            gap={2}
                          >
                            <Typography variant="h6" fontWeight={700} flex={1}>
                              {pr.title}
                            </Typography>
                            <Stack
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              className={` text-xs capitalize px-2 py-[2px] rounded-full font-bold ${
                                pr.state === "open"
                                  ? "bg-[#df4242]"
                                  : "bg-[#9a49dd]"
                              }`}
                            >
                              <Icon
                                icon={
                                  pr.state === "open"
                                    ? "tabler:git-pull-request"
                                    : "tabler:git-merge"
                                }
                              />
                              {pr.state}
                            </Stack>
                          </Stack>
                          {index !== prs.length - 1 && (
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: 36,
                                borderColor: "#3D3D3D",
                                textAlign: "center",
                              }}
                            />
                          )}
                        </Stack>
                      );
                    })}
                  </Stack>
                </motion.section>
              )}
            </AnimatePresence>
            <Button
              onClick={handleClick}
              className="mt-2 flex items-center justify-center h-8 w-8 rounded-full hover:bg-[#2D2D2D] transition-all duration-200"
            >
              <Icon
                width={24}
                height={24}
                icon="system-uicons:chevron-down-double"
              ></Icon>
            </Button>
          </Stack>
        </motion.header>
      </Stack>
    </>
  );
}
