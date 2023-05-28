import React, { useState, createContext } from "react";
import { ThemeProvider } from "@mui/material";

export const ThemeContext = createContext({});

//Arquivos de temas
import { dark } from '../styles/dark';
import { light } from '../styles/light';

export default function SettingsProvider({children}) {
    const [themePalette, setTheme] = useState(light); //Estado para armazenar o tema default da aplicação, caso não exista algum salvo no localStorage    
   
    //Função para alterar o tema
    function changeThemePalette(newTheme) {
        setTheme(themePalette.palette.mode == 'light' ? dark : light);
    }  

    return (
        <ThemeContext.Provider value={{ changeThemePalette }}>
            <ThemeProvider theme={themePalette}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}
