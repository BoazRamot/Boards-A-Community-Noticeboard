import React, {useEffect, useState} from 'react';
import {ListItem} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IUser from "../models/IUser";
import {Dispatch} from "redux";
import {getPostUserDataAction} from "../store/actions/action.userApiMiddleware";
import {connect} from "react-redux";
import Comment from "./Comment"

interface IProps {
  comments: any;
  boardId: any;
  postId: any;
  // user_id: string;
  // userLogin: boolean;
  getPostUserData: Function;
}

const CommentList: React.FC<IProps> = ({ comments, boardId, postId, getPostUserData }) => {

  return (
    <div>
      {console.log('comments', comments)}
      {Object.values(comments)
        .reverse()
        .map((comment: any) => (
          <Comment
            key={comment._id}
            comment={comment}
            getPostUserData={getPostUserData}
            boardId={boardId}
            postId={postId}
          />
        ))}
    </div>
  )
};

const mapStateToProps = (state: any) => ({
  boardId: state.mapBoards.board.id,
  // user_id: state.user.userData._id,
  // userLogin: state.user.userLogin,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPostUserData: (userId: any, setUserData: any) => dispatch(getPostUserDataAction(userId, setUserData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);