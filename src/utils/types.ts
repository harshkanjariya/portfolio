export interface Path {
  value: string;
  label: string;
}


export interface FolderStructure {
  name?: string;
  isDir: boolean;
  isLink?: boolean;
  links?: {
    [key: string]: string;
  },
  children?: {
    [key: string]: FolderStructure
  }
}

export interface Position {
  x: number;
  y: number;
}
