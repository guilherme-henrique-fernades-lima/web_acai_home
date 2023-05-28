import * as yup from "yup";

export const funcionarioSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "O nome precisar ter pelo menos 3 caracteres.")
    .max(30, "O nome pode ter no máximo 30 caracteres.")
    .required("O campo nome é obrigatório"),
  last_name: yup
    .string()
    .min(3)
    .max(30)
    .required("O campo sobrenome é obrigatório"),
});
