import React, { useState } from "react";

//Mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  DataGrid,
  GridToolbar,
  ptBR,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

//Config JSON para tradução de textos para PT-BR do datagrid
import { PT_BR_DEFAULT_LOCALE_TEXT } from "@/config/DatagridLocaleText";

//Ícones
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FilterListIcon from "@mui/icons-material/FilterList";
import LineWeightRoundedIcon from "@mui/icons-material/LineWeightRounded";

export default function DataTable(props) {
  const [pageSize, setPageSize] = useState(50);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  function CustomToolbar() {
    return (
      <Grid container sx={{ mt: 3, mb: 1 }}>
        <GridToolbarContainer sx={{ width: "100%" }}>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <GridToolbarQuickFilter
              placeholder="Pesquisar..."
              sx={{ width: "100%" }}
              size="small"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={8}
            xl={9}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",

              ["@media (max-width:599px)"]: {
                justifyContent: "center",
              },
            }}
          >
            <Restricted to={props.perm}>
              <GridToolbarExport
                csvOptions={{
                  allColumns: true,
                }}
                startIcon={
                  <Tooltip title="Download" placement="top">
                    <CloudDownloadIcon
                      sx={{ color: "#525252", fontSize: "38px" }}
                      fontSize="large"
                    />
                  </Tooltip>
                }
                sx={{
                  fontSize: "38px",
                  "&:hover": {
                    cursor: "pointer",
                    opacity: "0.5",
                  },
                }}
                printOptions={{ disableToolbarButton: true }}
              />

              <ExportExcel />
            </Restricted>

            <GridToolbarColumnsButton
              startIcon={
                <Tooltip title="Esconder colunas" placement="top">
                  <ViewColumnIcon sx={{ color: "#525252" }} fontSize="large" />
                </Tooltip>
              }
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  opacity: "0.5",
                },
              }}
            />
          </Grid>
        </GridToolbarContainer>
      </Grid>
    );
  }

  return (
    <Box>
      <DataGrid
        localeText={PT_BR_DEFAULT_LOCALE_TEXT} //Arquivo fonte do MUI datagrid com todas as labels traduzidas, porém com "" no lugar das strings do toolbar.
        rows={props.rows} //Linhas da tabela
        columns={props.columns} //Colunas da tabela
        rowHeight={props.rowHeight ? props.rowHeight : 52}
        autoHeight={true} //Componente calcular a altura automaticamente com o seu conteúdo
        components={{
          //Add o toolbar personalizado com o filtro de busca e o botão de esconder colunas
          Toolbar: CustomToolbar,
        }}
        sx={{
          border: "none",
          mb: 2,
          mt: 1,
        }}
        disableColumnMenu={true} //Desabilitar botão de colunas
        disableSelectionOnClick={true} //Desabilitar seleção de linha ao clicar na linha
        disableColumnResize={true} //Desabilitar a função de arrastar para aumentar o tamanho da coluna
        pageSize={pageSize} //Quantidade de linhas para cada página
        rowsPerPageOptions={[5, 10, 25, 50, 100]} //Opções para mudar a quantidade de linhas da página. Inicia em 10 e não pode passar de 100.
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} //Alterar a quantidade de linhas
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Linhas por página",
          },
        }}
        columnVisibilityModel={
          props.columnVisibilityModel
            ? props.columnVisibilityModel
            : columnVisibilityModel
        }
        onColumnVisibilityModelChange={
          props.onColumnVisibilityModelChange
            ? props.onColumnVisibilityModelChange
            : (newModel) => setColumnVisibilityModel(newModel)
        }
        hideFooter={props.disableFooter}
      />
    </Box>
  );
}
