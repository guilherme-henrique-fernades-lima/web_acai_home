async function finalizarEntrega(req, res) {
  console.log("Entrou no finalizar entrega");
  const token = req.headers.authorization;

  const data = req.body;

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/pedidos/concluir/`,
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

  const json = await result.json();

  return res.status(result.status).json(json);
}

export default async function handler(req, res) {
  if (req.method == "POST") {
    finalizarEntrega(req, res);
  } else {
    res.status(405).send();
  }
}
