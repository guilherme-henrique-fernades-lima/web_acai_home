async function listarUsuarios(req, res) {
  const token = req.headers.authorization;

  const result = await fetch(`${process.env.NEXT_URL_BACKEND}/auth/users/`, {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await result.json();

  return res.status(result.status).json(json);
}

async function trocarSenhaUsuario(req, res) {
  const token = req.headers.authorization;

  const data = req.body;

  const result = await fetch(
    `${process.env.NEXT_URL_BACKEND}/auth/users/change/password/`,
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

  return res.status(result.status).json({ message: "senha alterada" });
}

export default async function handler(req, res) {
  if (req.method == "GET") {
    listarUsuarios(req, res);
  } else if (req.method == "POST") {
    trocarSenhaUsuario(req, res);
  } else {
    res.status(405).send();
  }
}
