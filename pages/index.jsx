import { getCookiesServerSide } from '@/helpers/handleCookies';

export default function Home() {
  return <></>
}

export const getServerSideProps = ({ req, res }) => {

  const token = getCookiesServerSide('@acai:user', { req, res });

  if (token) {

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

}