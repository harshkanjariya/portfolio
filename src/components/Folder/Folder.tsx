export interface FolderProps {
  name: string,
  isDir?: boolean,
  onOpen?: () => void,
}

function Folder(props: FolderProps) {
  const Img = props.isDir ?
    <img src="/icons/folder.png" alt="folder"/> :
    <img src="/icons/file.png" alt="file"/>

  return <div className="folder" onClick={props.onOpen}>
    {Img}
    <span className="folder-name">{props.name}</span>
  </div>;
}

Folder.defaultProps = {
  isDir: true,
}

export default Folder;