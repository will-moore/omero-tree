import { RECEIVE_OBJECTS, CLICK_TREE_NODE } from '../actions';

export const getSiblings = node => {};

export const getParent = (rootNode, node) => {
  // Traverse the tree. If child matches node then
  // we return the current item
  const found = rootNode.children.find(n => nodesMatch(n, node));
  if (found !== undefined) {
    return rootNode;
  }
  for (let i = 0; i < rootNode.children.length; i++) {
    const ch = rootNode.children[i];
    const p = getParent(ch, node);
    if (p !== undefined) {
      return p;
    }
  }
};

export const getSelectedObjects = state => {
  // state is the tree (root Node)
  // console.log('getSelectedObjects', state);
  if (state.selected) {
    return [state];
  }
  if (state.children) {
    return state.children.reduce((prev, ch) => {
      return prev.concat(getSelectedObjects(ch));
    }, []);
  }
  return [];
};

// We traverse the whole tree, setting 'selected' for every node
// Only 'selected' True if nodes match.
const selectNode = (rootNode, node, meta) => {
  const selected = nodesMatch(rootNode, node);

  const children = rootNode.children
    ? rootNode.children.map(c => selectNode(c, node, meta))
    : undefined;
  let extra = { children };

  if (!meta) {
    extra.selected = selected;
  } else if (selected) {
    extra.selected = selected;
  }
  return Object.assign({}, rootNode, extra);
};

const nodesMatch = (n1, n2) => n1.dtype === n2.dtype && n1.id === n2.id;

const traverse = (rootNode, dtype, id, newChildren) => {
  let extra = {};
  if (rootNode.dtype === 'project') {
    if (dtype === 'project' && rootNode.id === id) {
      // We found the project - update children
      extra = { children: newChildren, loaded: true, collapsed: false };
    } else if (dtype === 'project') {
      // We're only looking for 'project' - Don't need to traverse any lower
      return rootNode;
    } else {
      // Need to traverse(children)
      extra = {
        children: rootNode.children
          ? rootNode.children.map(c => traverse(c, dtype, id, newChildren))
          : undefined
      };
    }
  } else if (rootNode.dtype === 'dataset') {
    if (dtype === 'dataset' && rootNode.id === id) {
      // We found the dataset
      extra = { children: newChildren, loaded: true, collapsed: false };
    } else {
      return rootNode;
    }
  } else {
    // E.g. root of Tree
    extra = {
      children: rootNode.children
        ? rootNode.children.map(c => traverse(c, dtype, id, newChildren))
        : undefined
    };
  }
  return Object.assign({}, rootNode, extra);
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
      selected: false,
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

export default (state = initialTree, action) => {
  console.log('tree', action.type);
  switch (action.type) {
    case RECEIVE_OBJECTS:
      const tree = processObjects(action, state);
      return tree;
    case CLICK_TREE_NODE:
      const event = action.event;
      if (event.shiftKey) {
        // select rang
      }
      console.log('META', event.metaKey, event);
      const new_tree = selectNode(state, action.node, event.metaKey);
      return new_tree;
    default:
      return state;
  }
};
