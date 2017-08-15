import { RECEIVE_OBJECTS } from './actions';

const initialState = {
  active: null,
  tree: {
    name: 'OMERO',
    children: []
  }
};

// Handle the json response from e.g. /api/m/projects/
// We process the 'data' list and return json for tree
const processObjects = jsonRsp => {
  return jsonRsp.data.map(p => {
    const cc = p['omero:childCount'];
    return {
      name: p.Name || '-',
      id: p['@id'],
      dtype: 'project',
      leaf: cc === 0,
      collapsed: true,
      childCount: cc,
      children: cc > 0 ? [{ name: 'loading...', leaf: true }] : undefined
    };
  });
};

// Our main App reducer. Handles ALL state changes
export default function treeApp(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_OBJECTS:
      const projects = processObjects(action.json);
      return Object.assign({}, state, {
        tree: {
          name: 'OMERO',
          children: projects
        }
      });
    default:
      return state;
  }
}
