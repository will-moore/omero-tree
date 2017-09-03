import { RECEIVE_EVENT_CONTEXT } from '../actions';

export const eventContext = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_EVENT_CONTEXT:
      return action.json;
    default:
      return state;
  }
};
