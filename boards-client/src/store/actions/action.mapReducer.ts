// action types

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const RESET_ADDRESS = 'RESET_ADDRESS';
export const ADD_LAT_LNG = 'ADD_LAT_LNG';
export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const SET_REDIRECT = 'SET_REDIRECT';
export const RESET_REDIRECT = 'RESET_REDIRECT';
export const ADD_MARKER_LAT_LNG = 'ADD_MARKER_LAT_LNG';
export const SET_FIND_LOCATION = 'SET_FIND_LOCATION';
export const RESET_FIND_LOCATION = 'RESET_FIND_LOCATION';
export const SET_POPSTATE = 'SET_POPSTATE';
export const RESET_POPSTATE = 'RESET_POPSTATE';

// action creators

export const addAddressAction = (address: string) => {
  return { type: ADD_ADDRESS, address };
};

export const resetAddressAction = () => {
  return { type: ADD_ADDRESS };
};

export const addLatLngAction = (latLng: any) => {
  return { type: ADD_LAT_LNG, latLng };
};

export const updateLocationAction = (address: string, latLng: any) => {
  return { type: UPDATE_LOCATION, address, latLng };
};

export const openDrawerAction = () => {
  return { type: OPEN_DRAWER };
};

export const closeDrawerAction = () => {
  return { type: CLOSE_DRAWER };
};

export const resetRedirectAction = () => {
  return { type: RESET_REDIRECT };
};

export const addMarkerLatLngAction = (latLng: any) => {
  return { type: ADD_MARKER_LAT_LNG, latLng };
};

export const setRedirectAction = (
  bounds: any,
  latLng: any,
  mapCentre: any,
  mapZoom: any,
  numOfMarkers: any,
  address: string,
) => {
  return {
    type: SET_REDIRECT,
    bounds,
    latLng,
    mapCentre,
    mapZoom,
    numOfMarkers,
    address,
  };
};

export const setFindLocationAction = () => {
  return { type: SET_FIND_LOCATION };
};

export const resetFindLocationAction = () => {
  return { type: RESET_FIND_LOCATION };
};

export const setPopstateAction = () => {
  return { type: SET_POPSTATE };
};

export const resetPopstateAction = (boardAddress: any, boardLatLng: any) => {
  return { type: RESET_POPSTATE, boardAddress, boardLatLng };
};
