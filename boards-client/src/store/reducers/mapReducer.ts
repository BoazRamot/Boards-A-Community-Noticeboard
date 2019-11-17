import {
  ADD_ADDRESS,
  ADD_LAT_LNG,
  ADD_MARKER_LAT_LNG,
  CLOSE_DRAWER,
  OPEN_DRAWER,
  RESET_ADDRESS,
  RESET_FIND_LOCATION,
  RESET_POPSTATE,
  RESET_REDIRECT,
  SET_FIND_LOCATION,
  SET_POPSTATE,
  SET_REDIRECT,
  UPDATE_LOCATION,
} from '../actions/action.mapReducer';

const mapInitState: any = {
  address: '',
  markerAddress: '',
  latLng: { lat: 32.109333, lng: 34.855499 },
  open: false,
  redirect: false,
  isUpdateLocation: false,
  bounds: null,
  findLocation: false,
  mapCentre: null,
  mapZoom: null,
  numOfMarkers: null,
  markerLatLng: {},
  popstate: false,
};

const mapReducer = (state = mapInitState, action: any) => {
  switch (action.type) {
    case SET_FIND_LOCATION:
      return {
        ...state,
        findLocation: true,
      };
    case RESET_FIND_LOCATION:
      return {
        ...state,
        findLocation: false,
      };
    case ADD_ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    case RESET_ADDRESS:
      return {
        ...state,
        address: '',
      };
    case ADD_LAT_LNG:
      return {
        ...state,
        latLng: action.latLng,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        address: action.address,
        markerAddress: action.address,
        latLng: action.latLng,
        open: true,
        isUpdateLocation: true,
      };
    case OPEN_DRAWER:
      return {
        ...state,
        open: true,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        open: false,
      };
    case SET_REDIRECT:
      return {
        ...state,
        redirect: true,
        bounds: action.bounds,
        latLng: action.latLng,
        mapCentre: action.mapCentre,
        mapZoom: action.mapZoom,
        numOfMarkers: action.numOfMarkers,
        address: action.address,
      };
    case RESET_REDIRECT:
      return {
        ...state,
        redirect: false,
      };
    case ADD_MARKER_LAT_LNG:
      return {
        ...state,
        markerLatLng: action.latLng,
      };
    case SET_POPSTATE:
      return {
        ...state,
        popstate: true,
      };
    case RESET_POPSTATE:
      return {
        ...state,
        popstate: false,
        bounds: null,
        markerLatLng: action.boardLatLng,
        markerAddress: action.boardAddress,
      };
    default:
      return state;
  }
};

export default mapReducer;
