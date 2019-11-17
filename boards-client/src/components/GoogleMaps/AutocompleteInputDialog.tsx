import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';

interface IProps {
  openAutocompleteInputDialog: any;
  handleAutocompleteInputDialogClose: any;
}

const AutocompleteInputDialog: React.FC<IProps> = ({
  openAutocompleteInputDialog,
  handleAutocompleteInputDialogClose,
}) => {
  return (
    <div>
      <Dialog
        open={openAutocompleteInputDialog}
        onClose={handleAutocompleteInputDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">PAY ATTENTION</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Choose Location From The Drop Down List
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAutocompleteInputDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AutocompleteInputDialog;
