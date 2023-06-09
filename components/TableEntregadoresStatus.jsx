import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function TableEntregadoresStatus() {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
      elevation={0}
    >
      <Box
        sx={{
          border: "1px solid #ccc",
          padding: "5px 10px",
          borderRadius: "28px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            color: "#000000",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          ENTREGADORES ONLINE: <span>17</span>
        </Typography>
      </Box>
    </Paper>
  );
}
