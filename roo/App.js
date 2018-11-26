import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from './ducks';
import Root from './Root';

export default class App extends React.Component {
  render() {
    const rootReducer = combineReducers(reducers);
    const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
