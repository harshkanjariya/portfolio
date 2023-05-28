export interface BaseFolderProps {
  name: string,
  image: string,
  onOpen?: () => void,
}

function BaseFolder(props: BaseFolderProps) {
  return <div className="folder" onClick={props.onOpen}>
    <img src={props.image} alt="folder"/>
    <span className="folder-name">{props.name}</span>
  </div>;
}

export default BaseFolder;