import { createTheme } from "@mui/material";

export const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#842E6B",
    },
    secondary: {
      main: "#f50057",
    },
    colors: {
      brand: "#B83E94",
      brand_hover: "#f8e8ff",
      primary: "#424242",
      secondary: "",
      inactive_text: "#B7B7B7",
      text_title: "#141414",
    },
  },
});
