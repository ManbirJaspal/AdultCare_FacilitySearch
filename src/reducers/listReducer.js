import _ from 'lodash';
import {
  FETCH_LIST,
  CLEAR_LIST,
} from '../actions/types';

const DEFAULT = {};
const EMPTY = {};

export default (state = DEFAULT, action) => {
  switch (action.type) {
    case FETCH_LIST:
      return {...state, ..._.mapKeys(action.payload, "provider_name")};
    case CLEAR_LIST:
      return EMPTY;
    default:
      return state;
  }
}
