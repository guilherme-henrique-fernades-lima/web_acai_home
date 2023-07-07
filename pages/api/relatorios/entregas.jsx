async function getPedidos(req, res) {
  const token = req.headers.authorization;

  var date = req.query.date ?? "";
  var tp_pag = req.query.tp_pag ?? "";
  var cpf_motorista = req.query.cpf_motorista ?? "";

  console.log("date: ", date);
  console.log("tp_pag: ", tp_pag);
  console.log("cpf_motorista: ", cpf_motorista);

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/pedidos/concluidos/?date=2023-07-07&tp_pag=&cpf_motorista=05251596308`,
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

export default async function handler(req, res) {
  if (req.method == "GET") {
    getPedidos(req, res);
  } else {
    res.status(405).send();
  }
}
