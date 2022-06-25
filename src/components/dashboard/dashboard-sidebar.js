import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import PropTypes from "prop-types";

import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { Home as HomeIcon } from "../../icons/home";

import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { Logo } from "../logo";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";

const getSections = () => [
  {
    title: "General",
    items: [
      {
        title: "Обзор",
        path: "/",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: "Аналитика",
        path: "/esp32",
        icon: <ChartBarIcon fontSize="small" />,
      },

      {
        title: "Аккаунт",
        path: "/account",
        icon: <UserCircleIcon fontSize="small" />,
      },
    ],
  },
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(), []);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  width={180}
                  height={90}
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {sections.map((section) => (
            <DashboardSidebarSection
              key={section.title}
              path={router.asPath}
              sx={{
                mt: 2,
                "& + &": {
                  mt: 2,
                },
              }}
              {...section}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
