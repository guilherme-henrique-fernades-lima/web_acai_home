async function cadastrarNovoUsuario(req, res) {
  const payload = req.body;

  const result = await fetch(`${process.env.NEXT_URL_BACKEND}/auth/register/`, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: payload,
  });

  if (result.status == 201) {
    const json = await result.json();
    return res.status(result.status).json(json);
  } else {
    return res.status(result.status).json({ message: "CPF já existe" });
  }
}

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

export default async function handler(req, res) {
  if (req.method == "POST") {
    cadastrarNovoUsuario(req, res);
  } else if (req.method == "GET") {
    listarUsuarios(req, res);
  } else {
    res.status(405).send();
  }
}
