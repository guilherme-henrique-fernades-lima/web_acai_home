// import "../styles/global.css";
import Layout from "../components/Layout";

//Contexto para temas e dados para mandar entre as páginas
import ThemeContext from "@/context/ThemeContext";
import AuthContext from "@/context/AuthContext";
import GlobalStyles from "../styles/GlobalStyles";


function MyApp({ Component, pageProps }) {
  return (
    <AuthContext>
      <GlobalStyles />
      <ThemeContext>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </ThemeContext>
    </AuthContext>
  );
}

export default MyApp;