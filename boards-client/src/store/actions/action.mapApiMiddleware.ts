// action types

export const MAP_API_GET_BOARDS = 'MAP_API_GET_BOARDS';
export const MAP_API_CREATE_BOARD = 'MAP_API_CREATE_BOARD';
export const MAP_API_GET_BOARDS_BY_POINT = 'MAP_API_GET_BOARDS_BY_POINT';

// action creators

export const getAllBoardsAction = () => {
  return { type: MAP_API_GET_BOARDS };
};

export const createNewBoardAction = (board: any) => {
  return { type: MAP_API_CREATE_BOARD, board };
};

export const getBoardsByPointAction = (latLng: any) => {
  return { type: MAP_API_GET_BOARDS_BY_POINT, latLng };
};
