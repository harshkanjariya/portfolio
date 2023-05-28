import {createBrowserRouter} from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome";
import FileExplorer from "../pages/FileExplorer/FileExplorer";
import Header from "../components/Header/Header";

export const routes = {
  gui: '/file-explorer',
  home: '/',
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome/>,
  },
  {
    path: routes.gui,
    element: <><Header/><FileExplorer/></>,
  }
]);