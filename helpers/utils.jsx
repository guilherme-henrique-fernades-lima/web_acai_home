import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

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
