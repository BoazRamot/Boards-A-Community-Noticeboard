import {
  GoogleMap,
  // InfoWindow,
} from '@react-google-maps/api';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addMarkerToMap } from '../../../helpers/GoogleMaps/addMarkerToMap';
import { autocompleteInit } from '../../../helpers/GoogleMaps/autocompleteInit';
import { findGeolocation } from '../../../helpers/GoogleMaps/findGeolocation';
import {
  mapBoardsDataSetAction,
  resetMapBoardsDataAction,
} from '../../../store/actions/action.boardsDataReducer';
import {
  addMapAction,
  addMarkerAction,
  addPlaceListenerAction,
  resetMarkerAction,
} from '../../../store/actions/action.googleMapReducer';
import {
  getAllBoardsAction,
  getBoardsByPointAction,
} from '../../../store/actions/action.mapApiMiddleware';
import {
  addAddressAction,
  addLatLngAction,
  addMarkerLatLngAction,
  closeDrawerAction,
  openDrawerAction,
  resetAddressAction,
  resetFindLocationAction,
  resetPopstateAction,
  resetRedirectAction,
  updateLocationAction,
} from '../../../store/actions/action.mapReducer';
import AutoCompleteInput from '../AutoCompleteInput';
import AutocompleteInputDialog from '../AutocompleteInputDialog';
import MapResultDrawer from '../MapResultDrawer';
import useStyles from './useStyles';

declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    google: any;
  }
}

window.google = window.google || {};

interface IProps {
  markersMap: any;
  markerLatLng: any;
  resetSearch: Function;
  mapBoards: any;
  latLng: any;
  updateLocation: Function;
  addPlaceListener: Function;
  addMarker: Function;
  getAllBoards: Function;
  getBoardsByPoint: Function;
  address: string;
  markerAddress: string;
  isOpen: boolean;
  redirect: boolean;
  popstate: boolean;
  findLocation: boolean;
  addMap: Function;
  map: any;
  mapZoom: any;
  numOfMarkers: any;
  board: any;
  addAddress: Function;
  resetFindLocation: Function;
  resetPopstate: Function;
  resetMarker: Function;
}

