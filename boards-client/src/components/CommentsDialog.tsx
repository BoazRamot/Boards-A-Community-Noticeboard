import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {Paper, TextField} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import CommentList from "./CommentList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    paper: {
      paddingBottom: "100vh",
    },
    appBarBottom: {
      top: 'auto',
      bottom: 0,
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    media: {
      height: 300,
      width: 'auto',
      margin: 'auto',
      marginTop: theme.spacing(2)
    },

    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    titleGrid: {
      color: '#FF3333',
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }),
);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  getComments: boolean;
  openCommentsDialog: boolean;
  handleCommentsDialogClose: any;
  boardId: string;
  userAvatar: string;
  userName: string;
  userId: string;
  post: any;
  createBoardPostComment: Function;
  getBoardPostsComments: Function;
  comments: any;
  setComments: any;
  userLogin: boolean;
}

const CommentsDialog: React.FC<IProps> = ({ 
                                            openCommentsDialog,
                                            handleCommentsDialogClose,
                                            userAvatar,
                                            userName,
                                            userId,
                                            post,
                                            getBoardPostsComments,
                                            createBoardPostComment,
                                            getComments,
                                            boardId,
                                            comments,
                                            setComments,
                                            userLogin
}) => {
  const [body, setBody] = useState<string>('');
  const [files, setFiles] = useState([] as File[]);
  const [filesDataURIs, setFilesDataURIs] = useState([] as any[]);

  const classes = useStyles();
  
  useEffect(() => {
    if (post) {
      getBoardPostsComments(setComments, post._id, boardId);
    }
  }, [getComments]);

  const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    setBody(element.value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      // convert to data URI for preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (e && e.target && e.target.result) {
          setFilesDataURIs([...filesDataURIs, e.target.result]);
        }
        setFiles([...(files || []), ...(element.files as FileList)]);
      };
      Object.values(element.files).forEach(file => {
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImg = (index: number) => {
    const filesDataURIsList = [] as any[];
    const filesList = [] as File[];
    filesDataURIs.map((item, i) => {if (i !== index) filesDataURIsList.push(item)});
    files.map((item, i) => {if (i !== index) filesList.push(item)});
    if (filesDataURIsList.length > 0 && filesList.length > 0) {
      setFilesDataURIs(filesDataURIsList);
      setFiles(filesList as File[]);
    } else {
      setFilesDataURIs([] as any[]);
      setFiles([] as File[]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    formData.append('userId', userId);
    console.log(formData.forEach((k, v) => console.log(k, v)));
    // if (post) {
    //   formData.append('_id', post._id);
    //   editBoardPost(formData, boardId);
    //   handleNewPostClose();
    //   handlePostEdit();
    // } else {

      createBoardPostComment(formData, post._id, boardId);
      formElement.reset();
      setBody('');
      setFilesDataURIs([] as any[]);
      setFiles([] as File[]);
    // }
  };

  return (
    <Dialog fullScreen open={openCommentsDialog} onClose={handleCommentsDialogClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleCommentsDialogClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Close Comments
          </Typography>
        </Toolbar>
      </AppBar>
      {post &&
      <Paper square className={classes.paper}>
        <List className={classes.list}>
          <CommentList comments={comments} postId={post._id}/>
        </List>
      </Paper>}
      {userLogin &&
      <form autoComplete="off" onSubmit={handleSubmit}>
        <AppBar position="fixed" color="default" className={classes.appBarBottom}>
          <Toolbar>
            <Avatar alt={userName} src={userAvatar} style={{marginRight: "15px"}}/>
            {/*<form autoComplete="off" onSubmit={handleSubmit} style={{display: 'flex', flexFlow: "row"}}>*/}
            <TextField
              label="Write Your Comment..."
              value={body}
              name="body"
              onChange={onCommentChange}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              rowsMax="4"
            />
            <div className={classes.grow} />
            <label htmlFor="raised-button-file">
              <Button component="span">
                <AttachFileIcon />
              </Button>
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={onFileChange}
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
            />
            <IconButton edge="end" color="inherit" disabled={!body} type="submit">
              <SendIcon />
            </IconButton>
            {/*</form>*/}
          </Toolbar>
          {filesDataURIs.length > 0 &&
          <GridList className={classes.gridList} cols={4}>
            {filesDataURIs.map((dataURI, index) => (
              <GridListTile key={index} style={{height: "100px"}}>
                <img src={dataURI} alt={`${index}`} style={{maxWidth: "100%", height: "80px", objectFit: "cover"}}/>
                <GridListTileBar
                  // title={index}
                  classes={{
                    root: classes.titleBar,
                    title: classes.titleGrid,
                  }}
                  actionIcon={
                    <IconButton aria-label={`star ${index}`} onClick={handleRemoveImg.bind(null, index)}>
                      <CancelSharpIcon className={classes.titleGrid}/>
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>}
        </AppBar>
      </form>}
    </Dialog>
  );
};

export default CommentsDialog;