import React from "react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function BodyText(props) {
  const theme = useTheme();

  const { children } = props;

  return (
    <Typography
      variant="body1"
      sx={{
        fontFamily: "Lato, sans-serif",
        fontWeight: 400,
        color: theme.palette.mode == "light" ? "#424242" : "#fff",
        fontSize: {
          lg: 14,
          md: 14,
          sm: 14,
          xs: 12,
        },
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
