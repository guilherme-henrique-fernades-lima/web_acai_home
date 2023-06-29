import * as yup from "yup";

export const passwordSchemaCadastro = yup.object().shape({
  password: yup
    .string()
    .required("Insira uma senha para o usuário acessar o sistema")
    .min(6, "A senha precisa ter no mínimo 6 caracteres"),
});
