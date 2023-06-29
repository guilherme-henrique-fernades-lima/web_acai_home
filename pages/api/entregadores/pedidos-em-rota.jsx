async function listarPedidosEntregador(req, res) {
  const token = req.headers.authorization;

  const date = req.query.date ?? "";
  const cpf_motorista = req.query.cpf_motorista ?? "";

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/motoristas/pedidos/?date=${date}&cpf_motorista=${cpf_motorista}`,
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

async function concluirEntrega(req, res) {
  console.log("ENTROU NA CONCLUSAO DO PEDIDO");
  const token = req.headers.authorization;

  const data = req.body;

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/motoristas/pedidos/finalizar/`,
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

  console.log(result);

  const json = await result.json();

  return res.status(result.status).json(json);
}

export default async function handler(req, res) {
  if (req.method == "GET") {
    listarPedidosEntregador(req, res);
  } else if (req.method == "POST") {
    concluirEntrega(req, res);
  } else {
    res.status(405).send();
  }
}
