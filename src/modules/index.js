import { combineReducers } from 'redux';
import auth from './auth';
import album from './album';

const rootReducer = combineReducers({
  auth,
  album
});

export default rootReducer;
