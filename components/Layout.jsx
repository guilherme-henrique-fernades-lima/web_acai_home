import React, { useState, useContext } from "react";
import Link from "next/link";

//Mui components
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import Container from "@mui/material/Container";

import FormGroup from "@mui/material/FormGroup";

//Ícones
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DvrIcon from "@mui/icons-material/Dvr";
import SettingsIcon from "@mui/icons-material/Settings";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MenuIcon from "@mui/icons-material/Menu";

//Contexto
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext";

//Custom componentes
import BodyText from "./BodyText";
import TitleText from "./TitleText";

export default function Layout(props) {
  const theme = useTheme();

  const { children } = props;

  const { changeThemePalette } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(true);

  const [openRelatorios, setOpenRelatorios] = useState(false);
  const [openCadastros, setOpenCadastros] = useState(false);
  const [openPainel, setOpenPainel] = useState(false);

  const handleOpenMenus = (state, setState) => {
    setState(!state);
    setOpen(true);
  };

  const handleCloseAllMenus = () => {
    setOpenRelatorios(false);
    setOpenCadastros(false);
    setOpenPainel(false);
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {open ? (
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                size="small"
                sx={{
                  backgroundColor: "#fff",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  marginLeft: open ? "-40px" : "-20px",
                  "&:hover": {
                    backgroundColor: theme.palette.colors.brand_hover,
                  },
                }}
              >
                <ChevronLeftIcon sx={{ color: theme.palette.colors.brand }} />
              </IconButton>
            ) : (
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                size="small"
                sx={{
                  marginLeft: "-10px",
                  "&:hover": {
                    opacity: 0.7,
                  },
                }}
              >
                <MenuIcon sx={{ color: "#fff", fontSize: 28 }} />
              </IconButton>
            )}

            <Typography variant="h6" noWrap component="div" sx={{ ml: 3 }}>
              AÇAI HOME
            </Typography>
          </Box>

          <FormGroup>
            <MaterialUISwitch onChange={changeThemePalette} />
          </FormGroup>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Box
          sx={{
            width: "100%",
            padding: 5,
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            display: open ? "flex" : "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: theme.palette.colors.brand,
                mr: 1,
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 900,
                  color: theme.palette.colors.brand,
                  fontSize: 14,
                }}
              >
                USUÁRIO
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 400,
                  color: theme.palette.colors.primary,
                  fontSize: 12,
                }}
              >
                MTF0001
              </Typography>
            </Box>
          </Box>
        </Box>

        {!open && <Toolbar />}

        <Box
          sx={{
            display: open ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 120,
          }}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.main,
            }}
          />
        </Box>

        {!open && <Divider sx={{ margin: "0px 10px 20px 10px" }} />}

        <Box
          sx={{
            borderBottom: "1px solid #ECECEC",
            ml: "30px",
            mr: "30px",
            display: open ? "" : "none",
            mt: 2,
            mb: 2,
          }}
        />

        <List
          sx={{
            height: "100%",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <CustomListItemButton
              onClick={() => {
                handleOpenMenus(openPainel, setOpenPainel);
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
              }}
              active="true"
              open={open}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DvrIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography active="true">Painel</CustomTypography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </CustomListItemButton>

            <CustomListItemButton
              onClick={() => {
                handleOpenMenus(openPainel, setOpenPainel);
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
              }}
              active="false"
              open={open}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DvrIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography active="false">Starred</CustomTypography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </CustomListItemButton>

            <CustomListItemButton
              onClick={() => {
                handleOpenMenus(openPainel, setOpenPainel);
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
              }}
              active="false"
              open={open}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DvrIcon sx={{ fontSize: 22, color: "#B7B7B7" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography active="false">Starred</CustomTypography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </CustomListItemButton>

            <CustomListItemButton
              onClick={() => {
                handleOpenMenus(openPainel, setOpenPainel);
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
              }}
              active="false"
              open={open}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DvrIcon sx={{ fontSize: 22, color: "#B7B7B7" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography active="false">Starred</CustomTypography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </CustomListItemButton>

            <Box
              sx={{
                borderBottom: "1px solid #ECECEC",
                ml: "30px",
                mr: "30px",
                display: open ? "" : "none",
                mt: 2,
                mb: 2,
              }}
            />

            <CustomListItemButton
              onClick={() => {
                handleOpenMenus(openPainel, setOpenPainel);
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
              }}
              active="false"
              open={open}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DvrIcon sx={{ fontSize: 22, color: "#B7B7B7" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography active="false">Starred</CustomTypography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </CustomListItemButton>

            <CustomListItemButton
              onClick={() => {
                handleOpenMenus(openPainel, setOpenPainel);
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
              }}
              active="false"
              open={open}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DvrIcon sx={{ fontSize: 22, color: "#B7B7B7" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography active="false">Starred</CustomTypography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </CustomListItemButton>

            <CustomListItemButton
              onClick={() => {
                handleOpenMenus(openPainel, setOpenPainel);
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
              }}
              active="false"
              open={open}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DvrIcon sx={{ fontSize: 22, color: "#B7B7B7" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography active="false">Starred</CustomTypography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </CustomListItemButton>

            <CustomListItemButton
              onClick={() => {
                handleOpenMenus(openPainel, setOpenPainel);
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
              }}
              active="false"
              open={open}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DvrIcon sx={{ fontSize: 22, color: "#B7B7B7" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography active="false">Starred</CustomTypography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </CustomListItemButton>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: "1px solid #ECECEC",
                ml: "30px",
                mr: "30px",
                display: open ? "" : "none",
                mt: 2,
                mb: 2,
              }}
            />

            <CustomListItemButton
              onClick={() => {
                handleOpenMenus(openPainel, setOpenPainel);
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
              }}
              active="false"
              open={open}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SettingsIcon sx={{ fontSize: 22, color: "#B7B7B7" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography active="false">
                    Configurações
                  </CustomTypography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </CustomListItemButton>

            <CustomListItemButton
              onClick={() => {
                handleOpenMenus(openPainel, setOpenPainel);
              }}
              sx={{
                justifyContent: open ? "initial" : "center",
              }}
              active="false"
              open={open}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PowerSettingsNewIcon sx={{ fontSize: 22, color: "#B7B7B7" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <CustomTypography active="false" onClick={logout}>
                    Sair
                  </CustomTypography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </CustomListItemButton>
          </Box>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#F8F8F8" }}
      >
        <DrawerHeader />
        {/* <Container>{children}</Container> */}
        {children}
      </Box>
    </Box>
  );
}

const DRAWER_WIDTH = 280;

const CustomListItemButton = styled(ListItemButton)(
  ({ theme, active, open }) => ({
    borderRadius: "200px",
    marginLeft: open ? 30 : 10,
    marginRight: open ? 30 : 10,
    backgroundColor: active == "true" ? "#f8e8ff" : "transparent",
    border: "none",
    marginTop: "5px",
    height: "38px",
    svg: {
      fontSize: 22,
      color:
        active == "true"
          ? theme.palette.colors.brand
          : theme.palette.colors.inactive_text,
    },

    "&:hover": {
      backgroundColor: theme.palette.colors.brand_hover,
    },

    "&:hover p": {
      color: theme.palette.colors.brand,
    },

    "&:hover svg": {
      color: theme.palette.colors.brand,
    },
  })
);

const CustomTypography = styled(Typography)(({ theme, active }) => ({
  fontFamily: "Lato, sans-serif",
  fontWeight: 400,
  color:
    active == "true"
      ? theme.palette.colors.brand
      : theme.palette.colors.inactive_text,
  fontSize: 14,
}));

const openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
