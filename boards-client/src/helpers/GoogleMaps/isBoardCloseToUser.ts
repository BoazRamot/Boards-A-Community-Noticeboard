export const isBoardCloseToUser = (board: any, latLng: any) => {
  let result = false;
  // const latLngBounds = 0.002200;
  const latLngBounds = 0.014; // ~ 1.5 Km
  const x = Math.abs(parseFloat(board.location.latitude) - latLng.lat);
  const y = Math.abs(parseFloat(board.location.longitude) - latLng.lng);
  if (x < latLngBounds && y < latLngBounds) {
    result = true;
  }
  return result;
};
