export const addMarkerToMap = (
  place: any,
  map: any,
  maps: any,
  icon: any = false,
) => {
  let iconUrl = '';
  if (icon) {
    iconUrl = 'http://s3.amazonaws.com/besport.com_images/status-pin.png';
  }
  return new maps.Marker({
    map,
    icon: iconUrl,
    title: place.name,
    position: place.location,
  });
};
