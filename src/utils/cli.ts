import {useState} from "react";
import {FolderStructure, Path} from "./types";

const commandManuel: any = {
  ls: {
    description: 'Used to list files in current folder',
  },
  cd: {
    description: 'Used to move through file system',
  },
  clear: {
    description: 'Clear output screen'
  }
};

const tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
const fs = require('../assets/data/fs.json');

export function useCli() {
  const [currentPath, setCurrentPath] = useState([] as Path[]);
  const [stdout, setStdout] = useState([] as string[]);

  function helpMenu() {
    let s = '';
    for (const c of Object.keys(commandManuel)) {
      s += `${tab + c + tab + tab}` + commandManuel[c].description + '<br/>';
    }
    return s;
  }

  function getFolderList() {
    const currentFolder = getCurrentFolder();
    let list = '';
    for (const o of Object.keys(currentFolder)) {
      list += o + '<br/>';
    }
    return list;
  }

  const getCurrentFolder = () => {
    let currentFolder: FolderStructure = fs;
    for (let i = 0; i < currentPath.length; i++) {
      currentFolder = currentFolder[currentPath[i].value].children;
    }
    return currentFolder;
  };

  function runCommand(fullCommand: string) {
    if (!fullCommand.trim().length) return 200;
    const [command, ...args] = fullCommand.split(' ');
    if (!commandManuel[command]) {
      return `Invalid command: ${command} <br/>
            Here are some basic commands: <br/>
            ` + helpMenu();
    } else {
      switch (command) {
        case 'ls':
          return getFolderList();
        case 'cd':
          if (args[0] == '..') {
            currentPath.splice(currentPath.length - 1, 1);
            setCurrentPath([...currentPath]);
            return 200;
          }
          const currentFolder = getCurrentFolder();
          if (!currentFolder[args[0]]) {
            return `Folder not found, Name: ${args[0]}`;
          } else {
            setCurrentPath([...currentPath, {
              value: args[0],
              label: args[0],
            }]);
            return 200;
          }
        case 'clear':
          setStdout([]);
      }
    }
  }

  function getCurrentPrompt() {
    if (!currentPath.length) {
      return '/ >';
    } else {
      return currentPath.map((v, i) => `/ ${v.label} `).join('') + ' >';
    }
  }

  function execute(command: string) {
    const newOut = [...stdout];
    newOut.push(getCurrentPrompt() + ' ' + command);
    const result = runCommand(command);
    if (result) {
      if (typeof result === "string") {
        newOut.push(result);
      }
      setStdout(newOut);
    }
  }

  return {
    currentPath,
    stdout,
    setStdout,
    execute,
    getCurrentPrompt,
  }
}