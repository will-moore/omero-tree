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
const processObjects = (action, tree) => {
  // Create state for list of nodes
  const nodes = action.json.data.map(p => {
    const cc = p['omero:childCount'];
    const dtype = p['@type'].split('#')[1].toLowerCase();
    return {
      name: p.Name || '-',
      id: p['@id'],
      dtype,
      leaf: cc === 0,
      collapsed: true,
      childCount: cc,
      children: cc > 0 ? [{ name: 'loading...', leaf: true }] : undefined
    };
  });
  // If the nodes are children of a parent...
  if (action.parentType) {
    const pid = action.parentId;
    // find the parent node and add children to it
    // Traverse the tree (ONLY 1 level here)...
    const children = tree.children.map(n => {
      // If node 'matches' we create new node with children (and expanded!)
      if (n.id === pid) {
        return Object.assign({}, n, { collapsed: false, children: nodes });
      } else {
        // otherwise we duplicate node
        return Object.assign({}, n);
      }
    });
    let newTree = {
      name: 'OMERO',
      children
    };
    return newTree;
  }
  // No parent - set data for whole tree
  return { name: 'OMERO', children: nodes };
};

// Our main App reducer. Handles ALL state changes
export default function treeApp(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_OBJECTS:
      const tree = processObjects(action, state.tree);
      return Object.assign({}, state, { tree });
    default:
      return state;
  }
}
