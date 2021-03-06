import cx from 'classnames';
import React, { Component } from 'react';
import Tree from 'react-ui-tree';
import { fetchObjects, clickTreeNode } from './actions';
import { connect } from 'react-redux';

class App extends Component {
  componentWillMount = () => {
    // this.props.fetchObjects('root');
  };

  renderNode = node => {
    return (
      <span
        className={cx('node', {
          'is-active': node === this.props.active
        })}
        onClick={event => {
          console.log('ARGS', event.type, arguments);
          this.onClickNode(event, node);
        }}
      >
        {node.name} ({node.childCount})
      </span>
    );
  };

  onClickNode = (event, node) => {
    console.log('onClickNode...', event.shiftKey);
    this.props.clickTreeNode(event, node);

    if (node.childCount > 0 && !node.loaded) {
      this.props.fetchObjects(node.dtype, node.id);
    }
    this.setState(
      {
        // fetchObjects / display of result only works if we setState() ?!?!?
      }
    );
  };

  handleChange = tree => {
    console.log(arguments);
    // Called on any change, e.g expand/select etc.
    console.log('handleChange');
  };

  render() {
    return (
      <div className="app">
        <div className="tree">
          <Tree
            paddingLeft={20}
            tree={this.props.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
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
    },
    clickTreeNode: (event, node) => {
      dispatch(clickTreeNode(event, node));
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
