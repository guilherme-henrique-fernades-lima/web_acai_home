import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

//Ícones
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Typography from "@mui/material/Typography";

import DoneIcon from "@mui/icons-material/Done";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CancelIcon from "@mui/icons-material/Cancel";

const CustomGrid = styled(Grid)((props) => ({
  height: 100,
  padding: "5px",
}));

const CustomBox = styled(Box)((props) => ({
  // border: "1px solid #ccc",
  width: "100%",
  height: "100%",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
}));

export default function GridPainelPedidos() {
  return (
    <Grid container>
      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DescriptionIcon
              sx={{ fontSize: 38, marginRight: "10px", color: "#B83E94" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#B83E94", fontSize: 14 }}>
                PEDIDOS
              </Typography>
              <Typography sx={{ color: "#B83E94", fontSize: 14 }}>
                ABERTOS
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#B83E94",
            }}
          >
            88
          </Typography>
        </CustomBox>
      </CustomGrid>
      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AccessAlarmIcon
              sx={{ fontSize: 38, marginRight: "10px", color: "#FF8000" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#FF8000", fontSize: 14 }}>
                PEDIDOS
              </Typography>
              <Typography sx={{ color: "#FF8000", fontSize: 14 }}>
                PENDENTES
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#FF8000",
            }}
          >
            88
          </Typography>
        </CustomBox>
      </CustomGrid>
      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DoneIcon
              sx={{ fontSize: 38, marginRight: "10px", color: "#076E29" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#076E29", fontSize: 14 }}>
                PEDIDOS
              </Typography>
              <Typography sx={{ color: "#076E29", fontSize: 14 }}>
                CONCLUÍDOS
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#076E29",
            }}
          >
            88
          </Typography>
        </CustomBox>
      </CustomGrid>

      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CancelIcon
              sx={{ fontSize: 38, marginRight: "10px", color: "#c51010" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#c51010", fontSize: 14 }}>
                PEDIDOS
              </Typography>
              <Typography sx={{ color: "#c51010", fontSize: 14 }}>
                CANCELADOS
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#c51010",
            }}
          >
            88
          </Typography>
        </CustomBox>
      </CustomGrid>

      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NoteAltIcon
              sx={{ fontSize: 38, marginRight: "10px", color: "#000000" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#000", fontSize: 14 }}>
                TOTAL DE
              </Typography>
              <Typography sx={{ color: "#000", fontSize: 14 }}>
                PEDIDOS
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#000000",
            }}
          >
            88
          </Typography>
        </CustomBox>
      </CustomGrid>
      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GroupsIcon
              sx={{ fontSize: 38, marginRight: "10px", color: "#858585" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#858585", fontSize: 14 }}>
                TOTAL DE
              </Typography>
              <Typography sx={{ color: "#858585", fontSize: 14 }}>
                ENTREGADORES
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#858585",
            }}
          >
            88
          </Typography>
        </CustomBox>
      </CustomGrid>
    </Grid>
  );
}
