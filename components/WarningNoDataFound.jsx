import React, { useState } from "react";
import Lottie from "react-lottie";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import AnimationNotFoundData from "../public/lotties/not_found_data.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: AnimationNotFoundData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function WarningNoDataFound() {
  const [isStopped] = useState(false);
  const [isPaused] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 3,
        mb: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: 300,
          height: 300,

          ["@media (max-width:900px)"]: {
            width: 220,
            height: 220,
          },

          ["@media (max-width:450px)"]: {
            width: 160,
            height: 160,
          },
        }}
      >
        <Lottie
          options={defaultOptions}
          height={"100%"}
          width={"100%"}
          isStopped={isStopped}
          isPaused={isPaused}
          isClickToPauseDisabled={true}
        />

        <Typography
          variant="span"
          component="span"
          sx={{
            fontWeight: 900,
            fontSize: { sm: 12, md: 14, lg: 16 },
            mt: 2,
            color: "#842E6B",
          }}
        >
          Sem dados encontrados
        </Typography>
      </Box>
    </Box>
  );
}
