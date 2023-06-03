// import "../styles/global.css";
//Contexto para temas e dados para mandar entre as páginas
import ThemeContext from "@/context/ThemeContext";
import AuthContext from "@/context/AuthContext";
import GlobalStyles from "../styles/GlobalStyles";


export default function MyApp({ Component, pageProps }) {

return (
  <ThemeContext>
    <AuthContext>
      <GlobalStyles />
      <Component {...pageProps} />
    </AuthContext>
  </ThemeContext>
  )
};