import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const options = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const res = await fetch('http://127.0.0.1:8005/integration/auth/login/', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        });

        const user = await res.json();

        if (res.ok && user) {
          // Adicione todas as propriedades do usuário na resposta
          const {
            id,
            username,
            email,
            nr_matricula,
            funcao,
            created,
            is_active,
            is_staff,
            groups,
            user_permissions,
            token,
            refresh
          } = user;
          return Promise.resolve({
            id,
            name: username,
            email,
            nr_matricula,
            funcao,
            created,
            is_active,
            is_staff,
            groups,
            user_permissions,
            token,
            refresh
          });
        } else {
          // Retorne null se a autenticação falhar
          return Promise.resolve(null);
        }
      }
    })
  ],
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.id = user.id;
      }
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      if (token) {
        session.user = token;
      }
      return Promise.resolve(session);
    }
  }
};

export default (req, res) => NextAuth(req, res, options);