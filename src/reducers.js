import { RECEIVE_OBJECTS } from './actions';

const initialState = {
  active: null,
  tree: {
    module: 'OMERO',
    children: []
  }
};

// Our main App reducer. Handles ALL state changes
export default function treeApp(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_OBJECTS:
      const projects = action.json.data.map(p => {
        const cc = p['omero:childCount'];
        return {
          module: p.Name || '-',
          id: p['@id'],
          dtype: 'project',
          leaf: cc === 0,
          collapsed: true,
          childCount: cc,
          children: cc > 0 ? [{ module: 'loading...', leaf: true }] : undefined
        };
      });
      return Object.assign({}, state, {
        tree: {
          module: 'OMERO',
          children: projects
        }
      });
    default:
      return state;
  }
}
