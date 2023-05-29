import styles from './Windows.module.scss';
import BaseFolder from "../../components/Folder/BaseFolder";
import {useNavigate} from "react-router-dom";
import {routes} from "../../core/router";

function Windows() {
  const navigate = useNavigate();
  return <div className={'full-page ' + styles.windows}>
    <div className={styles.folderList}>
      <BaseFolder
        name={'My Life'}
        image={'/icons/this-pc.png'}
        onOpen={() => navigate(routes.files)}
      />
      <BaseFolder
        name={'Trashed Things'}
        image={'/icons/recycle-bin.png'}
        onOpen={() => navigate(routes.files)}
      />
      <BaseFolder
        name={'Settings'}
        image={'/icons/settings.png'}
        onOpen={() => navigate(routes.settings)}
      />
      <BaseFolder
        name={'Contact'}
        image={'/icons/email.png'}
        onOpen={() => navigate(routes.contact)}
      />
      <BaseFolder
        name={'Terminal'}
        image={'/icons/terminal.png'}
        onOpen={() => navigate(routes.terminal)}
      />
    </div>
  </div>
}

export default Windows;