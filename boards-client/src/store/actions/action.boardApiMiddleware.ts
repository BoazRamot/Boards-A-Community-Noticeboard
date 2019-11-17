// action types

export const BOARD_API_GET_POSTS = 'BOARD_API_GET_POSTS';
export const BOARD_API_CREATE_POST = 'BOARD_API_CREATE_POST';
export const BOARD_API_GET_BOARDS_BY_ID = 'BOARD_API_GET_BOARDS_BY_ID';
export const BOARD_API_DELETE_POST = 'BOARD_API_DELETE_POST';
export const BOARD_API_EDIT_POST = 'BOARD_API_EDIT_POST';
export const BOARD_API_CREATE_POST_COMMENT = 'BOARD_API_CREATE_POST_COMMENT';
export const BOARD_API_GET_POSTS_COMMENTS = 'BOARD_API_GET_POSTS_COMMENTS';

// action creators

export const getBoardPostsAction = (boardId: any) => {
  return { type: BOARD_API_GET_POSTS, boardId }
};

export const createNewPostAction = (post: any, boardId: any) => {
  return { type: BOARD_API_CREATE_POST, post, boardId };
};

export const getBoardByIdAction = (boardId: any) => {
  return { type: BOARD_API_GET_BOARDS_BY_ID, boardId }
};

export const deleteBoardPostAction = (postId: any, boardId: any) => {
  return { type: BOARD_API_DELETE_POST, postId, boardId };
};

export const editBoardPostAction = (post: any, boardId: any) => {
  return { type: BOARD_API_EDIT_POST, post, boardId };
};

export const createBoardPostCommentAction = (comment: any, postId: any, boardId: any) => {
  return { type: BOARD_API_CREATE_POST_COMMENT, comment, postId, boardId };
};

export const getBoardPostsCommentsAction = (setComments: any, postId: any, boardId: any) => {
  return { type: BOARD_API_GET_POSTS_COMMENTS, setComments, postId, boardId };
};