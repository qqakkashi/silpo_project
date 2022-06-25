import { useState, useEffect } from "react";

import { esp32Api } from "../../api/esp32-api";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { Box } from "@mui/system";
import { Container } from "@mui/material";

import { Esp32ListTable } from "../../components/esp32/eps32-list-table";

const Esp32List = () => {
  const [esp32Data, setEsp32Data] = useState([]);

  useEffect(() => {
    const unsubEsp32 = esp32Api.subscribeOnEsp32(setEsp32Data);

    return () => {
      unsubEsp32();
    };
  }, []);
  return (
    esp32Data.length && (
      <Box>
        <Container maxWidth="lg">
          <Esp32ListTable esp32Data={esp32Data} />
        </Container>
      </Box>
    )
  );
};

Esp32List.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Esp32List;
