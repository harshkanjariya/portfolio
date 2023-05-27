import React from "react";
import {DarkMode, LightMode} from "@mui/icons-material";
import styles from './ThemeButton.module.css';
import {getCurrentTheme, toggleDarkTheme} from "../../utils/ui";
import {themes} from "../../utils/constants";

function ThemeButton() {
  const currentTheme = getCurrentTheme();

  return <div className={styles.themeButton}>
    <input type="checkbox"
           onChange={toggleDarkTheme}
           defaultChecked={currentTheme == themes.dark}
           className={styles.checkbox}
           id="checkbox"/>
    <label htmlFor="checkbox" className={styles.label}>
      <DarkMode className={styles.moon}/>
      <LightMode className={styles.sun}/>
      <span className={styles.ball}/>
    </label>
  </div>;
}

export default ThemeButton;