import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import SearchFacilities from './components/search/SearchFacilities';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import Landing  from './components/Landing';
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Landing/>
  </Provider>,
 document.querySelector('#root')
);
