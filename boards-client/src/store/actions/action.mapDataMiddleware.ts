// action types

export const MAP_DATA_SET = 'MAP_DATA_SET';
export const MAP_LOAD_DATA_SET = 'MAP_LOAD_DATA_SET';

// action creators

export const saveMapDataNowAction = (board: any = false) => {
  return { type: MAP_DATA_SET, board };
};

export const loadMapDataNowAction = (persistedState: any) => {
  return { type: MAP_LOAD_DATA_SET, persistedState };
};
