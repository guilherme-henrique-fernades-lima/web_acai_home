async function cadastrarNovoUsuario(req, res) {
  const payload = req.body;
  console.log("ENTROU NA FUNCAO DE CADASTRAR NOVO FUNCIONARIO");
  console.log("PAYLOAD: ", payload);

  const result = await fetch(`${process.env.NEXT_URL_BACKEND}/auth/register/`, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: payload,
  });

  const user = await result.json();

  return res.status(result.status).json(user);
}

export default async function handler(req, res) {
  if (req.method == "POST") {
    cadastrarNovoUsuario(req, res);
  } else {
    res.status(405).send();
  }
}
