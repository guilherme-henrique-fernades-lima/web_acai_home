import { createTheme } from "@mui/material/styles";

export const dark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    colors: {
      brand: "#B83E94",
      brand_hover: "#f8e8ff",
      primary: "#424242",
      secondary: "",
      inactive_text: "#ccc",
      text_title: "#141414",
    },
  },
});
