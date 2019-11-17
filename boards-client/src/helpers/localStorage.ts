export const loadStateFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem('boardsMapState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveStateToSessionStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('boardsMapState', serializedState);
  } catch (e) {
    console.error('boardsMapState saveState Failed', e);
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('boardsMapStateLocal');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveStateToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('boardsMapStateLocal', serializedState);
  } catch (e) {
    console.error('boardsMapState saveState Failed', e);
  }
};

// export const saveMapState = () => {
//   store.subscribe(throttle(() => {
//     saveState({
//       map: store.getState().map,
//       user: store.getState().user,
//       mapBoards: store.getState().mapBoards,
//     });
//   }, 1000));
// };

// export const saveMapState = () => {
//   store.subscribe(() => {
//     saveState({
//       map: store.getState().map
//     });
//   });
// };
