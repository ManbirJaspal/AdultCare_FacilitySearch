import history from '../history';
import { url } from "../components/utils/RestUtils";
import axios from "axios";
import qs from 'qs';
import {
  FETCH_LIST,
  CLEAR_LIST,
  SIGN_IN,
  SIGN_OUT
} from './types';
import { LOGIN_ID, PASSWORD } from '../components/utils/cred';

const KEY='ABCDE';

export const getList = (zipCode, selections, distance) => async dispatch => {
  console.log("inside getlist in actions");
  const getList_Data = qs.stringify({
    zip: zipCode,
    selections: "'" + selections.join("', '") + "'",
    distance: distance
  });
  await axios.post(url + "/docs/around3", getList_Data)
    .then(response => {
      console.log(response.data);
      console.log(response.data[0].provider_name)
      dispatch({
        type: FETCH_LIST,
        payload: response.data
      })
    }, function(error) {
      alert("Either we don't have data for the search criteria entered or there is an issue with our services on the back end. We're working on it!");
      window.location.reload();
    });
};

export const getListCache = (zipCode, selections, distance) => async dispatch => {
  console.log("inside getlistCache in actions");
  const getList_Data = qs.stringify({
    zip: zipCode,
    selections: "'" + selections.join("', '") + "'",
    distance: distance
  });
  await axios.post(url + "/docs/around4", getList_Data)
    .then(response => {
      console.log(response.data);
      console.log(response.data[0].provider_name)
      dispatch({
        type: FETCH_LIST,
        payload: response.data
      })
    }, function(error) {
      alert("error has occured");
      history.push();
    });
};

export const loginAuth = (uid, password) => async dispatch => {
  console.log("inside loginAuth in actions");
  if ((uid == LOGIN_ID) && (password == PASSWORD)) {
    dispatch({
      type: SIGN_IN,
      payload: uid
    })
    console.log("inside if");
    history.push('/quiz');
  } else {
      alert("Incorrect ID or password, please enter again.")
      window.location.reload();
  }

};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const clearList = () => (dispatch) => {
  console.log("inside clearLIST() in actionS")
  dispatch({
    type: CLEAR_LIST
  })
};
