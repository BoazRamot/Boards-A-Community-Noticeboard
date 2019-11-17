import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
} from '@material-ui/core';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import ClearIcon from '@material-ui/icons/Clear';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { findGeolocation } from '../../helpers/GoogleMaps/findGeolocation';
import { resetMapBoardsDataAction } from '../../store/actions/action.boardsDataReducer';
import { resetMarkerAction } from '../../store/actions/action.googleMapReducer';
import {
  openDrawerAction,
  resetAddressAction,
  resetFindLocationAction,
  // resetPopstateAction,
  // resetRedirectAction,
  setFindLocationAction,
} from '../../store/actions/action.mapReducer';
import useStyles from './GoogleMapService/useStyles';

interface IProps {
  reverseGeocoding: Function;
  resetSearch: Function;
  resetFindLocation: Function;
  setFindLocation: Function;
  openDrawer: Function;
  resetAddress: Function;
  isOpen: boolean;
  autocompleteBoxRef: any;
  setClearButton: any;
  autocompleteInput: boolean;
  findLocation: boolean;
  clearButton: boolean;
  redirect: boolean;
  address: string;
  map: any;
  setAutocompleteInput: any;
  markersMap: any;
  maps: any;
}

const AutoCompleteInput: React.FC<IProps> = ({
  reverseGeocoding,
  maps,
  markersMap,
  resetSearch,
  setAutocompleteInput,
  resetFindLocation,
  findLocation,
  setFindLocation,
  map,
  resetAddress,
  address,
  redirect,
  isOpen,
  openDrawer,
  autocompleteBoxRef,
  setClearButton,
  autocompleteInput,
  clearButton,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (redirect && address) {
      (autocompleteBoxRef.current as any).querySelector(
        'input',
      ).value = address;
      setClearButton(true);
    }
    // eslint-disable-next-line
  }, [redirect]);

  const handleInput = () => {
    const input = (autocompleteBoxRef.current as any).querySelector('input')
      .value;
    if (input.length !== 0) {
      setClearButton(true);
    } else {
      setClearButton(false);
    }
  };

  const handleClear = () => {
    const input = (autocompleteBoxRef.current as any).querySelector('input')
      .value;
    if (input === null) {
      return;
    }
    (autocompleteBoxRef.current as any).querySelector('input').value = '';
    resetAddress();
    if (markersMap && markersMap.size !== 0) {
      markersMap.forEach((marker: any, user: any) => marker.setMap(null));
      // clear marker && mapBoards
      resetSearch();
      setAutocompleteInput(false);
    }
    setClearButton(false);
  };

  const handleSearch = () => {
    if (!clearButton) {
      return;
    }
    openDrawer();
    if (markersMap.size > 1) {
      const bounds = new maps.LatLngBounds();
      markersMap.forEach((marker: any, user: any) => {
        bounds.extend(marker.getPosition());
      });
      map.fitBounds(bounds);
    } else {
      const userMarker = markersMap.get('user');
      const latLng = userMarker.getPosition();
      map.panTo(latLng);
    }
  };

  const handleFindMyLocation = () => {
    handleClear();
    findGeolocation(map, window.google.maps, reverseGeocoding);
  };

  const handleFindLocation = () => {
    if (findLocation) {
      map.setOptions({ draggableCursor: undefined });
      resetFindLocation();
      setAutocompleteInput(false);
    } else {
      map.setOptions({
        draggableCursor:
          'url(http://s3.amazonaws.com/besport.com_images/status-pin.png), auto',
      });
      setFindLocation();
      setAutocompleteInput(true);
      handleClear();
    }
  };

  return (
    <div>
      <Paper className={isOpen ? classes.hide : classes.paperRoot}>
        <InputBase
          className={classes.input}
          ref={autocompleteBoxRef}
          placeholder="Search Boards Community"
          inputProps={{ 'aria-label': 'search boards community' }}
          onChange={handleInput}
          disabled={autocompleteInput}
        />
        <IconButton
          className={clearButton ? classes.iconButton : classes.hide}
          aria-label="clear"
          onClick={handleClear}
        >
          <ClearIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <Tooltip title="Open Search Results">
          <IconButton
            className={classes.iconButton}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} orientation="vertical" />
        <Tooltip title="Find My Location">
          <IconButton
            className={classes.iconButton}
            aria-label="find"
            onClick={handleFindMyLocation}
          >
            <MyLocationIcon />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} orientation="vertical" />
        <Tooltip title="Search Location In a Click">
          <IconButton
            className={classes.iconButton}
            aria-label="location"
            onClick={handleFindLocation}
          >
            {findLocation ? <LocationOffIcon /> : <AddLocationIcon />}
          </IconButton>
        </Tooltip>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  map: state.googleMap.map,
  isOpen: state.map.open,
  address: state.map.address,
  redirect: state.map.redirect,
  findLocation: state.map.findLocation,
  popstate: state.map.popstate,

  markersMap: state.googleMap.markersMap,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // resetPopstate: () => dispatch(resetPopstate()),
  openDrawer: () => dispatch(openDrawerAction()),
  resetAddress: () => dispatch(resetAddressAction()),
  setFindLocation: () => dispatch(setFindLocationAction()),
  resetFindLocation: () => dispatch(resetFindLocationAction()),

  resetSearch: () => {
    dispatch(resetMarkerAction());
    dispatch(resetMapBoardsDataAction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoCompleteInput);
