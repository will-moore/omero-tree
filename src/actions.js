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
