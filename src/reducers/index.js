import { combineReducers } from 'redux';

import { tree } from './tree';
import { groups } from './groups';
import { groupId } from './groupId';
import { eventContext } from './eventContext';
import { selectedObjects } from './selectedObjects';

// Our main App reducer. Handles ALL state changes
export default combineReducers({
  tree,
  groups,
  groupId,
  eventContext,
  selectedObjects
});
