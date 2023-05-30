import React from 'react';
import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import {Close} from '@mui/icons-material';

export interface BasicDialogProps {
  isOpen: boolean,
  onClose: () => void,
  children?: any,
  title?: string,
}

function BasicDialog(props: BasicDialogProps) {
  return <Dialog open={props.isOpen} onClose={props.onClose}>
    <Close
      style={{position: 'absolute', right: 20, top: 20}}
      onClick={props.onClose}
    />
    <DialogTitle>{props.title}</DialogTitle>
    <DialogContent>
      {props.children}
    </DialogContent>
  </Dialog>;
}

export default BasicDialog;