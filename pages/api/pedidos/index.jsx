async function getPedidos(req, res) {
  const token = req.headers.authorization;

  var date = req.query.date ?? "";
  var statusPedido = req.query.date ?? "";
  var zonaEntrega = req.query.date ?? "";

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/pedidos/?date=2023-06-21`,
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

export default async function handler(req, res) {
  if (req.method == "GET") {
    getPedidos(req, res);
  } else {
    res.status(405).send();
  }
}
