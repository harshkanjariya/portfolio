import styles from './FileExplorer.module.scss';
import Folder, {FolderProps} from "../../components/Folder/Folder";
import {useState} from "react";
import PathView from "../../components/PathView/PathView";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import { Close } from '@mui/icons-material';
import {useTheme} from "../../core/ThemeProvider";

interface FileInfo {
  details?: {
    github: string;
    preview: string;
    description: string;
  };
}

interface FolderStructure {
  [key: string]: FolderProps & { children: FolderStructure } & FileInfo;
}

const fs: FolderStructure = require('../../assets/data/fs.json');

export interface Path {
  value: string;
  label: string;
}

function FileExplorer() {
  const {currentTheme} = useTheme();
  const [path, setPath] = useState<Path[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({} as any);

  const navigateTo = (path: Path) => {
    setPath((prevPath) => [...prevPath, path]);
  };

  const handlePathClick = (index: number) => {
    const newPath = path.slice(0, index + 1);
    setPath(newPath);
  };

  const getCurrentFolder = () => {
    let currentFolder: FolderStructure = fs;
    for (let i = 0; i < path.length; i++) {
      currentFolder = currentFolder[path[i].value].children;
    }
    return currentFolder;
  };

  function handleFolderClick(key: string, data: FolderProps & FileInfo) {
    if (data.isDir) {
      navigateTo({value: key, label: data.name})
    } else {
      setIsDialogOpen(true);
      setDialogContent(data);
    }
  }

  const currentFolder: FolderStructure = getCurrentFolder();

  return (
    <div className={'full-page ' + styles.fileExplorer}>
      <PathView
        path={path}
        onPathClick={handlePathClick}
        className={styles.pathContainer}
      />
      <Close
        style={{ position: 'absolute', right: 20, top: 20 }}
        onClick={() => window.history.back()}
      />
      <div className={styles.folderList}>
        {Object.keys(currentFolder).map((key) => {
          const data = currentFolder[key];
          return (
            <Folder
              key={key}
              name={data.name}
              isDir={data.isDir}
              onOpen={() => handleFolderClick(key, data)}
            />
          );
        })}
      </div>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <Close
          style={{ position: 'absolute', right: 20, top: 20 }}
          onClick={() => setIsDialogOpen(false)}
        />
        <DialogTitle>File Details</DialogTitle>
        <DialogContent>
          <pre>{JSON.stringify(dialogContent)}</pre>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FileExplorer;
