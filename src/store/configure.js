//https://github.com/jarredwitt/react-boilerplate/blob/master/app/store/store.jsx
import { compose, createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

export default (initialState) => {
  console.log('init state', initialState);
  initialState = process.env.state || initialState
  return createStore(
    combineReducers(reducers),
    initialState,
    compose(
      applyMiddleware(thunk),
      typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};