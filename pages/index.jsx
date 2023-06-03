import Login from './auth/login';
import { getCookiesServerSide } from '@/helpers/handleCookies';

export default function Home() {

  return <Login />

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
    props: {},
  };
}