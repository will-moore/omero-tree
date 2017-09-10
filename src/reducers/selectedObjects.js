import { CLICK_TREE_NODE } from '../actions';

export const selectedObjects = (state = [], action) => {
  switch (action.type) {
    case CLICK_TREE_NODE:
      // TODO, handle shift-click, ctrl-click
      return [action.node];
    default:
      return state;
  }
};
