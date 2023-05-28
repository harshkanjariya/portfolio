import {createBrowserRouter} from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome";
import Header from "../components/Header/Header";
import Terminal from "../pages/Terminal/Terminal";
import Windows from "../pages/Windows/Windows";
import FileExplorer from "../pages/FileExplorer/FileExplorer";

export const routes = {
  windows: '/windows',
  files: '/file-explorer',
  cli: '/terminal',
  home: '/'
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome/>,
  },
  {
    path: routes.windows,
    element: <Windows/>,
  },
  {
    path: routes.files,
    element: <FileExplorer/>,
  },
  {
    path: routes.cli,
    element: <><Header/><Terminal/></>,
  }
]);