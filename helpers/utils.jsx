import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const TextStatusPedido = styled(Typography)((props) => ({
  fontSize: 10,
  fontFamily: "Lato, sans-serif",
  fontWeight: 400,
  padding: "3px 10px",
  borderRadius: "30px",
  textAlign: "center",

  ...(props.status == 4 && {
    color: "#45B802",
    backgroundColor: "#c3ffa1",
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
