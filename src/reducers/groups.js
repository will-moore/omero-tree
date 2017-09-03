import { RECEIVE_GROUPS } from '../actions';

export const groups = (state = [], action) => {
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
