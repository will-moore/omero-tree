import cx from 'classnames';
import React, { Component } from 'react';
import Tree from 'react-ui-tree';
import { fetchObjects } from './actions';
import { connect } from 'react-redux';

class App extends Component {
  componentWillMount = () => {
    this.props.fetchObjects('projects');
  };

  renderNode = node => {
    return (
      <span
        className={cx('node', {
          'is-active': node === this.props.active
        })}
        onClick={this.onClickNode.bind(null, node)}
      >
        {node.name} ({node.childCount})
      </span>
    );
  };

  onClickNode = node => {
    if (node.childCount > 0 && node.children[0].name === 'loading...') {
      console.log('load...');
      this.props.fetchObjects('datasets', node.id);
    }
    this.setState({
      active: node
    });
  };

  handleChange = tree => {
    // Called on any change, e.g expand/select etc.
    console.log('handleChange');
  };

  render() {
    return (
      <div className="app">
        <div>
          {this.props.active ? this.props.active.name : 'NONE'}
        </div>
        <div className="tree">
          <Tree
            paddingLeft={20}
            tree={this.props.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
        </div>
        <div className="inspector">
          <h1>Test....</h1>
          <button onClick={this.updateTree}>update tree</button>
          <pre>
            {JSON.stringify(this.props.tree, null, '  ')}
          </pre>
        </div>
      </div>
    );
  }

  updateTree = () => {
    // const { tree } = this.state;
    // tree.children.push({ name: 'test' });
    // this.setState({
    //   tree: tree
    // });
  };
}

// Define how state from store gets mapped to
// props of child component <ChannelList>
const mapStateToProps = (state, ownProps) => {
  return {
    tree: state.tree,
    active: state.active
  };
};

// Define functions that modify store and are
// passed as props of App so that it
// can update store
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchObjects: (dtype, parentId) => {
      dispatch(fetchObjects(dtype, parentId));
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
