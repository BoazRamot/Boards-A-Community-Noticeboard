import React, {useEffect, useState} from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  Menu,
  MenuItem,
  Theme,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';
import boardPin from "../boardPin.jpg";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActions from "@material-ui/core/CardActions";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/core/SvgIcon/SvgIcon";
import {signInDialogCloseAction, signInDialogOpenAction} from "../store/actions/action.userDataReducer";
import {getPostUserDataAction} from "../store/actions/action.userApiMiddleware";
import IUser from "../models/IUser";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import GridListTileBar from "@material-ui/core/GridListTileBar";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Media: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 'auto',
      height: 'auto',
    },
    media: {
      // height: 300,
      width: 'auto',
      margin: 'auto',
      marginTop: theme.spacing(2)
    },
    // gridList: {
    //   flexWrap: 'nowrap',
    //   // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    //   transform: 'translateZ(0)',
    // },
  })
);

interface IProps {
  post: any;
  boardId: any;
  getPostUserData: Function;
  deleteBoardPost: Function;
  handlePostEdit: Function;
  signInDialogOpen: Function;
  handleCommentsDialogOpen: any;
  user_id: string;
  userLogin: boolean;
}

const PostCard: React.FC<IProps> = ({
                                      post,
                                      boardId,
                                      deleteBoardPost,
                                      handlePostEdit,
                                      getPostUserData,
                                      user_id,
                                      userLogin,
                                      handleCommentsDialogOpen,
                                      signInDialogOpen
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<IUser>({
    _id: '',
    googleId: '',
    name: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    avatar: '',
  });
  const open = Boolean(anchorEl);
  const classes = useStyles();
  
  useEffect(() => {
    if (post.userId) {
      getPostUserData(post.userId, setUserData)
    }
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (postId: any) => {
    deleteBoardPost(postId, boardId);
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handlePostEdit(post, "post");
    setAnchorEl(null);
  };

  const handleComment = (view: boolean = false) => {
    if (userLogin || view) {
      handlePostEdit(post, "comment");
      handleCommentsDialogOpen();
    } else {
      signInDialogOpen()
    }
  };

  const handleLike = () => {

  };

  return (
    <Grid item >
      <Box mb={2} ml={1}>
        <Card style={{backgroundColor: "#FEF2F2"}}>
          <CardMedia
            className={classes.media}
            image={boardPin}
            style={{backgroundColor: "#FEF2F2", height: "60px", width: "70px"}}
          />
          <CardHeader
            avatar={<Avatar alt={userData.name} src={userData.avatar} />}
            title={userData.name}
            action={
              <IconButton aria-label="settings"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleMenu}
                          color="inherit"
                          disabled={!userLogin || user_id !== post.userId}
              >
                <MoreVertIcon style={{display: userLogin && user_id === post.userId ? '' : 'none'}}/>
              </IconButton>
            }
            subheader={
              new Date(post.createdAt)
                .toLocaleString('default', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false,
                })}
          />
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete.bind(null, post._id)}>Delete</MenuItem>
          </Menu>
          <CardContent>
            <Typography variant="h4" color="textPrimary" component="h3">
              {post.title}
            </Typography>
            <Typography variant="h5" color="textSecondary" component="p">
              {post.body}
            </Typography>
          </CardContent>
          <CardMedia className={classes.Media}>
            {post.images.length !== 0 &&
            <GridList className={classes.gridList}>
              {post.images.map((image: any) => (
                <GridListTile key={image._id} style={{ height: '100%', width: '100%'}}>
                  <img
                    src={`http://localhost:5000/api/boards/${boardId}/posts/${post._id}/images/${image._id}/image`}
                    alt={image.description}
                    style={{height: "auto", width: "100%", objectFit: "cover"}}
                  />
                </GridListTile>
              ))}
            </GridList>}
          </CardMedia>
          <CardContent>
            <List style={{display: "flex", flexFlow: "row"}}>
              <ListItem>
                <Button onClick={handleComment.bind(null, true)}>
                  <Typography variant="h5" color="textSecondary" component="p" >
                    comments {post.comments.length}
                  </Typography>
                </Button>
              </ListItem>
              <ListItem style={{display: "flex", justifyContent: "flex-end"}}>
                <Button>
                  <Typography variant="h5" color="textSecondary" component="p">
                    likes {post.likes.length}
                  </Typography>
                </Button>
              </ListItem>
            </List>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid container style={{flexGrow: 1, flexFlow: "row"}} spacing={2} >
              <Grid item xs={6}>
                <Paper style={{textAlign: 'center'}}>
                  <Button style={{width: '100%'}} onClick={handleComment.bind(null, false)}>
                    <CommentIcon/>
                    <Typography variant="h6" style={{marginLeft: "5px"}}>
                      comment
                    </Typography>
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper style={{textAlign: 'center'}}>
                  <Button style={{width: '100%'}} onClick={handleLike}>
                    <ThumbUpIcon/>
                    <Typography variant="h6" style={{marginLeft: "5px"}}>
                      like
                    </Typography>
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  )
};


const mapStateToProps = (state: any) => ({
  user_id: state.user.userData._id,
  userLogin: state.user.userLogin,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPostUserData: (userId: any, setUserData: any) => dispatch(getPostUserDataAction(userId, setUserData)),
  signInDialogOpen: () => dispatch(signInDialogOpenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);