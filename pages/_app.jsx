// import "../styles/global.css";
//Contexto para temas e dados para mandar entre as páginas
import ThemeContext from "@/context/ThemeContext";
import AuthContext from "@/context/AuthContext";
import GlobalStyles from "../styles/GlobalStyles";

import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeContext>
      <Head>
        <title>AÇAI HOME - Gestor de Pedidos</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#B83E94" />
        {/* <!-- Chrome, Firefox OS and Opera -->*/}
        <meta name="msapplication-navbutton-color" content="#B83E94" />
        {/* <!-- Windows Phone -->*/}
        <meta name="apple-mobile-web-app-status-bar-style" content="#B83E94" />
        {/*<!-- iOS Safari -->*/}
      </Head>

      <AuthContext>
        <GlobalStyles />
        <Component {...pageProps} />
      </AuthContext>
    </ThemeContext>
  );
}
