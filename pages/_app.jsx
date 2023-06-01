// import "../styles/global.css";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react"

//Contexto para temas e dados para mandar entre as páginas
import ThemeContext from "../context/ThemeContext";
import GlobalStyles from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeContext>
        {/* <Layout> */}
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
        {/* </Layout> */}
      </ThemeContext>
    </>
  );
}

export default MyApp;
