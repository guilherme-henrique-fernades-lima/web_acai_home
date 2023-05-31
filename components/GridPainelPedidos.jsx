import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

//Ícones
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { Typography } from "@mui/material";

const CustomGrid = styled(Grid)((props) => ({
  height: 100,
  padding: "5px",
}));

const CustomBox = styled(Box)((props) => ({
  border: "1px solid #ccc",
  width: "100%",
  height: "100%",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function GridPainelPedidos() {
  return (
    <Grid container>
      <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
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
            <AccessAlarmIcon sx={{ fontSize: 60, marginRight: "10px" }} />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography>QUANTIDADE</Typography>
              <Typography>DE PEDIDOS</Typography>
            </Box>
          </Stack>
          <Typography
            sx={{ fontSize: 44, fontWeight: "bold", marginLeft: "20px" }}
          >
            88
          </Typography>
        </CustomBox>
      </CustomGrid>
      <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
        <CustomBox></CustomBox>
      </CustomGrid>
      <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
        <CustomBox></CustomBox>
      </CustomGrid>
      <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
        <CustomBox></CustomBox>
      </CustomGrid>
      <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
        <CustomBox></CustomBox>
      </CustomGrid>
    </Grid>
  );
}
