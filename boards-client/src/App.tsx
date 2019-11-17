import {
  Box,
  createMuiTheme,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';
import './App.scss';
import Board from './components/Board';
import ErrorBoundary from './components/ErrorBoundary';
import Map from './components/GoogleMap';
import Header from './components/Header';
import Redirect from './components/Redirect';
import { saveMapDataNowAction } from './store/actions/action.mapDataMiddleware';
import { getAllUserDataAction } from './store/actions/action.userApiMiddleware';
import {setUserAccountAction, signInDialogCloseAction} from "./store/actions/action.userDataReducer";
import UserLogonDialog from "./components/UserLogonDialog";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";

interface IProps {
  signInDialogClose: any;
  getAllUserData: Function;
  saveMapDataNow: Function;
  setUserAccount: Function;
  placeListener: any;
  userSignInDialog: boolean;
  pageNotFound: boolean;
  userAccount: string;
}

const App: React.FC<IProps> = ({ 
                                 placeListener, 
                                 saveMapDataNow, 
                                 getAllUserData,
                                 userSignInDialog,
                                 signInDialogClose,
                                 setUserAccount,
                                 userAccount,
                                 pageNotFound
}) => {

  useEffect(() => {
    console.log('app up');
    window.addEventListener('beforeunload', saveOnRefresh);
    window.addEventListener('popstate', saveOnRefresh);
    const token = localStorage.getItem('boards-token');
    const account = localStorage.getItem('boards-account');
    if (token) {
      getAllUserData(token);
    }
    if (account) {
      setUserAccount(account);
    }

    return () => {
      console.log('app down');
      window.removeEventListener('beforeunload', saveOnRefresh);
      window.removeEventListener('popstate', saveOnRefresh);
      window.google.maps.event.removeListener(placeListener);
      // localStorage.removeItem('boardsMapStateLocal');
    };
    // eslint-disable-next-line
  }, []);

  const saveOnRefresh = () => {
    console.log('saveOnRefresh');
    saveMapDataNow();
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#855E42',
      },
    },
  });

  // const PageNotFound = () => 'Page not found';

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Router>
            <Header />
            <UserLogonDialog
              userSignInDialog={userSignInDialog}
              userAccount={userAccount}
              signInDialogClose={signInDialogClose}
            />
            <Box pt={pageNotFound ? 0 : 7}>
              <Switch>
                <Route path="/redirect/:id/:account" component={Redirect} />
                <Route exact path="/boards/:id" component={Board} />
                {/*<Route path="/boards/:id/posts/:postId" component={PostForm} />*/}
                {/*<Route path="/users/:id" component={User} />*/}
                <Route exact path="/map" component={Map} />
                <Route exact path="/" component={Home} />
                <Route path="/" component={PageNotFound} />
                {/*<Route render={PageNotFound} />*/}
              </Switch>
            </Box>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  placeListener: state.googleMap.placeListener,
  userSignInDialog: state.user.userSignInDialog,
  userAccount: state.user.userAccount,
  pageNotFound: state.user.pageNotFound,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signInDialogClose: () => dispatch(signInDialogCloseAction()),
  saveMapDataNow: () => dispatch(saveMapDataNowAction()),
  getAllUserData: (token: any) => dispatch(getAllUserDataAction(token)),
  setUserAccount: (account: any) => dispatch(setUserAccountAction(account)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
