import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { useLoadScript } from '@react-google-maps/api';
import React, {useEffect} from 'react';
import keys from '../config/keys';
import GoogleMapService from './GoogleMaps/GoogleMapService/GoogleMapService';
import {Dispatch} from "redux";
import {saveMapDataNowAction} from "../store/actions/action.mapDataMiddleware";
import {getBoardByIdAction, getBoardPostsAction} from "../store/actions/action.boardApiMiddleware";
import {resetPageNotFoundAction} from "../store/actions/action.userDataReducer";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

const libraries = ['places'];

interface IProps {
  resetPageNotFound: Function
  pageNotFound: boolean
}

const Map: React.FC<IProps> = ({pageNotFound, resetPageNotFound}) => {
  const classes = useStyles();
  const { isLoaded } = useLoadScript({
    id: 'script-loader',
    googleMapsApiKey: keys.googleMapsApiKey,
    version: 'weekly',
    libraries,
    // language: 'en',
  });

  useEffect(() => {
    if (pageNotFound) {
      resetPageNotFound();
    }
  }, []);

  return isLoaded ? (
    <GoogleMapService />
  ) : (
    <CircularProgress className={classes.progress} />
  );
};

const mapStateToProps = (state: any) => ({
  pageNotFound: state.user.pageNotFound,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPageNotFound: () => dispatch(resetPageNotFoundAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);