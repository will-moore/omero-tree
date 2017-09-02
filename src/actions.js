export const FETCH_OBJECTS = 'FETCH_OBJECTS';
export const RECEIVE_OBJECTS = 'RECIEVE_OBJECTS';

export function receiveObjects(json, parentType, parentId) {
  return { type: RECEIVE_OBJECTS, json, parentType, parentId };
}

const CHILD_TYPES = {
  root: 'projects',
  project: 'datasets',
  dataset: 'images'
};

// Get JSON from OMERO api
// TODO: don't hard-code limit=10
export function fetchObjects(dtype, parentId) {
  return function(dispatch) {
    let url = `http://localhost:4080/api/v0/m/${CHILD_TYPES[
      dtype
    ]}/?limit=10&childCount=true`;
    if (parentId) {
      url += `&${dtype}=${parentId}`;
    }
    fetch(url, {
      // Allows CORS
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveObjects(json, dtype, parentId)));
  };
}

// Loading of EVENT_CONTEXT

export const RECEIVE_EVENT_CONTEXT = 'RECEIVE_EVENT_CONTEXT';

export function fetchEventContext() {
  return function(dispatch) {
    const url = `http://localhost:4080/api/v0/eventcontext/`;
    fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveEventContext(json)));
  };
}

export function receiveEventContext(json) {
  console.log('receiveEventContext', json);
  return { type: RECEIVE_EVENT_CONTEXT, json };
}

// Handling Loading of GROUPS for the current USER
// TODO: load this or get it from login
const USER_ID = 3;

export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';

export function fetchGroups() {
  return function(dispatch) {
    const url = `http://localhost:4080/api/v0/m/experimenters/${USER_ID}/experimentergroups/`;
    fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveGroups(json)));
  };
}

export function receiveGroups(json) {
  console.log('receiveGroups', json);
  return { type: RECEIVE_GROUPS, json };
}
