async function listarPedidosEmRotaDeEntrega(req, res) {
  const token = req.headers.authorization;

  var cpf_motorista = req.query.cpf_motorista ?? "";

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/pedidos/entrega/?cpf_motorista=${cpf_motorista}`,
    {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await result.json();

  return res.status(result.status).json(json);
}

async function removerPedidoEntregador(req, res) {
  console.log("Entrou na funcao de remover o pedido do entregador");
  const token = req.headers.authorization;

  const data = req.body;

  const response = await fetch(
    `${process.env.NEXT_URL_BACKEND}/pedidos/remover/`,
    {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }
  );

  const json = await response.json();

  return res.status(response.status).json(json);
}

export default async function handler(req, res) {
  if (req.method == "GET") {
    listarPedidosEmRotaDeEntrega(req, res);
  } else if (req.method == "POST") {
    removerPedidoEntregador(req, res);
  } else {
    res.status(405).send();
  }
}
