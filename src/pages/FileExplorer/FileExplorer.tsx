import React, {useState} from 'react';
import styles from './FileExplorer.module.scss';
import Folder from '../../components/Folder/Folder';
import PathView from '../../components/PathView/PathView';
import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import {ChevronLeft, Close} from '@mui/icons-material';
import {FileInfo, FolderStructure, Path} from '../../utils/types';
import genericFs from '../../assets/data/fs.json';
import {getCurrentFolder} from '../../utils/functions';

const fs: FolderStructure = {
  isDir: true,
  children: genericFs,
};

function FileExplorer() {
  const [path, setPath] = useState<Path[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({} as any);

  const navigateTo = (path: Path) => {
    setPath((prevPath) => [...prevPath, path]);
  };

  function navigateBack() {
    setPath(path.slice(0, path.length - 1));
  }

  const handlePathClick = (index: number) => {
    const newPath = path.slice(0, index + 1);
    setPath(newPath);
  };

  function handleFolderClick(
    key: string,
    data: { name?: string, isDir: boolean } & FileInfo
  ) {
    if (data.isDir) {
      navigateTo({value: key, label: data.name || key});
    } else {
      setIsDialogOpen(true);
      setDialogContent(data);
    }
  }

  const currentFolder: { [key: string]: FolderStructure } = getCurrentFolder(fs, path).children || {};

  return (
    <div className={'full-page ' + styles.fileExplorer}>
      <div className={styles.header}>
        {!path.length ? null : <ChevronLeft onClick={() => navigateBack()}/>}
        <PathView
          path={path}
          onPathClick={handlePathClick}
          className={styles.pathContainer}
        />
      </div>
      <Close
        style={{position: 'absolute', right: 20, top: 20}}
        onClick={() => window.history.back()}
      />
      <div className={styles.folderList}>
        {Object.keys(currentFolder).map((key) => {
          const data = currentFolder[key];
          return (
            <Folder
              key={key}
              name={data.name || ''}
              isDir={data.isDir}
              onOpen={() => handleFolderClick(key, data)}
            />
          );
        })}
      </div>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <Close
          style={{position: 'absolute', right: 20, top: 20}}
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
