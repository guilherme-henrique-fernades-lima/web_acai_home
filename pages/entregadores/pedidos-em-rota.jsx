import React, { useState, useEffect, useContext } from "react";

//Context
import { AuthContext } from "@/context/AuthContext";

import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

//Icons
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function PedidosEmRota(props) {
  const [pedidosExibidos, setPedidosExibidos] = useState("pendentes");

  const { user } = useContext(AuthContext);

  const handlePedidosExibidos = (event, newAlignment) => {
    if (newAlignment !== null) {
      setPedidosExibidos(newAlignment);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 600,
          border: "1px solid #ccc",
          margin: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#842E6B",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#fff",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <Typography sx={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>
                {user?.username?.toUpperCase()}
              </Typography>
              {/* <Typography sx={{ fontWeight: 400, fontSize: 14, color: "#fff" }}>
                (86) 99999-9999
              </Typography> */}
            </Box>
          </Box>
        </Box>

        <ToggleButtonGroup
          color="primary"
          value={pedidosExibidos}
          exclusive
          onChange={handlePedidosExibidos}
          aria-label="Platform"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            backgroundColor: "#fff",
            width: "100%",
            borderBottom: "3px solid #842E6B",
            borderRadius: 0,
          }}
          size="small"
        >
          <ToggleButton value="pendentes" sx={{ backgroundColor: "#fff" }}>
            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
              PENDENTES
            </Typography>
          </ToggleButton>

          <ToggleButton value="concluidos">
            <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
              CONCLUÍDOS
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        {pedidosExibidos == "pendentes" ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#F8F8F8",
              overflow: "scroll",
              padding: "10px",

              ".firefoxScrollBar": {
                "scrollbar-width": "auto",
                "scrollbar-color": "#842E6B #f8e8ff",
              },
              "::-webkit-scrollbar": {
                width: "8px",
              },
              "::-webkit-scrollbar-track": {
                boxShadow: "nset 0 0 6px grey",
                //borderRadius: "5px",
                backgroundColor: "#f8e8ff",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "#842E6B",
                //borderRadius: "8px",
                height: "2px",
              },
            }}
          >
            {[1, 2, 3, 4, 8, 9, 10].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  //height: 120,
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  padding: "10px",
                  position: "relative",
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }}
                >
                  <LocalPhoneIcon />
                </IconButton>

                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      marginBottom: "10px",
                    }}
                  >
                    <Box
                      sx={{ width: 50, height: 50, border: "1px solid #ccc" }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        flexDirection: "column",
                        marginLeft: "10px",
                      }}
                    >
                      <Typography sx={{ fontWeight: 900, fontSize: 12 }}>
                        CLIENTE
                      </Typography>
                      <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                        CLIENTE
                      </Typography>
                      <Typography sx={{ fontWeight: 400, fontSize: 10 }}>
                        CLIENTE
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  disableElevation
                  fullWidth
                  sx={{ fontWeight: 400, fontSize: 12 }}
                >
                  CONCLUIR ENTREGA
                </Button>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#F8F8F8",
              overflow: "scroll",
              padding: "10px",

              ".firefoxScrollBar": {
                "scrollbar-width": "auto",
                "scrollbar-color": "#842E6B #f8e8ff",
              },
              "::-webkit-scrollbar": {
                width: "8px",
              },
              "::-webkit-scrollbar-track": {
                boxShadow: "nset 0 0 6px grey",
                //borderRadius: "5px",
                backgroundColor: "#f8e8ff",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "#842E6B",
                //borderRadius: "8px",
                height: "2px",
              },
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: 120,
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
