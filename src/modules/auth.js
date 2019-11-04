import aws from 'js/s3';

const AUTH = 'auth/AUTH';
const UNAUTH = 'auth/UNAUTH';

export const setAuthentication = user => ({
  type: AUTH,
  user
});

export const setUnAuthentication = () => ({
  type: UNAUTH
});

export const authenticate = () => async dispatch => {
  const user = await aws.loginStatus();
  if (user) {
    dispatch(setAuthentication({ ...user.attributes }));
  } else {
    dispatch(setUnAuthentication());
  }
  return user ? { authed: true } : { authed: false };
};

export const unauthenticated = () => async dispatch => {
  await aws.signOut();
  dispatch(setUnAuthentication());
};

const initialState = {
  authed: null,
  user: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        authed: true,
        user: action.user
      };
    case UNAUTH:
      return {
        ...state,
        authed: false,
        user: null
      };
    default:
      return state;
  }
}
