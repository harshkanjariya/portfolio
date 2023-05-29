import React from "react";

export interface BaseFolderProps {
  name: string,
  image: string,
  onOpen?: () => void,
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void,
}

function BaseFolder(props: BaseFolderProps) {
  return <div
    className="folder"
    onClick={props.onOpen}
    onContextMenu={props.onContextMenu}
  >
    <img src={props.image} alt="folder"/>
    <span className="folder-name">{props.name}</span>
  </div>;
}

export default BaseFolder;