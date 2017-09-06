import { SET_GROUP_ID } from '../actions';

export const groupId = (state = null, action) => {
  switch (action.type) {
    case SET_GROUP_ID:
      return action.groupId;
    default:
      return state;
  }
};
