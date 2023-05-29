import styles from './Windows.module.scss';
import BaseFolder from "../../components/Folder/BaseFolder";
import {useNavigate} from "react-router-dom";
import {routes} from "../../core/router";
import ContextMenu, {ContextMenuHandlers} from "../../components/CotextMenu/ContextMenu";
import React, {useRef, useState} from "react";
import InfoDialog from "../../components/InfoDialog/InfoDialog";

function Windows() {
  const navigate = useNavigate();
  const menu = useRef<ContextMenuHandlers>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function openMenu(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if (menu.current) {
      menu.current?.show({
        x: event.pageX - 5,
        y: event.pageY - 5,
      });
    }
  }

  return <div className={'full-page ' + styles.windows}>
    <ContextMenu
      ref={menu}
      options={['open', 'properties']}
      onSelect={(index) => {
        if (index == 0) {
          navigate(routes.files);
        } else if (index == 1) {
          setIsDialogOpen(true);
        }
      }}
    />
    <InfoDialog
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
    />
    <div className={styles.folderList}>
      <BaseFolder
        onContextMenu={openMenu}
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