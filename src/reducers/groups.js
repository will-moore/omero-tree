import { RECEIVE_GROUPS } from '../actions';

export const groups = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_GROUPS:
      const groups = action.json.data;
      return groups;
    default:
      return state;
  }
};
