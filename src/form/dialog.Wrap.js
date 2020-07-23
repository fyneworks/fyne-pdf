import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useEffect } from 'react';

import { app_name } from './dialog';
import { Form } from './form';
//import { useFyneForm } from '@fyne/ui/form';

//import { validationSchema } from './validation';

import { useSnackbar, makeNotifier } from '@fyne/ui/notify';

export const DialogWrap = ({startOpen = true, container, ...props}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [ isOpen, setOpen ] = React.useState(startOpen);
  const [ isBusy, setBusy ] = React.useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const FyneForm = Form;//const { FyneForm, state, submit, setState } = useFyneForm('dialog', { Form,
  //  submit: (props)=> {
  //    console.log('Dialog useFyneForm submit', {state,props}); //{state, valid, args:{values, isValid, errors, setErrors}});
  //    handleSubmit(state); //{values, isValid, errors})
  //    
  //  }, 
  //  cancel: (props)=> {
  //    console.log('Dialog useFyneForm cancel', {state,props}); //{state, valid, args:{values, isValid, errors}});
  //    handleCancel(state); //{values, isValid, errors})
  //    
  //  }
  //});
  
  const clickClose = ()=> {
    console.log('clickClose');
    closeDialog();
  };
  
  useEffect(()=>{
    console.log('REVIVE? install', app_name+'__revive')
    window[app_name+'__revive'] = ()=> {
      setOpen(true)
    }
  }, []);

  console.log("DialogWrap");//, {valid,data,errors,isOpen,startOpen,container,fullScreen,theme})

  return (
      <Dialog open={isOpen} scroll={"paper"} disableScrollLock container={container} fullScreen={fullScreen} onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{process.env.REACT_APP_TITLE}</DialogTitle>
        <DialogContent>
          
          <FyneForm/>

        </DialogContent>
        <DialogActions>
          <Button onClick={clickClose} color="primary"{...(!!isBusy ? {disabled:true} : {})}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}