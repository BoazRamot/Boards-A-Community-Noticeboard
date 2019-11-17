import {
  ADD_BOARD_POST_DATA, ADD_BOARD_POSTS_COMMENTS_DATA,
  ADD_MAP_BOARD_DATA,
  BOARD_DATA_SET, BOARD_POSTS_COMMENTS_DATA_SET,
  BOARD_POSTS_DATA_SET, EDIT_BOARD_POST_BY_ID,
  MAP_BOARDS_DATA_SET, REMOVE_BOARD_POST_BY_ID,
  RESET_MAP_BOARDS_DATA,
} from '../actions/action.boardsDataReducer';

const boardsDataInitState: any = {
  mapBoards: [],
  board: {},
  posts: [],
  getPosts: false,
  getComments: false,
};

const boardsDataReducer = (state: any = boardsDataInitState, action: any) => {
  switch (action.type) {
    case MAP_BOARDS_DATA_SET:
      return {
        ...state,
        mapBoards: action.payload,
      };

    case RESET_MAP_BOARDS_DATA:
      return {
        ...state,
        mapBoards: [],
      };

    case ADD_MAP_BOARD_DATA:
      return {
        ...state,
        mapBoards: [...state.mapBoards, action.payload],
        board: action.payload,
      };

    case BOARD_DATA_SET:
      return {
        ...state,
        board: action.payload,
      };

    case BOARD_POSTS_DATA_SET:
      return {
        ...state,
        posts: action.payload,
        getPosts: false
      };

    case ADD_BOARD_POST_DATA:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case REMOVE_BOARD_POST_BY_ID:
      return {
        ...state,
        posts: state.posts.filter((post: any) => post._id !== action.payload),
      };

    case EDIT_BOARD_POST_BY_ID:
      return {
        ...state,
        posts: state.posts.map((post: any) => 
          post._id === action.payload._id ? { ...post, ...action.payload} : post),
        getPosts: true
      };

    case BOARD_POSTS_COMMENTS_DATA_SET:
      return {
        ...state,
        getComments: false
      };

    case ADD_BOARD_POSTS_COMMENTS_DATA:
      return {
        ...state,
        getComments: true
      };

    default:
      return state;
  }
};

export default boardsDataReducer;
