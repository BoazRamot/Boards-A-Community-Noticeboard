import React, {useEffect, useState} from 'react';
import {createStyles, ListItem, makeStyles, Theme} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IUser from "../models/IUser";
import {Dispatch} from "redux";
import {getPostUserDataAction} from "../store/actions/action.userApiMiddleware";
import {connect} from "react-redux";
import CardMedia from "@material-ui/core/CardMedia";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import CancelSharpIcon from "@material-ui/core/SvgIcon/SvgIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Media: {
      display: 'flex',
      flexWrap: 'wrap',
      // justifyContent: 'space-around',
      overflow: 'hidden',
      // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 'auto',
      height: 'auto',
    },
    // gridList: {
    //   flexWrap: 'nowrap',
    //   // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    //   transform: 'translateZ(0)',
    // },
  }),
);

interface IProps {
  comment: any;
  boardId: any;
  postId: any;
  // user_id: string;
  // userLogin: boolean;
  getPostUserData: Function;
}

const Comment: React.FC<IProps> = ({ comment, boardId, postId, getPostUserData }) => {
  const [userData, setUserData] = useState<IUser>({
    _id: '',
    googleId: '',
    name: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    avatar: '',
  });

  const classes = useStyles();

  useEffect(() => {
    getPostUserData(comment.userId, setUserData)
  }, []);

  return (
    <div>
      <ListItem button divider={comment.images.length === 0}>
        <ListItemAvatar>
          <Avatar alt={userData.name} src={userData.avatar} />
        </ListItemAvatar>
        <ListItemText primary={comment.body}/>
      </ListItem>
      {comment.images.length > 0 &&
      <ListItem button divider className={classes.Media}>
        <GridList className={classes.gridList} cols={1}>
          {comment.images.map((image: any) => (
            <GridListTile key={image._id} style={{height: "50px"}}>
              <img
                src={`http://localhost:5000/api/boards/${boardId}/posts/${postId}/comments/${comment._id}/images/${image._id}/image`}
                alt={image.description}
                style={{maxWidth: "100%", height: "40px", objectFit: "cover"}}/>
            </GridListTile>
          ))}
        </GridList>
      </ListItem>}
    </div>
  )
};

export default Comment;