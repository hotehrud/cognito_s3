import { useReducer, useEffect } from 'react';
import aws from 'js/s3';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        authed: false,
        data: null,
        error: null
      };
    case 'AUTH':
      return {
        loading: false,
        authed: true,
        data: action.data,
        error: null
      };
    case 'UNAUTH':
      return {
        loading: false,
        authed: false,
        data: action.data,
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAuth(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    authed: true,
    error: false
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      if (typeof callback === 'function') {
        callback();
      }
      const data = await aws.loginStatus();
      if (data) {
        dispatch({ type: 'AUTH', data });
      } else {
        dispatch({ type: 'UNAUTH', data });
      }
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (!skip) {
      fetchData();
    }
  }, deps);

  return [state, fetchData];
}

export default useAuth;
