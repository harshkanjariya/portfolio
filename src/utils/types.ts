import {FolderProps} from '../components/Folder/Folder';

export interface Path {
  value: string;
  label: string;
}


export interface FileInfo {
  details?: {
    github: string;
    preview: string;
    description: string;
  };
}

export interface FolderStructure extends FileInfo {
  name?: string;
  isDir: boolean;
  children?: {
    [key: string]: FolderStructure
  }
}

export interface Position {
  x: number;
  y: number;
}
