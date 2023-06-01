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

                console.log("credentials", credentials);
                console.log("RES>>>", res);

                const user = await res.json();

                if (res.ok && user) {
                    // Retorne o objeto do usuário se a autenticação for bem-sucedida
                    return Promise.resolve(user);
                } else {
                    // Retorne null se a autenticação falhar
                    return Promise.resolve(null);
                }
            }
        })
    ],
    session: {
        jwt: true
    },
    callbacks: {
        session: async (session, user) => {
            // Personalize a sessão do usuário conforme necessário
            session.user.id = user.id;
            return Promise.resolve(session);
        }
    }
};

export default (req, res) => NextAuth(req, res, options);