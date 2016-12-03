// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import enkodi from './enkodiReducer';

export default combineReducers({
  enkodi,
  routing
});
