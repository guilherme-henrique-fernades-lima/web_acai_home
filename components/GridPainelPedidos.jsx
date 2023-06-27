import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

//Ícones
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import DoneIcon from "@mui/icons-material/Done";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CancelIcon from "@mui/icons-material/Cancel";

export default function GridPainelPedidos(props) {
  const { status, entregadores } = props;

  console.log("STATUS: ", status);
  console.log("ENTREGADORES: ", entregadores);

  return (
    <Grid container>
      {/* <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ marginRight: "10px" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Skeleton variant="rounded" width={70} height={16} />
              <Skeleton
                variant="rounded"
                width={70}
                height={16}
                sx={{ marginTop: 1 }}
              />
            </Box>
          </Stack>

          <Skeleton
            variant="rounded"
            width={20}
            height={30}
            sx={{ marginLeft: "20px" }}
          />
        </CustomBox>
      </CustomGrid>

      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ marginRight: "10px" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Skeleton variant="rounded" width={70} height={16} />
              <Skeleton
                variant="rounded"
                width={70}
                height={16}
                sx={{ marginTop: 1 }}
              />
            </Box>
          </Stack>

          <Skeleton
            variant="rounded"
            width={20}
            height={30}
            sx={{ marginLeft: "20px" }}
          />
        </CustomBox>
      </CustomGrid>

      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ marginRight: "10px" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Skeleton variant="rounded" width={70} height={16} />
              <Skeleton
                variant="rounded"
                width={70}
                height={16}
                sx={{ marginTop: 1 }}
              />
            </Box>
          </Stack>

          <Skeleton
            variant="rounded"
            width={20}
            height={30}
            sx={{ marginLeft: "20px" }}
          />
        </CustomBox>
      </CustomGrid>

      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ marginRight: "10px" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Skeleton variant="rounded" width={70} height={16} />
              <Skeleton
                variant="rounded"
                width={70}
                height={16}
                sx={{ marginTop: 1 }}
              />
            </Box>
          </Stack>

          <Skeleton
            variant="rounded"
            width={20}
            height={30}
            sx={{ marginLeft: "20px" }}
          />
        </CustomBox>
      </CustomGrid>

      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ marginRight: "10px" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Skeleton variant="rounded" width={70} height={16} />
              <Skeleton
                variant="rounded"
                width={70}
                height={16}
                sx={{ marginTop: 1 }}
              />
            </Box>
          </Stack>

          <Skeleton
            variant="rounded"
            width={20}
            height={30}
            sx={{ marginLeft: "20px" }}
          />
        </CustomBox>
      </CustomGrid> 

      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
          <Stack
            direction="row"
            sx={{
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ marginRight: "10px" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Skeleton variant="rounded" width={70} height={16} />
              <Skeleton
                variant="rounded"
                width={70}
                height={16}
                sx={{ marginTop: 1 }}
              />
            </Box>
          </Stack>

          <Skeleton
            variant="rounded"
            width={20}
            height={30}
            sx={{ marginLeft: "20px" }}
          />
        </CustomBox>
      </CustomGrid>

      */}

      {/* FIM DO SKELETON */}

      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
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
              sx={{ fontSize: 28, marginRight: "10px", color: "#B83E94" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#B83E94", fontSize: 12 }}>
                PEDIDOS
              </Typography>
              <Typography sx={{ color: "#B83E94", fontSize: 12 }}>
                ABERTOS
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#B83E94",
            }}
          >
            {status?.ABERTO ?? 0}
          </Typography>
        </CustomBox>
      </CustomGrid>
      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
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
              sx={{ fontSize: 28, marginRight: "10px", color: "#FF8000" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#FF8000", fontSize: 12 }}>
                PEDIDOS
              </Typography>
              <Typography sx={{ color: "#FF8000", fontSize: 12 }}>
                PENDENTES
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#FF8000",
            }}
          >
            {status?.EM_PRODUCAO ?? 0}
          </Typography>
        </CustomBox>
      </CustomGrid>
      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
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
              sx={{ fontSize: 28, marginRight: "10px", color: "#076E29" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#076E29", fontSize: 12 }}>
                PEDIDOS
              </Typography>
              <Typography sx={{ color: "#076E29", fontSize: 12 }}>
                CONCLUÍDOS
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#076E29",
            }}
          >
            {status?.CONCLUIDO ?? 0}
          </Typography>
        </CustomBox>
      </CustomGrid>

      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
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
              sx={{ fontSize: 28, marginRight: "10px", color: "#c51010" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#c51010", fontSize: 12 }}>
                PEDIDOS
              </Typography>
              <Typography sx={{ color: "#c51010", fontSize: 12 }}>
                CANCELADOS
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#c51010",
            }}
          >
            {status?.CANCELADO ?? 0}
          </Typography>
        </CustomBox>
      </CustomGrid>

      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
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
              sx={{ fontSize: 28, marginRight: "10px", color: "#000000" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#000", fontSize: 12 }}>
                TOTAL DE
              </Typography>
              <Typography sx={{ color: "#000", fontSize: 12 }}>
                PEDIDOS
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#000000",
            }}
          >
            {status?.TOTAL ?? 0}
          </Typography>
        </CustomBox>
      </CustomGrid>
      <CustomGrid item xs={12} sm={6} md={4} lg={2} xl={2}>
        <CustomBox elevation={0}>
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
              sx={{ fontSize: 28, marginRight: "10px", color: "#858585" }}
            />
            <Box sx={{ displa: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#858585", fontSize: 12 }}>
                ENTREGADORES
              </Typography>
              <Typography sx={{ color: "#858585", fontSize: 12 }}>
                ATIVOS
              </Typography>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: "bold",
              marginLeft: "20px",
              color: "#858585",
            }}
          >
            {entregadores?.length}
          </Typography>
        </CustomBox>
      </CustomGrid>
    </Grid>
  );
}

const CustomGrid = styled(Grid)((props) => ({
  height: 64,
  padding: "5px",
}));

const CustomBox = styled(Paper)((props) => ({
  //border: "1px solid #ccc",
  width: "100%",
  height: "100%",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
}));
