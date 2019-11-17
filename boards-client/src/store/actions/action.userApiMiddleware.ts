// action types

export const USER_API_GET_USER = 'USER_API_GET_USER';
export const USER_API_GET_POST_USER = 'USER_API_GET_POST_USER';

// action creators

export const getAllUserDataAction = (token: any) => {
  return { type: USER_API_GET_USER, token };
};

export const getPostUserDataAction = (userId: any, setUserData: any) => {
  return { type: USER_API_GET_POST_USER, userId, setUserData };
};
