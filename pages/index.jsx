import { getCookiesServerSide } from "@/helpers/handleCookies";

export default function Home() {
  return <></>;
}

export const getServerSideProps = ({ req, res }) => {
  const token = getCookiesServerSide("@acai:user", { req, res });

  console.log("token: ", token);

  if (token) {
    if (token.funcao == "entregador") {
      return {
        redirect: {
          permanent: true,
          destination: "/entregadores/pedidos-em-rota",
        },
      };
    }
    return {
      redirect: {
        permanent: true,
        destination: "/home",
      },
    };
  }

  return {
    redirect: {
      permanent: true,
      destination: "/auth/login",
    },
  };
};
