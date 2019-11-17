import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {
  BOARD_API_CREATE_POST, BOARD_API_CREATE_POST_COMMENT, BOARD_API_DELETE_POST, BOARD_API_EDIT_POST,
  BOARD_API_GET_BOARDS_BY_ID,
  BOARD_API_GET_POSTS, BOARD_API_GET_POSTS_COMMENTS,
} from '../actions/action.boardApiMiddleware';
import {
  addBoardPostCommentsDataAction,
  addBoardPostDataAction,
  boardDataSetAction, boardPostCommentsDataSetAction,
  boardPostsDataSetAction, editBoardPostDataAction, removeBoardPostDataAction,
} from '../actions/action.boardsDataReducer';

const getBoardPosts: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === BOARD_API_GET_POSTS) {
    const boardId = action.boardId;
    (async () => {
      try {
        const url = `http://localhost:5000/api/boards/${boardId}/posts`;
        let res = await fetch(url);
        let postsData = await res.json();
        dispatch(boardPostsDataSetAction(postsData));
      } catch (e) {
        console.error('Posts Fetch Failed', e)
      }
    })();
  }
  return next(action);
};

const createBoardPost: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === BOARD_API_CREATE_POST) {
    const token = localStorage.getItem('boards-token') || '';
    const post = action.post;
    const boardId = action.boardId;
    (async () => {
      try {
        const url = `http://localhost:5000/api/boards/${boardId}/posts`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'X-Auth-Token': token,
          },
          body: post,
        });
        const postData = await res.json();
        console.log('new post Data: ', postData);
        dispatch(addBoardPostDataAction(postData));
      } catch (e) {
        console.error('Post Create Failed', e);
      }
    })();
  }
  return next(action);
};

const getBoardById: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  if (action.type === BOARD_API_GET_BOARDS_BY_ID) {
    const id = action.boardId;
    (async () => {
      try {
        const url = `http://localhost:5000/api/boards/${id}`;
        const res = await fetch(url);
        const boardsData = await res.json();
        console.log('boardsData', boardsData);
        dispatch(boardDataSetAction(boardsData));
      } catch (e) {
        console.error('Board By Id Fetch Failed', e);
      }
    })();
  }
  return next(action);
};

const deleteBoardPost: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === BOARD_API_DELETE_POST) {
    const token = localStorage.getItem('boards-token') || '';
    const postId = action.postId;
    const boardId = action.boardId;
    (async () => {
      try {
        const url = `http://localhost:5000/api/boards/${boardId}/posts/${postId}`;
        const res = await fetch(url, {
          method: 'DELETE',
          headers: {
            'X-Auth-Token': token,
          },
        });
        const postData = await res.json();
        console.log('new post Data: ', postData);
        dispatch(removeBoardPostDataAction(postId));
      } catch (e) {
        console.error('Post Delete Failed', e);
      }
    })();
  }
  return next(action);
};

const editBoardPost: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === BOARD_API_EDIT_POST) {
    const token = localStorage.getItem('boards-token') || '';
    const post = action.post;
    const boardId = action.boardId;
    const postId = post.get('_id');
    // console.log('post', post);
    console.log('boardId', boardId);
    console.log('postId', postId);
    (async () => {
      try {
        const url = `http://localhost:5000/api/boards/${boardId}/posts/${postId}`;
        const res = await fetch(url, {
          method: 'PUT',
          headers: {
            'X-Auth-Token': token,
          },
          body: post,
        });
        const postData = await res.json();
        console.log('new post Data: ', postData);
        await dispatch(editBoardPostDataAction(postData));
      } catch (e) {
        console.error('Board Create Failed', e);
      }
    })();
  }
  return next(action);
};

const createBoardPostComment: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === BOARD_API_CREATE_POST_COMMENT) {
    console.log('createBoardPostComment')
    const token = localStorage.getItem('boards-token') || '';
    const comment = action.comment;
    const postId = action.postId;
    const boardId = action.boardId;
    (async () => {
      try {
        const url = `http://localhost:5000/api/boards/${boardId}/posts/${postId}/comments`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'X-Auth-Token': token,
          },
          body: comment,
        });
        const commentData = await res.json();
        console.log('new post Data: ', commentData);
        // await dispatch(editBoardPostDataAction(postData));
        // setComments({...commentData});
        await dispatch(addBoardPostCommentsDataAction());
      } catch (e) {
        console.error('Board Create Failed', e);
      }
    })();
  }
  return next(action);
};

const getBoardPostsComments: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === BOARD_API_GET_POSTS_COMMENTS) {
    console.log('getBoardPostsComments')
    const boardId = action.boardId;
    const postId = action.postId;
    const setComments = action.setComments;
    (async () => {
      try {
        const url = `http://localhost:5000/api/boards/${boardId}/posts/${postId}/comments`;
        let res = await fetch(url);
        let commentsData = await res.json();
        console.log('commentsData', commentsData)
        setComments(commentsData);
        dispatch(boardPostCommentsDataSetAction());
      } catch (e) {
        console.error('Comments Fetch Failed', e)
      }
    })();
  }
  return next(action);
};

export const boardMiddleware = [getBoardPosts, createBoardPost, getBoardById, deleteBoardPost, editBoardPost, createBoardPostComment, getBoardPostsComments];