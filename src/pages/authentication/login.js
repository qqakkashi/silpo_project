import Head from "next/head";
import Image from "next/image";

import { Box, Card, Container, Typography, CardMedia } from "@mui/material";
import { FirebaseLogin } from "../../components/authentication/firebase-login";
import { GuestGuard } from "../../components/authentication/guest-guard";

const Login = () => {
  return (
    <>
      <Head>
        <title>Авторизация | Kolo</title>
      </Head>

      <Box
        component="main"
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Image src="/logo.png" alt="Logo" width="180" height="90" />

              <Typography color="textSecondary" sx={{ mt: 2 }}>
                Войди в Kolo
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 3 }}>
              <FirebaseLogin />
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;
export default Login;
