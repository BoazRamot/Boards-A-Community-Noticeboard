import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { store } from '../../index';
import {
  resetMapBoardsDataAction,
} from '../actions/action.boardsDataReducer';
import {
  MAP_DATA_SET,
} from '../actions/action.mapDataMiddleware';
import {
  setPopstateAction,
  setRedirectAction,
} from '../actions/action.mapReducer';

// To save map data if user press refresh or google redirect
const saveMapData: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  if (action.type === MAP_DATA_SET) {
    const map = store.getState().googleMap.map;
    let address = store.getState().map.address;
    let mapZoom: number;
    let latLng: { lat: any; lng: any };
    let mapCentre: { lat: any; lng: any };
    let numOfMarkers: number;
    const markersMap = store.getState().googleMap.markersMap;
    const board = store.getState().mapBoards.board;
    const currentBounds = null;
    if (action.board) {
      address = board.location.address;
      mapZoom = 16;
      latLng = {
        lat: board.location.latitude as number,
        lng: board.location.longitude as number,
      };
      mapCentre = latLng;
      numOfMarkers = 1;
      dispatch(setPopstateAction());
      dispatch(resetMapBoardsDataAction());
    } else {
      address = store.getState().map.address;
      mapZoom = map.getZoom();
      mapCentre = map.getCenter();
      latLng = { lat: mapCentre.lat(), lng: mapCentre.lng() };
      numOfMarkers = 0;
    }
    if (markersMap) {
      console.log('saveMapData clean');
      numOfMarkers = markersMap.size;
      markersMap.forEach((marker: any, user: any) => marker.setMap(null));
    }
    dispatch(
      setRedirectAction(
        currentBounds,
        latLng,
        mapCentre,
        mapZoom,
        numOfMarkers,
        address,
      ),
    );
  }
  return next(action);
};

const loadMapData: Middleware = ({ dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  console.log('loadMapData');
  // if (action.type === MAP_LOAD_DATA_SET) {
  //   console.log('loadMapData popstate');
  //   const map = store.getState().googleMap.map;
  //   const markersMap = store.getState().googleMap.markersMap;
  //   markersMap.forEach((marker: any, user: any) => marker.setMap(null));
  //   // window.google.maps.event.trigger(map, 'resize');
  //   // dispatch(resetMarker());

  //   // const markersMap = store.getState().googleMap.markersMap;
  //   // markersMap.forEach((marker: any, user: any) => marker.setMap(null));
  //   // const persistedState = action.persistedState;
  //   // const {
  //   //   currentBounds,
  //   //   latLng,
  //   //   mapCentre,
  //   //   mapZoom,
  //   //   numOfMarkers,
  //   //   address,
  //   // } = persistedState.map;
  //   // const mapBoards = persistedState.mapBoards.mapBoards;
  //   // dispatch(
  //   //   setRedirectAction(
  //   //     currentBounds,
  //   //     latLng,
  //   //     mapCentre,
  //   //     mapZoom,
  //   //     numOfMarkers,
  //   //     address,
  //   //   ),
  //   // );
  //   // dispatch(mapBoardsDataSetAction(mapBoards));
  //   // dispatch(resetPopstateAction());
  // }
  return next(action);
};

export const mapDataMiddleware = [saveMapData, loadMapData];
