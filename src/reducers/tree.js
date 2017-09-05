import { RECEIVE_OBJECTS } from '../actions';

const traverse = (node, dtype, id, newChildren) => {
  let extra = {};
  if (node.dtype === 'project') {
    if (dtype === 'project' && node.id === id) {
      // We found the project - update children
      extra = { children: newChildren, loaded: true, collapsed: false };
    } else if (dtype === 'project') {
      // We're only looking for 'project' - Don't need to traverse any lower
      return node;
    } else {
      // Need to traverse(children)
      extra = {
        children: node.children
          ? node.children.map(c => traverse(c, dtype, id, newChildren))
          : undefined
      };
    }
  } else if (node.dtype === 'dataset') {
    if (dtype === 'dataset' && node.id === id) {
      // We found the dataset
      extra = { children: newChildren, loaded: true, collapsed: false };
    } else {
      return node;
    }
  } else {
    // E.g. root of Tree
    extra = {
      children: node.children
        ? node.children.map(c => traverse(c, dtype, id, newChildren))
        : undefined
    };
  }
  return Object.assign({}, node, extra);
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
      loaded: false,
      childCount: cc,
      children: cc > 0 ? [{ name: 'loading...', leaf: true }] : undefined
    };
  });
  // If the nodes are children of a parent...
  switch (action.parentType) {
    case 'project':
      return traverse(tree, 'project', action.parentId, nodes);
    case 'dataset':
      // Traverse tree, processing nodes...
      // If we find matching node, return it with children
      return traverse(tree, 'dataset', action.parentId, nodes);
    default:
      // No parent - set data for whole tree
      return { name: 'OMERO', children: nodes };
  }
};

const initialTree = {
  name: 'OMERO',
  children: []
};

export const tree = (state = initialTree, action) => {
  switch (action.type) {
    case RECEIVE_OBJECTS:
      const tree = processObjects(action, state);
      return tree;
    default:
      return state;
  }
};
