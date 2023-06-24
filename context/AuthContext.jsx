import Router from "next/router";
import Layout from "@/components/Layout";
import { createContext, useState, useEffect } from "react";
import {
  createCookies,
  getCookie,
  hasCookie,
  deleteCookie,
} from "@/helpers/handleCookies";
import { encryptData, decryptData } from "@/helpers/hash";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("INICIA CONTEXT>>>>")
    //Rotina para checar autenticação
    if (hasCookie("@acai:user")) {
      userRecover();
    } else {
      logout();
    }
  }, []);

  const login = async (credenciais) => {
    const result = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: credenciais,
    });

    if (result.status == 200) {
      const data = await result.json();

      var exp_token = JSON.parse(atob(data.token.split(".")[1]));

      //diff micro -> milliseconds -> seconds - 3 hours UTC
      var MaxAge_seconds =
        Math.abs(new Date() - new Date(exp_token.exp * 1000)) / 1000 - 10800;

      createCookies("@acai:user", encryptData(data), MaxAge_seconds);

      setUser(data);
      Router.push("/home");
    } else {
      setError({
        status_code: result.status,
        message: "Falha na autenticação!",
      });
    }
  };

  const logout = () => {
    setUser(null);
    deleteCookie("@acai:user");
    Router.push("/auth/login");
  };

  const userRecover = () => {
    const data = getCookie("@acai:user");
    setUser(decryptData(data));
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {user && Object.keys(user) ? <Layout>{children}</Layout> : children}
    </AuthContext.Provider>
  );
}
