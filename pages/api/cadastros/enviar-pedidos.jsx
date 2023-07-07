async function getPedidosDisponiveis(req, res) {
  const token = req.headers.authorization;

  const bairro = req.query.bairro ?? "";

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/pedidos/pendentes/?bairro=${bairro}`,
    {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();

  return res.status(result.status).json(data);
}

async function enviarPedidosEntregador(req, res) {
  console.log("ENTROU NA FUNCAO DE ENVIAR PEDIDO");
  const payload = req.body;
  const token = req.headers.authorization;

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/pedidos/enviar/`,
    {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    }
  );

  const data = await result.json();

  return res.status(result.status).json(data);
}

export default async function handler(req, res) {
  if (req.method == "GET") {
    getPedidosDisponiveis(req, res);
  } else if (req.method == "POST") {
    enviarPedidosEntregador(req, res);
  } else {
    res.status(405).send();
  }
}