const GoogleMapService: React.FC<IProps> = ({
  board,
  markerAddress,
  resetMarker,
  popstate,
  resetPopstate,
  getBoardsByPoint,
  resetFindLocation,
  markerLatLng,
  mapZoom,
  numOfMarkers,
  findLocation,
  map,
  addMap,
  getAllBoards,
  addMarker,
  addPlaceListener,
  redirect,
  markersMap,
  resetSearch,
  mapBoards,
  latLng,
  updateLocation,
  address,
  isOpen,
}) => {
  // autocompleteInput disabled
  const [autocompleteInput, setAutocompleteInput] = useState(false);
  // autocompleteInput select list alert
  const [
    openAutocompleteInputDialog,
    setOpenAutocompleteInputDialog,
  ] = useState(false);
  // autocompleteInput clear results
  const [clearButton, setClearButton] = useState(false);
  const autocompleteBoxRef = useRef(null);
  const mapRef = useRef(null);
  const classes = useStyles();
  const maps = window.google.maps;

  const handleAutocompleteInputDialogOpen = () => {
    setOpenAutocompleteInputDialog(true);
  };

  const handleAutocompleteInputDialogClose = () => {
    setOpenAutocompleteInputDialog(false);
  };

  const addBoardsToMap = (
    _map: any,
    _mapBoards: any,
    _latLng: any,
    _markersMap: any,
  ) => {
    if (_mapBoards.length !== 0) {
      let bounds: any;
      if (_map && _markersMap.size !== 0) {
        bounds = new maps.LatLngBounds();
        const marker = _markersMap.get('user');
        bounds.extend(marker.getPosition());
        // eslint-disable-next-line
        _mapBoards.map((_board: any) => {
          const location = {
            lat: _board.location.latitude,
            lng: _board.location.longitude,
          };
          const place = { name: _board.name, location };
          const _marker = addMarkerToMap(place, _map, maps, true);
          _markersMap.set(_board._id, _marker);
          bounds.extend(_marker.getPosition());
        });
      }
      addMarker(_markersMap);
      // if (map && markersMap.size > 1 && !redirect) {
      // if (_map && _markersMap.size > 1) {
      if (_map && _markersMap.size > 2) {
        _map.fitBounds(bounds);
      }
    }
  };

  useEffect(() => {
    if (mapBoards.length !== 0) {
      addBoardsToMap(map, mapBoards, latLng, markersMap);
    }
    // eslint-disable-next-line
  }, [mapBoards]);

  const onLoad = useCallback(function _onLoad(_map: any) {
    console.log('onLoad');
    console.log('onLoad popstate', popstate);
    if (redirect) {
      console.log('onLoad redirect');
      const newMarkersMap = new Map();
      _map.setCenter(latLng);
      _map.setZoom(mapZoom);
      if (numOfMarkers > 0 && address) {
        let place = {};
        if (popstate) {
          const boardLatLng = {
            lat: board.location.latitude,
            lng: board.location.longitude,
          };
          place = { name: board.address, location: boardLatLng };
          getBoardsByPoint(boardLatLng);
          resetPopstate(board.address, boardLatLng);
        } else {
          place = { name: markerAddress, location: markerLatLng };
        }
        const newMarker = addMarkerToMap(place, _map, maps);
        newMarkersMap.set('user', newMarker);
        addMarker(newMarkersMap);
        setAutocompleteInput(true);
      }
      if (numOfMarkers > 1) {
        addBoardsToMap(_map, mapBoards, markerLatLng, newMarkersMap);
      }
    } else {
      findGeolocation(_map, maps);
    }
    const autocompleteActions = {
      getAllBoards,
      handleAutocompleteInputDialogOpen,
      updateLocation,
      setAutocompleteInput,
      addPlaceListener,
      getBoardsByPoint,
    };
    autocompleteInit(autocompleteActions, _map, autocompleteBoxRef, maps);
    addMap(_map);
    // eslint-disable-next-line
  }, []);

  const reverseGeocoding = (_map: any, _latLng: any, _maps: any) => {
    const geocoder = new _maps.Geocoder();
    geocoder.geocode({ location: _latLng }, (results: any, status: any) => {
      if (status === 'OK') {
        console.log(results);
        if (results[0]) {
          const newMarkersMap = new Map();
          _map.panTo(_latLng);
          const _address = results[0].formatted_address;
          const place = { name: _address, location: _latLng };
          const newMarker = addMarkerToMap(place, _map, _maps);
          newMarkersMap.set('user', newMarker);
          updateLocation(_address, _latLng, newMarkersMap);
          setAutocompleteInput(true);
          getBoardsByPoint(_latLng);
          (autocompleteBoxRef.current as any).querySelector(
            'input',
          ).value = _address;
          setClearButton(true);
        } else {
          window.alert('No results found'); // todo: dialog window
        }
      } else {
        window.alert('Geocoder failed due to: ' + status); // todo: dialog window
      }
    });
    resetFindLocation();
    _map.setOptions({ draggableCursor: undefined });
    setAutocompleteInput(false);
  };

  const handleClick = (e: any) => {
    if (!findLocation) {
      return;
    }
    const _latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    reverseGeocoding(map, _latLng, maps);
  };

  return (
    <div className={classes.root}>
      <AutocompleteInputDialog
        openAutocompleteInputDialog={openAutocompleteInputDialog}
        handleAutocompleteInputDialogClose={handleAutocompleteInputDialogClose}
      />
      <MapResultDrawer />
      <GoogleMap
        id="map"
        ref={mapRef}
        center={latLng}
        zoom={13}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: maps.ControlPosition.LEFT_BOTTOM,
          },
        }}
        mapContainerClassName={clsx(classes.content, {
          [classes.contentShift]: isOpen,
        })}
        onClick={handleClick}
        onLoad={onLoad}
      >
        <AutoCompleteInput
          autocompleteBoxRef={autocompleteBoxRef}
          setClearButton={setClearButton}
          autocompleteInput={autocompleteInput}
          clearButton={clearButton}
          setAutocompleteInput={setAutocompleteInput}
          maps={maps}
          reverseGeocoding={reverseGeocoding}
        />
      </GoogleMap>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  markersMap: state.googleMap.markersMap,
  findLocation: state.map.findLocation,
  latLng: state.map.latLng,
  markerLatLng: state.map.markerLatLng,
  mapCentre: state.map.mapCentre,
  mapZoom: state.map.mapZoom,
  numOfMarkers: state.map.numOfMarkers,
  bounds: state.map.bounds,
  address: state.map.address,
  markerAddress: state.map.markerAddress,
  isOpen: state.map.open,
  redirect: state.map.redirect,
  popstate: state.map.popstate,
  isUpdateLocation: state.map.isUpdateLocation,
  isLogin: state.user.userLogin,
  mapBoards: state.mapBoards.mapBoards,
  map: state.googleMap.map,
  board: state.mapBoards.board,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  mapBoardsDataSet: (boards: any) => dispatch(mapBoardsDataSetAction(boards)),
  addAddress: (address: any) => dispatch(addAddressAction(address)),
  addMap: (map: any) => dispatch(addMapAction(map)),
  resetFindLocation: () => dispatch(resetFindLocationAction()),
  getAllBoards: () => dispatch(getAllBoardsAction()),
  getBoardsByPoint: (latLng: any) => dispatch(getBoardsByPointAction(latLng)),
  resetRedirect: () => dispatch(resetRedirectAction()),
  resetSearch: () => {
    dispatch(resetMarkerAction());
    dispatch(resetMapBoardsDataAction());
  },
  resetMarker: () => dispatch(resetMarkerAction()),
  resetPopstate: (boardAddress: any, boardLatLng: any) =>
    dispatch(resetPopstateAction(boardAddress, boardLatLng)),
  closeDrawer: () => dispatch(closeDrawerAction()),
  openDrawer: () => dispatch(openDrawerAction()),
  resetAddress: () => dispatch(resetAddressAction()),
  addPlaceListener: (placeListener: any) =>
    dispatch(addPlaceListenerAction(placeListener)),
  addMarker: (marker: any) => dispatch(addMarkerAction(marker)),
  addLatLng: (latLng: any) => dispatch(addLatLngAction(latLng)),
  // addMarkerLatLng: (latLng: any) => dispatch(addMarkerLatLngAction(latLng)),
  updateLocation: (address: string, latLng: any, marker: any) => {
    dispatch(updateLocationAction(address, latLng));
    dispatch(addMarkerAction(marker));
    dispatch(addMarkerLatLngAction(latLng));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleMapService);
