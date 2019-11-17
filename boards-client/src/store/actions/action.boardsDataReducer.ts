// action types

export const MAP_BOARDS_DATA_SET = 'MAP_BOARDS_DATA_SET';
export const RESET_MAP_BOARDS_DATA = 'RESET_MAP_BOARDS_DATA';
export const BOARD_POSTS_DATA_SET = 'BOARD_POSTS_DATA_SET';
export const ADD_MAP_BOARD_DATA = 'ADD_MAP_BOARD_DATA';
export const BOARD_DATA_SET = 'BOARD_DATA_SET';
export const ADD_BOARD_POST_DATA = 'ADD_BOARD_POST_DATA';
export const REMOVE_BOARD_POST_BY_ID = 'REMOVE_BOARD_POST_BY_ID';
export const EDIT_BOARD_POST_BY_ID = 'EDIT_BOARD_POST_BY_ID';
export const BOARD_POSTS_COMMENTS_DATA_SET = 'BOARD_POSTS_COMMENTS_DATA_SET';
export const ADD_BOARD_POSTS_COMMENTS_DATA = 'ADD_BOARD_POSTS_COMMENTS_DATA';

// action creators

export const mapBoardsDataSetAction = (payload: any) => {
  return { type: MAP_BOARDS_DATA_SET, payload };
};

export const addMapBoardDataAction = (payload: any) => {
  return { type: ADD_MAP_BOARD_DATA, payload };
};

export const resetMapBoardsDataAction = () => {
  return { type: RESET_MAP_BOARDS_DATA };
};

export const boardPostsDataSetAction = (payload: any) => {
  return { type: BOARD_POSTS_DATA_SET, payload };
};

export const boardDataSetAction = (payload: any) => {
  return { type: BOARD_DATA_SET, payload };
};

export const addBoardPostDataAction = (payload: any) => {
  return { type: ADD_BOARD_POST_DATA, payload };
};

export const removeBoardPostDataAction = (payload: any) => {
  return { type: REMOVE_BOARD_POST_BY_ID, payload };
};

export const editBoardPostDataAction = (payload: any) => {
  return { type: EDIT_BOARD_POST_BY_ID, payload };
};

export const boardPostCommentsDataSetAction = () => {
  return { type: BOARD_POSTS_COMMENTS_DATA_SET };
};

export const addBoardPostCommentsDataAction = () => {
  return { type: ADD_BOARD_POSTS_COMMENTS_DATA };
};
