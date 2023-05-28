import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      html: {
        height: "100%",
        width: "100%",
      },
      "*, *::before, *::after": {
        textDecoration: "none",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      body: {
        height: "100%",
        width: "100%",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();
  return null;
};

export default GlobalStyles;
