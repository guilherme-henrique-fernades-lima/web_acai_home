import * as yup from "yup";

export const funcionarioSchema = yup.object().shape({
  cpf: yup
    .string()
    .required("* Informe a sigla da loja")
    .min(11, "Insira um CPF válido"),
  username: yup
    .string()
    .required("Insira o nome")
    .min(6, "Insira um CPF válido"),
  password: yup
    .string()
    .required("Insira uma senha para o usuário acessar o sistema")
    .min(6, "A senha precisa ter no mínimo 6 caracteres"),
  repeat_password: yup
    .string()
    .required("Repita a senha")
    .min(6, "A senha precisa ter no mínimo 6 caracteres"),
  funcao: yup.string().required("Selecione a função do funcionário"),
  is_active: yup.bool().required("Selecione o status do funcionário"),
});
