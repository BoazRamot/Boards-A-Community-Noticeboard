import React from 'react';
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router";

interface IProps {
  signInDialogClose: any;
  userSignInDialog: boolean;
  userAccount: string;
}

const UserLogonDialog: React.FC<IProps> = ({signInDialogClose, userAccount, userSignInDialog}) => {
  let history = useHistory();

  const handleSignIn = () => {
    localStorage.setItem('boards-app-location', history.location.pathname);
    window.location.href = `http://localhost:5000/api/auth/google`;
    signInDialogClose();
  };
  
  return (
    <div>
      <Dialog
        open={userSignInDialog}
        onClose={signInDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">PAY ATTENTION</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Sign In To Complete Your Action
          </DialogContentText>
          {/*{userAccount &&*/}
          {/*<DialogContentText>*/}
          {/*  {`Your Board Account Was Created With ${userAccount}`}*/}
          {/*</DialogContentText>*/}
          {/*}*/}
        </DialogContent>
        <DialogActions>
          <List>
            <ListItem>
              <Button
                variant="outlined"
                onClick={handleSignIn}
                color="primary"
                style={{minWidth: "300px"}}
                // disabled={userAccount !== "google"}
              >
                <img src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                Continue With Google
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="outlined"
                // onClick={handleSignIn}
                color="primary"
                style={{minWidth: "300px"}}
                // disabled={userAccount !== "facebook"}
              >
                <img src="https://img.icons8.com/color/48/000000/facebook-new.png"/>
                Continue With Facebook
              </Button>
            </ListItem>
            <ListItem style={{display: "flex", flexFlow: "column", justifyContent: "center"}}>
              OR Create New Account
            </ListItem>
            <ListItem>
              <Button
                variant="outlined"
                // onClick={handleSignIn}
                color="primary"
                style={{minWidth: "300px"}}
              >
                Sing Up
              </Button>
            </ListItem>
          </List>
        </DialogActions>
        <DialogActions>
          <Button onClick={signInDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default UserLogonDialog;
