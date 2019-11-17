import React, {useEffect, useState} from 'react';
import {
  createStyles,
  Dialog, DialogActions,
  DialogTitle,
  makeStyles,
  Theme,
} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import CancelSharpIcon from '@material-ui/icons/CancelSharp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    media: {
      height: 300,
      width: 'auto',
      margin: 'auto',
      marginTop: theme.spacing(2)
    },

    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
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

interface IProps {
  openNewPost: boolean;
  handleNewPostClose: any;
  createBoardPost: Function;
  handlePostEdit: Function;
  editBoardPost: Function;
  boardId: any;
  post: any;
  userId: any;
}

const PostFormDialog: React.FC<IProps> = ({
                                            openNewPost,
                                            handleNewPostClose,
                                            createBoardPost,
                                            boardId,
                                            post,
                                            handlePostEdit,
                                            editBoardPost,
                                            userId
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  const [files, setFiles] = useState([] as File[]);
  const [filesDataURIs, setFilesDataURIs] = useState([] as any[]);
  const [postImages, setPostImages] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (post) {
      const images: any = [...post.images];
      setPostImages(images);
      setTitle(post.title);
      setContent(post.body);
    }

  }, [post]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('event.target', event.target)
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    formData.append('userId', userId);
    if (post) {
      formData.append('_id', post._id);
      editBoardPost(formData, boardId);
      handleNewPostClose();
      handlePostEdit();
    } else {
      createBoardPost(formData, boardId);
      formElement.reset();
      setTitle('');
      setContent('');
      setFilesDataURIs([]);
      handleNewPostClose();
    }
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    setTitle(element.value);
  };

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const element = event.target as HTMLTextAreaElement;
    setContent(element.value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onFileChange', event.target)
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
    console.log('filesDataURIs', filesDataURIs)
    console.log('files', files)
  };

  const handleRemoveImg = (index: number) => {
    const filesDataURIsList = [] as any[];
    const filesList = [] as File[];
    const postImagesList: any = [];
    filesDataURIs.map((item, i) => {if (i !== index) filesDataURIsList.push(item)});
    files.map((item, i) => {if (i !== index) filesList.push(item)});
    postImages.map((item, i) => {if (i !== index) postImagesList.push(item)});
    if (filesDataURIsList.length > 0 && filesList.length > 0) {
      setFilesDataURIs(filesDataURIsList);
      setFiles(filesList as File[]);
      setPostImages(postImagesList);
    } else {
      setFilesDataURIs([] as any[]);
      setFiles([] as File[]);
      setPostImages(postImagesList);
    }
  };

  const onClose = () => {
    setTitle('');
    setContent('');
    setFilesDataURIs([]);
    handleNewPostClose();
  };

  return (
    <Dialog open={openNewPost} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{post ? 'Edit Post' : 'Create New Post'}</DialogTitle>
      <form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            required
            id="outlined-name"
            label="What's on your mind?"
            className={classes.textField}
            name="title"
            value={title}
            onChange={onTitleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            required
            id="outlined-name"
            label="Can you elaborate?"
            className={classes.textField}
            name="body"
            value={content}
            onChange={onContentChange}
            margin="normal"
            variant="outlined"
            fullWidth
            multiline
            rows={"5"}
            rowsMax={"10"}
            // autoFocus={true}
            spellCheck={true}
            // useCacheForDOMMeasurements={true}
          />
          {filesDataURIs.length > 0 &&
          <GridList className={classes.gridList} cols={4}>
            {filesDataURIs.map((dataURI, index) => (
              <GridListTile key={index} style={{height: "100px"}}>
                <img src={dataURI} alt={`${index}`} style={{maxWidth: "100%", height: "80px", objectFit: "cover"}}/>
                <GridListTileBar
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
          {filesDataURIs.length === 0 &&
          post &&
          post.images && postImages &&
          <GridList className={classes.gridList} cols={4}>
            {/*{{post.images.map((image: any, index: any) => (}*/}
            {postImages.map((image: any, index: any) => (
              <GridListTile key={image._id} style={{height: "100px"}}>
                <img
                  src={`http://localhost:5000/api/boards/${boardId}/posts/${post._id}/images/${image._id}/image`}
                  alt={image.description}
                  style={{maxWidth: "100%", height: "80px", objectFit: "cover"}}
                />
                <GridListTileBar
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
        </DialogContent>
        <DialogActions>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span">
              <AttachFileIcon />
            </Button>
          </label>
          <Button variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!title || (post && post.title === title && !files)}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PostFormDialog;
