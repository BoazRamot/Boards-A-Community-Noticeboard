import React, {useEffect} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {RouteComponentProps, useHistory} from 'react-router-dom';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import boardBackground from "../boardBackground.jpg";
import {saveMapDataNowAction} from "../store/actions/action.mapDataMiddleware";
import BoardDetails from './BoardDetails';
import BoardFeed from './BoardFeed';
import Loading from './Loading';
import { getBoardByIdAction, getBoardPostsAction } from '../store/actions/action.boardApiMiddleware';
import {resetPageNotFoundAction} from "../store/actions/action.userDataReducer";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      height: '100%',
      backgroundImage: `url(${boardBackground})`,
      backgroundSize: "cover",
      // paddingBottom: "30vh",
      paddingBottom: "40%",

    },
  }),
);

interface IProps {
  board: any
  resetPageNotFound: Function
  saveMapDataNow: Function
  getBoardPosts: Function
  getBoardById: Function
  pageNotFound: boolean
}

const Board: React.FC<IProps & RouteComponentProps> = ({
                                                         match,
                                                         board,
                                                         saveMapDataNow,
                                                         getBoardPosts,
                                                         getBoardById,
                                                         pageNotFound,
                                                         resetPageNotFound
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (pageNotFound) {
      resetPageNotFound();
    }
    const boardId = (match.params as any).id;
    if (boardId.length !== 24) {
      return;
    }
    // 5dc2a9cb01cb7805a8a2b579
    (async () => {
      if (Object.entries(board).length === 0 && board.constructor === Object) {
        await getBoardById(boardId);
      }
      await getBoardPosts(boardId);
    })();
    // eslint-disable-next-line
  }, []);

  if (Object.entries(board).length === 0 && board.constructor === Object) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Box mt={2}>
        <Grid container spacing={1} >
          <BoardDetails board={board} saveMapDataNow={saveMapDataNow} />
          <BoardFeed/>
        </Grid>
      </Box>
    </div>
  )
};

const mapStateToProps = (state: any) => ({
  board: state.mapBoards.board,
  pageNotFound: state.user.pageNotFound,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveMapDataNow: () => dispatch(saveMapDataNowAction(true)),
  getBoardPosts: (boardId: any) => dispatch(getBoardPostsAction(boardId)),
  getBoardById: (boardId: any) => dispatch(getBoardByIdAction(boardId)),
  resetPageNotFound: () => dispatch(resetPageNotFoundAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);