import {
  RECEIVE_OBJECTS,
  RECEIVE_GROUPS,
  RECEIVE_EVENT_CONTEXT
} from '../actions';
import { combineReducers } from 'redux';

import { processObjects } from './tree';

const initialTree = {
  name: 'OMERO',
  children: []
};

const tree = (state = initialTree, action) => {
  switch (action.type) {
    case RECEIVE_OBJECTS:
      const tree = processObjects(action, state.tree);
      return tree;
    default:
      return state;
  }
};

const groups = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_GROUPS:
      console.log(RECEIVE_GROUPS, '....');
      const groups = action.json.data;
      console.log('GROUPS', groups);
      return groups;
    default:
      return state;
  }
};

const eventContext = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EVENT_CONTEXT:
      return action.json;
    default:
      return state;
  }
};

// Our main App reducer. Handles ALL state changes
export default combineReducers({
  tree,
  groups,
  eventContext
});
