import React, {useContext, useState} from "react";
import {getCurrentTheme, toggleDarkTheme} from "../utils/ui";
import {createTheme, ThemeProvider as MaterialThemeProvider} from "@mui/material";

interface IThemeContext {
  currentTheme: string,
  toggleTheme: () => void,
}

export const ThemeContext = React.createContext<IThemeContext>({} as IThemeContext);

function ThemeProvider(props: any) {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

  function toggleTheme() {
    const newTheme = toggleDarkTheme();
    setCurrentTheme(newTheme);
  }

  const materialTheme = createTheme({
    palette: {
      mode: currentTheme,
    },
  });
  return <ThemeContext.Provider value={{
    currentTheme,
    toggleTheme,
  }}>
    <MaterialThemeProvider theme={materialTheme}>
      {props.children}
    </MaterialThemeProvider>
  </ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

export default ThemeProvider;