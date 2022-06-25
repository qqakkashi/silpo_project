import { Typography, Grid, Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";

export const Esp32ListTable = ({ esp32Data }) => {
  console.log(esp32Data);
  const [boardId, setBoardId] = useState(esp32Data[0]?.id);
  const [boardData, setBoardData] = useState(esp32Data[0]);
  const [sensorId, setSensorId] = useState("1");

  // need for get time for status device
  // boardId && console.log(JSON.stringify(esp32Data[deviceId].Data.epochTime));
  // console.log(esp32Data[0]?.id);
  return (
    <>
      <Box sx={{ display: "flex", height: 100 }}></Box>
      <Grid
        container
        spacing={2}
        sx={{
          color: "neutral.300",
        }}
      >
        <Grid container item direction="column" xs={3}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            Пристрої
          </Typography>
          <Grid
            item
            sx={{
              maxHeight: 512,
              overflow: "auto",

              "&::-webkit-scrollbar": {
                width: "10px",
              },

              "&::-webkit-scrollbar-track": {
                background: "#E4EFEF",
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#1D388F61",
                borderRadius: "5px",
              },
            }}
          >
            {esp32Data &&
              esp32Data.map((data, key) => {
                return (
                  <>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // ml: 1,
                        // mr: 1,
                        pl: 2,
                        // mb: 1,
                        cursor: "pointer",
                        justifyContent: "space-between",
                        ":hover": {
                          background: "#364976",
                        },
                        background: data.id === boardId ? "#364976" : "primary",
                      }}
                      onClick={() => {
                        setBoardId(data.id);
                        setBoardData(data);
                      }}
                      key={data.id}
                    >
                      {data.id}
                      <IconButton
                        disabled
                        sx={{ margin: 2, backgroundColor: "primary" }}
                        onClick={() => {
                          setBoardId(data.id);
                          setBoardData(data);
                        }}
                      >
                        <ArrowForwardIosIcon color="#E47B0D" />
                      </IconButton>
                    </Typography>
                    <Divider />
                  </>
                );
              })}
          </Grid>
        </Grid>

        <Grid container item direction="column" xs={4}>
          <Typography sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            Датчики
          </Typography>
          <Grid
            item
            sx={{
              maxHeight: 512,
              overflow: "auto",

              "&::-webkit-scrollbar": {
                width: "10px",
              },

              "&::-webkit-scrollbar-track": {
                background: "#E4EFEF",
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#1D388F61",
                borderRadius: "5px",
              },
            }}
          >
            {boardData &&
              boardId &&
              Object.keys(boardData?.Sensors).map((sensor) => {
                return (
                  <>
                    <Typography
                      item
                      sx={{
                        display: "flex",
                        cursor: "pointer",

                        alignItems: "center",

                        pl: 2,
                        // ml: 1,
                        // mr: 1,
                        // mb: 1,

                        justifyContent: "space-between",
                        ":hover": {
                          background: "#364976",
                        },
                        background: sensor === sensorId ? "#364976" : "primary",
                      }}
                      key={sensor}
                      onClick={() => {
                        setSensorId(sensor);
                      }}
                    >
                      Датчик {sensor}
                      <IconButton
                        disabled
                        sx={{
                          margin: 2,
                          backgroundColor: "primary",
                        }}
                        onClick={() => {
                          setSensorId(sensor);
                        }}
                      >
                        <ArrowForwardIosIcon color="rgb(228,123,13)" />
                      </IconButton>
                    </Typography>
                    <Divider />
                  </>
                );
              })}
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={5}>
          {sensorId &&
            Object.entries(Object.values(boardData.Sensors).sort())
              [sensorId - 1].slice(1)
              .map((sensorData) => {
                return (
                  <>
                    <Typography
                      sx={{ display: "flex", justifyContent: "center", mb: 3 }}
                    >
                      Інформація про пристрій {boardId}, датчик {sensorId}
                    </Typography>

                    <Grid item>
                      <Image
                        src="/папочка.jpg"
                        alt="Logo"
                        width="620"
                        height="336"
                        layout="responsive"
                        priority
                      />
                      <Typography
                        item
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: 1,
                          // mr: 1,
                          // mb: 1,

                          pl: 2,
                          py: 3,

                          justifyContent: "space-between",
                        }}
                      >
                        Current: {sensorData.Current}
                      </Typography>
                      <Divider />

                      <Typography
                        item
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: 1,
                          // mr: 1,
                          // mb: 1,
                          pl: 2,
                          py: 3,

                          justifyContent: "space-between",
                        }}
                      >
                        usedPowerByMonth: {sensorData.usedPowerByMonth}
                      </Typography>
                      <Divider />

                      <Typography
                        item
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: 1,
                          // mr: 1,
                          // mb: 1,
                          pl: 2,
                          py: 3,

                          justifyContent: "space-between",
                        }}
                      >
                        usedPowerDay: {sensorData.usedPowerDay}
                      </Typography>
                      <Divider />
                    </Grid>
                  </>
                );
              })}
        </Grid>
      </Grid>
    </>
  );
};
