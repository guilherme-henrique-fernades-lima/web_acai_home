import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { useState, useEffect } from "react";

//Ícones
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import DoneIcon from "@mui/icons-material/Done";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

export default function GridPainelPedidos(props) {
  const { status, entregadores, loading } = props;

  return (
    <Grid container>
      {loading ? (
        <>
          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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

          <CustomGrid item xs={12} sm={6} md={4} lg={1.71} xl={1.71}>
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

          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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

          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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

          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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

          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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

          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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
        </>
      ) : (
        <>
          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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
          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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
                    EM PRODUÇÃO
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
          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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

          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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
                  sx={{ fontSize: 28, marginRight: "10px", color: "#e81f10" }}
                />
                <Box sx={{ displa: "flex", flexDirection: "column" }}>
                  <Typography sx={{ color: "#e81f10", fontSize: 12 }}>
                    PEDIDOS
                  </Typography>
                  <Typography sx={{ color: "#e81f10", fontSize: 12 }}>
                    CANCELADOS
                  </Typography>
                </Box>
              </Stack>
              <Typography
                sx={{
                  fontSize: 32,
                  fontWeight: "bold",
                  marginLeft: "20px",
                  color: "#e81f10",
                }}
              >
                {status?.CANCELADO ?? 0}
              </Typography>
            </CustomBox>
          </CustomGrid>

          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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
                <HourglassTopIcon
                  sx={{ fontSize: 28, marginRight: "10px", color: "#36b5ad" }}
                />
                <Box sx={{ displa: "flex", flexDirection: "column" }}>
                  <Typography sx={{ color: "#36b5ad", fontSize: 12 }}>
                    PEDIDOS
                  </Typography>
                  <Typography sx={{ color: "#36b5ad", fontSize: 12 }}>
                    AGUARDANDO PAG.
                  </Typography>
                </Box>
              </Stack>
              <Typography
                sx={{
                  fontSize: 32,
                  fontWeight: "bold",
                  marginLeft: "20px",
                  color: "#36b5ad",
                }}
              >
                {status?.AGUARDANDO_PAGAMENTO ?? 0}
              </Typography>
            </CustomBox>
          </CustomGrid>

          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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
                <DeliveryDiningIcon
                  sx={{ fontSize: 28, marginRight: "10px", color: "#0563CE" }}
                />
                <Box sx={{ displa: "flex", flexDirection: "column" }}>
                  <Typography sx={{ color: "#0563CE", fontSize: 12 }}>
                    PEDIDOS
                  </Typography>
                  <Typography sx={{ color: "#0563CE", fontSize: 12 }}>
                    ENVIADOS
                  </Typography>{" "}
                </Box>
              </Stack>
              <Typography
                sx={{
                  fontSize: 32,
                  fontWeight: "bold",
                  marginLeft: "20px",
                  color: "#0563CE",
                }}
              >
                {status?.ENVIADO ?? 0}
              </Typography>
            </CustomBox>
          </CustomGrid>

          <CustomGrid item xs={12} sm={6} md={4} lg={2.4} xl={1.7}>
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
        </>
      )}
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
