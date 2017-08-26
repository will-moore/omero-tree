import { receiveObjects } from './actions';
import treeApp from './reducers';

it('should have initial state', () => {
  expect(treeApp(undefined, {})).toEqual({
    active: null,
    tree: {
      name: 'OMERO',
      children: []
    }
  });
});

it('should load Projects', () => {
  const action = receiveObjects(
    {
      data: [
        {
          '@id': 1,
          '@type': 'OME#Project',
          Name: 'TEST',
          'omero:childCount': 2
        }
      ]
    },
    'root'
  );
  expect(treeApp(undefined, action)).toEqual({
    active: null,
    tree: {
      name: 'OMERO',
      children: [
        {
          name: 'TEST',
          id: 1,
          dtype: 'project',
          leaf: false,
          collapsed: true,
          loaded: false,
          childCount: 2,
          children: [{ name: 'loading...', leaf: true }]
        }
      ]
    }
  });
});
