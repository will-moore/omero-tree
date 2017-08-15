import 'react-ui-tree/dist/react-ui-tree.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import AppContainer from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import treeApp from './reducers';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

let store = createStore(
  treeApp,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
