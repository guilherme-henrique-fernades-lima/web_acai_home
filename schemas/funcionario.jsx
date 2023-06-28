import * as yup from "yup";

export const funcionarioSchemaCadastro = yup.object().shape({
  cpf: yup
    .string()
    .required("Informe um CPF válido")
    .min(11, "O CPF precisa ter pelo menos 11 digitos"),
  username: yup.string().required("Insira o nome"),
  password: yup
    .string()
    .required("Insira uma senha para o usuário acessar o sistema")
    .min(6, "A senha precisa ter no mínimo 6 caracteres"),
  funcao: yup.string().required("Selecione a função do funcionário"),
  is_active: yup.bool().required("Selecione o status do funcionário"),
});

export const funcionarioSchemaUpdate = yup.object().shape({
  cpf: yup
    .string()
    .required("Informe um CPF válido")
    .min(11, "O CPF precisa ter pelo menos 11 digitos"),
  username: yup.string().required("Insira o nome"),
  funcao: yup.string().required("Selecione a função do funcionário"),
  is_active: yup.bool().required("Selecione o status do funcionário"),
});
