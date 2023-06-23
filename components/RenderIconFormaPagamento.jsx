//Mui components
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

//Icons
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PixIcon from "@mui/icons-material/Pix";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function RenderIconFormaPagamento(props) {
  const { children, formaPagamento } = props;

  if (formaPagamento == "DINHEIRO") {
    return (
      <Tooltip title="Dinheiro" placement="top">
        <LocalAtmIcon />
      </Tooltip>
    );
  } else if (formaPagamento == "PIX") {
    return (
      <Tooltip title="Pix" placement="top">
        <PixIcon />
      </Tooltip>
    );
  } else if (formaPagamento == "DEBITO") {
    return (
      <Tooltip title="Débito" placement="top">
        <CreditCardIcon />
      </Tooltip>
    );
  } else if (formaPagamento == "CREDITO") {
    return (
      <Tooltip title="Crédito" placement="top">
        <CreditCardIcon />
      </Tooltip>
    );
  } else if (formaPagamento == "DINHEIRO_CARTAO") {
    return (
      <Tooltip title="Dinheiro e cartão" placement="top">
        <Stack
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LocalAtmIcon />
          <CreditCardIcon sx={{ marginLeft: "5px" }} />
        </Stack>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Não mapeado" placement="top">
        <HelpOutlineIcon />
      </Tooltip>
    );
  }
}
