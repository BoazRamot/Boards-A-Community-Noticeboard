// action types

export const USER_DATA_SET = 'USER_DATA_SET';
export const RESET_USER_DATA = 'RESET_USER_DATA';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SIGN_IN_DIALOG_OPEN = 'SIGN_IN_DIALOG_OPEN';
export const SIGN_IN_DIALOG_CLOSE = 'SIGN_IN_DIALOG_CLOSE';
export const USER_ACCOUNT = 'USER_ACCOUNT';
export const SET_PAGE_NOT_FOUND = 'SET_PAGE_NOT_FOUND';
export const RESET_PAGE_NOT_FOUND = 'RESET_PAGE_NOT_FOUND';

// action creators

export const setPageNotFoundAction = () => {
  return { type: SET_PAGE_NOT_FOUND };
};

export const resetPageNotFoundAction = () => {
  return { type: RESET_PAGE_NOT_FOUND };
};

export const userDataSetAction = (payload: any) => {
  return { type: USER_DATA_SET, payload };
};

export const resetUserDataAction = () => {
  return { type: RESET_USER_DATA };
};

export const logoutUserAction = () => {
  return { type: LOGOUT_USER };
};

export const signInDialogOpenAction = () => {
  return { type: SIGN_IN_DIALOG_OPEN };
};

export const signInDialogCloseAction = () => {
  return { type: SIGN_IN_DIALOG_CLOSE };
};

export const setUserAccountAction = (payload: any) => {
  return { type: USER_ACCOUNT, payload };
};

