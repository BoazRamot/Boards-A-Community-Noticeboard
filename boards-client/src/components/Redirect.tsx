import React, { useEffect } from 'react';
import { Route, RouteComponentProps, useHistory } from 'react-router-dom';
import Map from './GoogleMap';
import {Dispatch} from "redux";
import {signInDialogCloseAction} from "../store/actions/action.userDataReducer";
import {connect} from "react-redux";

interface IProps {
  signInDialogClose: any;
  userSignInDialog: boolean;
}

const Redirect: React.FC<IProps & RouteComponentProps> = ({ match, userSignInDialog, signInDialogClose }) => {
  const history = useHistory();

  useEffect(() => {
    console.log('Redirect up');
    const appLocation = localStorage.getItem('boards-app-location');
    const token = (match.params as any).id;
    const account = (match.params as any).account;
    if (token) {
      localStorage.setItem('boards-token', token);
      localStorage.setItem('boards-account', account);
    }
    if (userSignInDialog) {
      signInDialogClose();
    }
    history.push(`${appLocation}`);
    localStorage.removeItem('boards-app-location');
  });

  return (
    <div>
      <Route path="/" component={Map} />
    </div>
  );
};


const mapStateToProps = (state: any) => ({
  userSignInDialog: state.user.userSignInDialog,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signInDialogClose: () => dispatch(signInDialogCloseAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Redirect);
