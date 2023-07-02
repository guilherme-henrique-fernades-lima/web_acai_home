import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TextStatusPedido = styled(Typography)((props) => ({
  fontSize: 10,
  fontFamily: "Lato, sans-serif",
  fontWeight: 700,
  padding: "3px 10px",
  borderRadius: "30px",
  textAlign: "center",

  ...(props.status == "ABERTO" && {
    color: "#B83E94",
    backgroundColor: "#e4ceed",
  }),

  ...(props.status == "EM_PRODUCAO" && {
    color: "#FF8000",
    backgroundColor: "#ffdebd",
  }),

  ...(props.status == "ENVIADO" && {
    color: "#0563CE",
    backgroundColor: "#b0d5ff",
  }),

  ...(props.status == "CANCELADO" && {
    color: "#e81f10",
    backgroundColor: "#ffbab5",
  }),

  ...(props.status == "AGUARDANDO_PAGAMENTO" && {
    color: "#36b5ad",
    backgroundColor: "#d9fffd",
  }),

  ...(props.status == "CONCLUIDO" && {
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

  ...(props.status == "ativo" && {
    color: "#45B802",
    backgroundColor: "#c0fc9d",
  }),
  ...(props.status == "aguardando" && {
    color: "#FF8000",
    backgroundColor: "#ffdebd",
  }),
}));

export function renderTextStatusPedido(status) {
  if (status == "ABERTO") {
    return "ABERTO";
  } else if (status == "EM_PRODUCAO") {
    return "EM PRODUÇÃO";
  } else if (status == "ENVIADO") {
    return "ENVIADO";
  } else if (status == "CONCLUIDO") {
    return "CONCLUÍDO";
  } else if (status == "CANCELADO") {
    return "CANCELADO";
  } else if (status == "AGUARDANDO_PAGAMENTO") {
    return "AGUARDANDO PAG.";
  } else {
    return "---";
  }
}

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

export function formatarData(data) {
  const partes = data.split("-");
  const ano = partes[0];
  const mes = partes[1];
  const dia = partes[2];
  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

export function formatarValorBRL(valor) {
  const options = {
    style: "currency",
    currency: "BRL",
  };
  const valorFormatado = valor.toLocaleString("pt-BR", options);
  return valorFormatado;
}

export function formatarCPFSemAnonimidade(cpf) {
  // Remove todos os caracteres que não sejam números
  cpf = cpf.replace(/\D/g, "");

  // Aplica a formatação
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

  return cpf;
}

export function formatarTelefone(telefone) {
  // Remover todos os caracteres não numéricos do número de telefone
  const numeroLimpo = telefone.replace(/\D/g, "");

  // Verificar se o número de telefone possui o formato correto (11 dígitos)
  if (numeroLimpo.length !== 11) {
    throw new Error(
      "Número de telefone inválido. Certifique-se de que o número contenha 11 dígitos."
    );
  }

  // Formatar o número de telefone no formato desejado
  const codigoArea = numeroLimpo.slice(0, 2);
  const digito9 = numeroLimpo.slice(2, 3);
  const digitosRestantes = numeroLimpo.slice(3);
  const telefoneFormatado = `(${codigoArea}) ${digito9} ${digitosRestantes.slice(
    0,
    4
  )}-${digitosRestantes.slice(4)}`;

  return telefoneFormatado;
}
