import React from "react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {Close} from "@mui/icons-material";
import styles from './InfoDialog.module.scss';

interface InfoDialogProps {
  isOpen: boolean,
  onClose: () => void,
}

const info = require('../../assets/data/info.json');

function InfoDialog(props: InfoDialogProps) {
  const Rows = Object.keys(info).map((key, index) =>
    <tr key={index}>
      <td className={styles.td}>{key}</td>
      <td className={styles.td}>{info[key]}</td>
    </tr>
  );

  return <Dialog open={props.isOpen} onClose={props.onClose}>
    <Close
      style={{position: 'absolute', right: 20, top: 20}}
      onClick={props.onClose}
    />
    <DialogTitle>System Properties</DialogTitle>
    <DialogContent>
      <div className={styles.header}>
        <img src="https://i.stack.imgur.com/pYMmW.png?s=256&g=1" alt="profile"/>
        <div className={styles.name}>Harsh Kanjariya</div>
      </div>
      <table>
        <tbody>
        {Rows}
        </tbody>
      </table>
    </DialogContent>
  </Dialog>
}

export default InfoDialog;