import * as yup from "yup";

export const funcionarioSchema = yup.object().shape({
  cpf: yup
    .string()
    .required("* Informe a sigla da loja!")
    .min(11, "Insira um CPF válido"),
  username: yup.string().required("Insira o nome"),
  funcao: yup.string().required("Selecione a função do funcionário"),
  is_active: yup.bool().required("Selecione o status do funcionário"),
});
