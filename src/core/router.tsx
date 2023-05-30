import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Welcome from '../pages/Welcome/Welcome';
import Header from '../components/Header/Header';
import Terminal from '../pages/Terminal/Terminal';
import Windows from '../pages/Windows/Windows';
import FileExplorer from '../pages/FileExplorer/FileExplorer';
import Settings from '../pages/Settings/Settings';
import Contact from '../pages/Contact/Contact';

export const routes = {
  windows: '/windows',
  files: '/file-explorer',
  terminal: '/terminal',
  home: '/',
  settings: '/settings',
  contact: '/contact',
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
    path: routes.terminal,
    element: <><Header/><Terminal/></>,
  },
  {
    path: routes.settings,
    element: <><Header/><Settings/></>,
  },
  {
    path: routes.contact,
    element: <><Header/><Contact/></>,
  }
]);