import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/global.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {router} from "./core/router";
import {init} from "./utils/controllers";
import ThemeProvider from "./core/ThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
init();