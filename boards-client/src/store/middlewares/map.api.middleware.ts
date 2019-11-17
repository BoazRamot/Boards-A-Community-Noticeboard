import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { store } from '../../index';
import {
  addMapBoardDataAction,
  mapBoardsDataSetAction,
} from '../actions/action.boardsDataReducer';
import {
  MAP_API_CREATE_BOARD,
  MAP_API_GET_BOARDS,
  MAP_API_GET_BOARDS_BY_POINT,
} from '../actions/action.mapApiMiddleware';

const getMapBoards: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  // console.log('next state', store.getState());
  if (action.type === MAP_API_GET_BOARDS) {
    (async () => {
      try {
        const url = 'http://localhost:5000/api/boards';
        const res = await fetch(url);
        const boardsData = await res.json();
        dispatch(mapBoardsDataSetAction(boardsData));
      } catch (e) {
        console.error('Boards Fetch Failed', e);
      }
    })();
  }
  return next(action);
};

const getMapBoardsByPoint: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  console.log('next state', store.getState());
  if (action.type === MAP_API_GET_BOARDS_BY_POINT) {
    const latLng = JSON.stringify(action.latLng);
    (async () => {
      try {
        console.log('getMapBoardsByPoint latLng', latLng);
        const url = `http://localhost:5000/api/boards/${latLng}`;
        // const url = `http://localhost:5000/api/boards/latLng`;
        const res = await fetch(url);
        // let res = await fetch(url, {method: 'GET', headers: {'X-Auth-Token': latLng}});
        const boardsData = await res.json();
        console.log('boardsData', boardsData);
        dispatch(mapBoardsDataSetAction(boardsData));
      } catch (e) {
        console.error('Boards Fetch Failed', e);
      }
    })();
  }
  return next(action);
};

const createMapBoard: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  if (action.type === MAP_API_CREATE_BOARD) {
    const token = localStorage.getItem('boards-token') || '';
    const board = JSON.stringify(action.board);
    (async () => {
      try {
        const url = 'http://localhost:5000/api/boards';
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'X-Auth-Token': token,
            'Content-Type': 'application/json',
          },
          body: board,
        });
        const boardData = await res.json();
        console.log('new board Data: ', boardData);
        dispatch(addMapBoardDataAction(boardData));
        // dispatch(mapBoardsDataSET(boardsData));
      } catch (e) {
        console.error('Board Create Failed', e);
      }
    })();
  }
  return next(action);
};

export const mapBoardsMiddleware = [
  getMapBoardsByPoint,
  getMapBoards,
  createMapBoard,
];
