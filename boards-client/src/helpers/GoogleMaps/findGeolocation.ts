export const findGeolocation = (
  map: any,
  maps: any,
  locationCB: any = null,
) => {
  const infoWindow = new maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const { latitude, longitude } = position.coords;
        map.panTo({ lat: latitude, lng: longitude });
        map.setZoom(16);
        if (locationCB) {
          locationCB(map, { lat: latitude, lng: longitude }, maps);
        }
      },
      function() {
        handleLocationError(true, infoWindow, map);
      },
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map);
  }
};

const handleLocationError = (
  browserHasGeolocation: boolean,
  infoWindow: any,
  map: any,
) => {
  infoWindow.setPosition(map.getCenter());
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : 'Error: Your browser doesn\'t support geolocation.',
  );
  infoWindow.open(map);
};
