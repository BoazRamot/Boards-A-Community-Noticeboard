import {
  LOGOUT_USER, RESET_PAGE_NOT_FOUND, SET_PAGE_NOT_FOUND, SIGN_IN_DIALOG_CLOSE, SIGN_IN_DIALOG_OPEN, USER_ACCOUNT,
  // RESET_USER_DATA,
  USER_DATA_SET,
} from '../actions/action.userDataReducer';

const userDataInitState: any = {
  userData: {},
  userLogin: false,
  userSignInDialog: false,
  userAccount: null,
  pageNotFound: false,
};

const userDataReducer = (state: any = userDataInitState, action: any) => {
  switch (action.type) {
    case USER_DATA_SET:
      return {
        ...state,
        userData: action.payload,
        userLogin: true,
      };

    // case RESET_USER_DATA:
    //   state = {};
    //   break;

    case LOGOUT_USER:
      return {
        ...state,
        userLogin: false,
      };

    case SIGN_IN_DIALOG_OPEN:
      return {
        ...state,
        userSignInDialog: true,
      };

    case SIGN_IN_DIALOG_CLOSE:
      return {
        ...state,
        userSignInDialog: false,
      };

    case USER_ACCOUNT:
      return {
        ...state,
        userAccount: action.payload,
      };

    case SET_PAGE_NOT_FOUND:
      return {
        ...state,
        pageNotFound: true,
      };

    case RESET_PAGE_NOT_FOUND:
      return {
        ...state,
        pageNotFound: false,
      };

    default:
      return state;
  }
};

export default userDataReducer;
