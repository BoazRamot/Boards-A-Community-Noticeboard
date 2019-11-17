import React, {useEffect, useState} from 'react';
import Loading from './Loading';
import PostList from './PostList';
import { createStyles, Grid, makeStyles, Theme,} from '@material-ui/core';
import PostInput from './PostInput';
import PostFormDialog from './PostFormDialog';
import { Dispatch } from 'redux';
import {
  createBoardPostCommentAction,
  createNewPostAction,
  deleteBoardPostAction,
  editBoardPostAction, getBoardPostsAction, getBoardPostsCommentsAction,
} from '../store/actions/action.boardApiMiddleware';
import { connect } from 'react-redux';
import {signInDialogOpenAction} from "../store/actions/action.userDataReducer";
import CommentsDialog from "./CommentsDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boardFeed: {
      height: 'calc(100%)',
      display: "flex",
      flexDirection: "column",
      width: "70vw",
    },
  })
);

interface IProps {
  // board: IBoard;
  board: any;
  posts: any;
  signInDialogOpen: Function;
  createBoardPost: Function;
  deleteBoardPost: Function;
  editBoardPost: Function;
  getBoardPosts: Function;
  getPosts: boolean;
  getComments: boolean;
  userLogin: boolean;
  userId: any;
  userAvatar: string;
  userName: string;
  createBoardPostComment: Function;
  getBoardPostsComments: Function;
}

const BoardFeed: React.FC<IProps> = ({
                                       createBoardPost,
                                       board,
                                       posts,
                                       deleteBoardPost,
                                       editBoardPost,
                                       getBoardPosts,
                                       getPosts,
                                       userLogin,
                                       signInDialogOpen,
                                       userId,
                                       userName,
                                       userAvatar,
                                       createBoardPostComment,
                                       getBoardPostsComments,
                                       getComments
}) => {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [post, setPost] = useState(null);
  const [openCommentsDialog, setOpenCommentsDialog] = React.useState(false);
  const [target, setTarget] = React.useState('');
  const [comments, setComments] = useState([]);
  const classes = useStyles();
  
  useEffect(() => {
    if (getPosts) {
      getBoardPosts(board._id);
    }
  }, [getPosts]);

  // useEffect(() => {
  //   if (post && target === "post") {
  //     handleNewPostOpen();
  //   }
  // }, [post]);

  const handleCommentsDialogOpen = () => {
    setOpenCommentsDialog(true);
  };

  const handleCommentsDialogClose = () => {
    setOpenCommentsDialog(false);
  };

  const handlePostEdit = (post: any = null, targetString: string = '') => {
    switch (targetString) {
      case "post":
        handleNewPostOpen();
        break;
      case "comment":
        getBoardPostsComments(setComments, post._id, board.id);
        break;
    }
    setTarget(target);
    setPost(post);
  };
  
  const handleNewPostOpen = () => {
    console.log('handleNewPostOpen');
    console.log('userLogin', userLogin);
    if (userLogin) {
      setOpenNewPost(true);
    } else {
      signInDialogOpen();
    }
  };

  const handleNewPostClose = () => {
    handlePostEdit();
    setOpenNewPost(false);
  };

  // if (!posts) {
  //   return <Loading />;
  // }

  // if (posts.length === 0) {
  //   return <Loading />;
  // }

  return (
    <Grid item xs={12} sm>
      <div className={classes.boardFeed}>
        <CommentsDialog
          openCommentsDialog={openCommentsDialog}
          handleCommentsDialogClose={handleCommentsDialogClose}
          userAvatar={userAvatar}
          userName={userName}
          userId={userId}
          post={post}
          createBoardPostComment={createBoardPostComment}
          getBoardPostsComments={getBoardPostsComments}
          getComments={getComments}
          // boardId={board._id}
          boardId={board.id}
          comments={comments}
          setComments={setComments}
          userLogin={userLogin}
        />
        <PostFormDialog
          boardId={board._id}
          createBoardPost={createBoardPost}
          openNewPost={openNewPost}
          handleNewPostClose={handleNewPostClose}
          post={post}
          handlePostEdit={handlePostEdit}
          editBoardPost={editBoardPost}
          userId={userId}
        />
        <Grid container style={{flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0}}>
          <PostInput handleNewPostOpen={handleNewPostOpen}/>
          <PostList
            posts={posts}
            boardId={board._id}
            deleteBoardPost={deleteBoardPost}
            handlePostEdit={handlePostEdit}
            handleCommentsDialogOpen={handleCommentsDialogOpen}
          />
        </Grid>
      </div>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  board: state.mapBoards.board,
  posts: state.mapBoards.posts,
  getPosts: state.mapBoards.getPosts,
  getComments: state.mapBoards.getComments,
  userLogin: state.user.userLogin,
  userId: state.user.userData._id,
  userAvatar: state.user.userData.avatar,
  userName: state.user.userData.name,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createBoardPost: (post: any, boardId: any) => dispatch(createNewPostAction(post, boardId)),
  deleteBoardPost: (postId: any, boardId: any) => dispatch(deleteBoardPostAction(postId, boardId)),
  editBoardPost: (post: any, boardId: any) => dispatch(editBoardPostAction(post, boardId)),
  getBoardPosts: (boardId: any) => dispatch(getBoardPostsAction(boardId)),
  signInDialogOpen: () => dispatch(signInDialogOpenAction()),
  createBoardPostComment: (comment: any, postId: any, boardId: any) => dispatch(createBoardPostCommentAction(comment, postId, boardId)),
  getBoardPostsComments: (setComments: any, postId: any, boardId: any) => dispatch(getBoardPostsCommentsAction(setComments, postId, boardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardFeed);
