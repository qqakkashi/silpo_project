import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { AuthGuard } from "../components/authentication/auth-guard";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";
import { useState, useEffect } from "react";
import { esp32Api } from "../api/esp32-api";

import { Esp32ListTable } from "../components/esp32/eps32-list-table";

const Home = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    let res;
    if ([6, 7, 8, 9, 10, 11].includes(hour)) res = "Доброе утро";
    else if ([12, 13, 14, 15, 16, 17].includes(hour)) res = "Добрый день";
    else if ([18, 19, 20, 21, 22, 23].includes(hour)) res = "Добрый вечер";
    else res = "Доброй ночи";
    return `${res}`;
  };
  const [esp32Data, setEsp32Data] = useState([]);

  useEffect(() => {
    const unsubEsp32 = esp32Api.subscribeOnEsp32(setEsp32Data);

    return () => {
      unsubEsp32();
    };
  }, []);

  const greeting = getGreeting(); // morning day evening night

  return (
    <>
      <Head>
        <title>Kolo</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{greeting}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}></Grid>
        </Container>
        {esp32Data.length && (
          <Box>
            <Container maxWidth="lg">
              <Esp32ListTable esp32Data={esp32Data} />
            </Container>
          </Box>
        )}
      </Box>
    </>
  );
};

Home.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Home;
