import {useState} from "react";
import {FolderStructure, Path} from "./types";
import {useNavigate} from "react-router-dom";
import {routes} from "../core/router";

const commandManuel: any = {
  help: {
    description: 'To print command help menu'
  },
  ls: {
    description: 'Used to list files in current folder',
  },
  cd: {
    description: 'Used to move through file system',
  },
  clear: {
    description: 'Clear output screen'
  },
  open: {
    description: 'Open file or execute special files',
  }
};

const tab = '&nbsp;&nbsp;&nbsp;&nbsp;';

const genericFs = require('../assets/data/fs.json');
const terminalFs = require('../assets/data/terminal.json');
const fs = {
  ...genericFs,
  ...terminalFs,
}

export function useCli() {
  const [currentPath, setCurrentPath] = useState([] as Path[]);
  const [stdout, setStdout] = useState([] as string[]);
  const navigate = useNavigate();

  function helpMenu() {
    let s = '<table>';
    for (const c of Object.keys(commandManuel)) {
      s += '<tr>';
      s += `<td>${tab + c}</td>`;
      s += `<td>${tab + commandManuel[c].description}</td>`;
      s += '</tr>';
    }
    s += '</table>';
    return s;
  }

  function getFolderList() {
    const currentFolder = getCurrentFolder();
    let list = '';
    for (const o of Object.keys(currentFolder)) {
      const className = currentFolder[o].isDir ? 'folder-color' : '';
      list += `<span class="${className}">${o}</span><br/>`;
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
    const [command, ...args] = fullCommand.trim().split(/\s+/g);
    if (!commandManuel[command]) {
      return `Invalid command: ${command} <br/><br/>
            Here are some basic commands: <br/>
            ${helpMenu()} <br />`;
    } else {
      switch (command) {
        case 'ls':
          return getFolderList();
        case 'help':
          return `
            Basic commands supported to this terminal :<br />
            <br />${helpMenu()} <br />
          `;
        case 'cd':
          if (args[0] == '..') {
            currentPath.splice(currentPath.length - 1, 1);
            setCurrentPath([...currentPath]);
            return 200;
          }
          const currentFolder = getCurrentFolder();
          if (!currentFolder[args[0]] || !currentFolder[args[0]].isDir) {
            return `Folder not found, Name: ${args[0]}`;
          } else {
            setCurrentPath([...currentPath, {
              value: args[0],
              label: args[0],
            }]);
            return 200;
          }
        case 'open':
          if (args[0] == 'windows') {
            navigate(routes.windows);
          }
          return 200;
        case 'clear':
          setStdout([]);
      }
    }
  }

  function getCurrentPrompt() {
    let s;
    if (!currentPath.length) {
      s = '/ >';
    } else {
      s = currentPath.map((v, i) => `/ ${v.label} `).join('') + ' >'
    }
    return `<span class="primary-color">${s}</span>`;
  }

  function getCommandSuggestions(text: string) {
    if (!text.trim().length) return {
      suggestions: [],
      startIndex: -1,
    };
    const [command, ...args] = text.trim().split(/\s+/g);

    const suggestions = [];
    let startIndex = 0;
    if (!args.length) {
      startIndex = command.length;
      for (const c of Object.keys(commandManuel)) {
        if (c.startsWith(command)) {
          suggestions.push(c);
        }
      }
    } else {
      if (commandManuel[command]) {
        const query = args[0];
        startIndex = query.length;
        const currentFolder = getCurrentFolder();
        if (command == 'cd' || command == 'ls') {
          for (const c of Object.keys(currentFolder)) {
            if (currentFolder[c].isDir && c.startsWith(query)) {
              suggestions.push(c);
            }
          }
        } else if (command == 'open') {
          const currentFolder = getCurrentFolder();
          for (const c of Object.keys(currentFolder)) {
            if (!currentFolder[c].isDir && c.startsWith(query)) {
              suggestions.push(c);
            }
          }
        }
      }
    }
    return {startIndex, suggestions};
  }

  function execute(command: string) {
    const newOut = [
      getCurrentPrompt() + ' ' + command,
      ...stdout,
    ];
    const result = runCommand(command);
    if (result) {
      if (typeof result === "string") {
        newOut.unshift(result);
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
    getCommandSuggestions,
  }
}