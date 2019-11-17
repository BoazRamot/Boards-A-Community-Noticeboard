import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemText,
  useTheme,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { ReactEventHandler, useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Dispatch } from 'redux';
import boardImg from '../../boardImg.jpg';
import { boardDataSetAction } from '../../store/actions/action.boardsDataReducer';
import { createNewBoardAction } from '../../store/actions/action.mapApiMiddleware';
import { closeDrawerAction } from '../../store/actions/action.mapReducer';
import AddBoard from './AddBoard';
import AddNewBoard from './AddNewBoard';
import { boardsAtThisLocation, boardsCloseToThisLocation } from './boardsList';
import useStyles from './GoogleMapService/useStyles';
import boardBackground from "../../boardBackground.jpg";
import Typography from "@material-ui/core/Typography";

interface IProps {
  markersMap: any; // todo: type
  mapBoards: any; // todo: type
  board: any; // todo: type
  latLng: any; // todo: type
  markerLatLng: any; // todo: type
  closeDrawer: ReactEventHandler;
  createNewBoard: any; // todo: type
  address: string;
  isOpen: boolean;
  isLogin: boolean;
  redirect: boolean;
  boardDataSet: Function;
}

const MapResultDrawer: React.FC<IProps> = ({
  boardDataSet,
  markersMap,
  board,
  redirect,
  markerLatLng,
  createNewBoard,
  mapBoards,
  latLng,
  address,
  isOpen,
  closeDrawer,
  isLogin,
}) => {
  const [openNewBoard, setOpenNewBoard] = useState(false);
  const [newBoardCreated, setNewBoardCreated] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleNewBoardOpen = () => {
    setOpenNewBoard(true);
  };

  const handleNewBoardClose = () => {
    setOpenNewBoard(false);
  };

  const handleNewBoardCreatedOpen = () => {
    setNewBoardCreated(true);
  };

  const handleNewBoardCreatedClose = () => {
    setNewBoardCreated(false);
  };

  // const handleGoToBoard = () => {
  //   handleNewBoardCreatedClose();
  // };

  return (
    <div className={classes.root}>
      {newBoardCreated && (
        <Dialog
          open={newBoardCreated}
          onClose={handleNewBoardCreatedClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            New Board Community Created
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Congratulations You Have Created New Board Community:
              {board.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <RouterLink to={`/boards/${board._id}`}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNewBoardCreatedClose}
              >
                Go To Board Now!
              </Button>
            </RouterLink>
            <Button onClick={handleNewBoardCreatedClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {openNewBoard && (
        <AddNewBoard
          createNewBoard={createNewBoard}
          latLng={latLng}
          handleNewBoardClose={handleNewBoardClose}
          openNewBoard={openNewBoard}
          address={address}
          handleNewBoardCreatedOpen={handleNewBoardCreatedOpen}
        />
      )}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isOpen}
        classes={{ paper: classes.drawerPaper }}
      >
        <div
          className={classes.drawerRoot}
          style={{ backgroundImage: `url(${boardBackground})` }}
          // backgroundImage: `url(${boardBackground})`,
        >
          <AppBar
            position="static"
            color="default"
            className={classes.drawerHeader}
          >
            <h3>{address}</h3>
            <IconButton onClick={closeDrawer}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </AppBar>
          <div className={classes.drawerHeaderButton} style={{ flexShrink: 0 }}>
            {isLogin && <AddBoard handleNewBoardOpen={handleNewBoardOpen} />}
          </div>
          <Grid
            container
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }}
          >
            <Grid
              item
              style={{
                backgroundColor: 'default',
                flexGrow: 1,
                overflow: 'auto' /*minHeight: 'calc(100%)'*/,
              }}
            >
              <Box m={2}>
                <ListItemText
                  style={{color: 'white'}}
                  secondary={
                    <Typography>
                      Boards Community at this location:
                    </Typography>
                  }
                />
                <List>
                  {boardsAtThisLocation(
                    mapBoards,
                    redirect ? markerLatLng : latLng,
                    markersMap,
                    boardDataSet,
                  )}
                  {/*{boardsAtThisLocation(mapBoards, latLng, markersMap, boardDataSet)}*/}
                </List>
                <br />
                <ListItemText
                  style={{color: 'white'}}
                  secondary={
                    <Typography>
                      Boards Community close to this location:
                    </Typography>
                  }
                />
                <List>
                  {boardsCloseToThisLocation(
                    mapBoards,
                    redirect ? markerLatLng : latLng,
                    markersMap,
                    boardDataSet,
                  )}
                  {/*{boardsCloseToThisLocation(mapBoards, latLng, markersMap, boardDataSet)}*/}
                </List>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  mapBoards: state.mapBoards.mapBoards,
  board: state.mapBoards.board,
  latLng: state.map.latLng,
  markerLatLng: state.map.markerLatLng,
  address: state.map.address,
  isOpen: state.map.open,
  redirect: state.map.redirect,
  isLogin: state.user.userLogin,
  markersMap: state.googleMap.markersMap,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeDrawer: () => dispatch(closeDrawerAction()),
  createNewBoard: (board: any) => dispatch(createNewBoardAction(board)),
  boardDataSet: (board: any) => dispatch(boardDataSetAction(board)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapResultDrawer);
