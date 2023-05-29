import {FolderProps} from "../components/Folder/Folder";

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

export interface FolderStructure {
  [key: string]: FolderProps & { children: FolderStructure } & FileInfo;
}

export interface Position {
  x: number;
  y: number;
}
