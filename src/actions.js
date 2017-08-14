export const FETCH_OBJECTS = 'FETCH_OBJECTS';
export const RECEIVE_OBJECTS = 'RECIEVE_OBJECTS';

export function receiveObjects(json) {
  return { type: RECEIVE_OBJECTS, json };
}

const PARENT_TYPES = {
  dataset: 'project',
  image: 'dataset'
};

export function fetchObjects(dtype, parentId) {
  return function(dispatch) {
    let url = `http://localhost:4080/api/v0/m/${dtype}/?limit=10&childCount=true`;
    if (parentId) {
      url += `&${PARENT_TYPES[dtype]}=${parentId}`;
    }
    fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveObjects(json)));
  };
}
