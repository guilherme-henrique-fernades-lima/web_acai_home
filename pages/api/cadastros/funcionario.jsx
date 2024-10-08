async function getUserData(req, res) {
  const token = req.headers.authorization;
  const id = req.query.id ?? "";

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/auth/users/${id}`,
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

async function atualizarDadosFuncionario(req, res) {
  const token = req.headers.authorization;

  const data = req.body;

  const result = await fetch(`${process.env.NEXT_URL_BACKEND}/auth/users/`, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  const json = await result.json();

  return res.status(result.status).json(json);
}

export default async function handler(req, res) {
  if (req.method == "GET") {
    getUserData(req, res);
  } else if (req.method == "POST") {
    atualizarDadosFuncionario(req, res);
  } else {
    res.status(405).send();
  }
}
