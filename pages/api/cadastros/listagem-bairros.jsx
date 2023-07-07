async function listagemBairros(req, res) {
  const token = req.headers.authorization;

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/pedidos/bairros/`,
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
    listagemBairros(req, res);
  } else {
    res.status(405).send();
  }
}
