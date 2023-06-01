// import "../styles/global.css";
import Layout from "../components/Layout";

//Contexto para temas e dados para mandar entre as páginas
import ThemeContext from "../context/ThemeContext";
import GlobalStyles from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeContext>
        {/* <Layout> */}
        <Component {...pageProps} />
        {/* </Layout> */}
      </ThemeContext>
    </>
  );
}

export default MyApp;
