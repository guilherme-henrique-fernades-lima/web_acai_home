async function getPedidos(req, res) {
  const token = req.headers.authorization;

  var date = req.query.date ?? "";
  var status = req.query.status ?? "";
  var tp_pag = req.query.tp_pag ?? "";
  var zona = req.query.zona ?? "";

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/pedidos/?date=${date}&status=${status}&tp_pag=${tp_pag}&zona=${zona}`,
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
