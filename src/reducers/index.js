import { combineReducers } from 'redux';
import listReducer from './listReducer';
import authReducer from './authReducer';

export default combineReducers ({
  auth: authReducer,
  list: listReducer
});
