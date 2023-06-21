import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

//Icons
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PixIcon from "@mui/icons-material/Pix";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const TextStatusPedido = styled(Typography)((props) => ({
  fontSize: 10,
  fontFamily: "Lato, sans-serif",
  fontWeight: 700,
  padding: "3px 10px",
  borderRadius: "30px",
  textAlign: "center",

  ...(props.status == 1 && {
    color: "#B83E94",
    backgroundColor: "#f8e8ff",
  }),

  ...(props.status == 2 && {
    color: "#FF8000",
    backgroundColor: "#ffdebd",
  }),

  ...(props.status == 3 && {
    color: "#0563CE",
    backgroundColor: "#b0d5ff",
  }),

  ...(props.status == 4 && {
    color: "#e81f10",
    backgroundColor: "#ffbab5",
  }),

  ...(props.status == 5 && {
    color: "#45B802",
    backgroundColor: "#c0fc9d",
  }),
}));

const TextZonaEntregaPedido = styled(Typography)((props) => ({
  fontSize: 10,
  fontFamily: "Lato, sans-serif",
  fontWeight: 700,
  padding: "3px 10px",
  borderRadius: "30px",
  textAlign: "center",

  ...(props.zona == "norte" && {
    color: "#0563CE",
    backgroundColor: "#E5EFFA",
  }),

  ...(props.zona == "norte" && {
    color: "#0563CE",
    backgroundColor: "#E5EFFA",
  }),

  ...(props.zona == "norte" && {
    color: "#0563CE",
    backgroundColor: "#E5EFFA",
  }),

  ...(props.zona == "norte" && {
    color: "#0563CE",
    backgroundColor: "#E5EFFA",
  }),

  ...(props.zona == "norte" && {
    color: "#0563CE",
    backgroundColor: "#E5EFFA",
  }),
}));

const TextStatusEntregador = styled(Typography)((props) => ({
  fontSize: 10,
  fontFamily: "Lato, sans-serif",
  fontWeight: 700,
  padding: "3px 10px",
  borderRadius: "30px",
  textAlign: "center",

  ...(props.status == "aguardando" && {
    color: "#FF8000",
    backgroundColor: "#ffdebd",
  }),
}));

export function StatusPedido(props) {
  const { children } = props;

  /**
   *  ABERTO
   *  EM_PRODUCAO
   *  ENVIADO
   *  CONCLUIDO
   *  CANCELADO
   *  AGUARDANDO_PAGAMENTO
   */

  return <TextStatusPedido status={props.status}>{children}</TextStatusPedido>;
}

export function BadgeZonaEntrega(props) {
  const { children } = props;

  return (
    <TextZonaEntregaPedido zona={props.zona}>{children}</TextZonaEntregaPedido>
  );
}

export function BadgeStatusEntregador(props) {
  const { children } = props;

  return (
    <TextStatusEntregador status={props.status}>
      {children}
    </TextStatusEntregador>
  );
}

export function RenderIconFormaPagamento(props) {
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
        <Stack>
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

export function RenderUser() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: 45,
          height: 45,
          backgroundColor: "#ccc",
          borderRadius: "50%",
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
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 900,
            fontSize: 14,
          }}
        >
          NOME DO ENTREGADOR
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 400,
            fontSize: 14,
            marginTOp: "-15px",
          }}
        >
          nome
        </Typography>
      </Box>
    </Box>
  );
}

export function formatCpf(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

  // Anonimiza os dígitos intermediários do CPF com asteriscos
  var cpfAnonimo = cpf.substring(0, 3) + "." + "xxx" + "." + "xxx";

  // Mantém os últimos dois dígitos do CPF
  cpfAnonimo += "-" + cpf.substring(9);

  // Retorna o CPF anonimizado com a formatação
  return cpfAnonimo;
}
