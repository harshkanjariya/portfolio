import React, {useContext, useState} from "react";
import {getCurrentTheme, toggleDarkTheme} from "../utils/ui";

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

  return <ThemeContext.Provider value={{
    currentTheme,
    toggleTheme,
  }}>
    {props.children}
  </ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

export default ThemeProvider;