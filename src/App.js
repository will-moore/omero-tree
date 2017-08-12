
import cx from 'classnames';
import React, { Component } from 'react';
import Tree from 'react-ui-tree';

class App extends Component {

  componentWillMount = () => {
    fetch('http://localhost:4080/api/v0/m/projects/?limit=10&childCount=true', {
      credentials: 'include'
    }).then(response => response.json())
      .then(json => this.handleProjects(json.data));
  };

  handleProjects = data => {
    const projects = data.map(p => {
      const cc = p['omero:childCount'];
      return {module: p.Name || "-",
              id: p['@id'],
              dtype: 'project',
              leaf: cc === 0,
              collapsed: true,
              childCount: cc,
              children: cc > 0 ? [{module: 'loading...', leaf: true}]: undefined}
    });
    this.setState({tree: {module: 'OMERO', children: projects}});
  };

  state = {
    active: null,
    tree: {
            module: 'OMERO',
            children: []
          }
  };

  renderNode = node => {
    return (
      <span
        className={cx('node', {
          'is-active': node === this.state.active
        })}
        onClick={this.onClickNode.bind(null, node)}
      >
        {node.module} ({node.childCount})
      </span>
    );
  };

  onClickNode = node => {
    if (node.childCount > 0 && node.children[0].module === 'loading...') {
      console.log('load...');
      fetch('http://localhost:4080/api/v0/m/datasets/?childCount=true&project=' + node.id, {
        credentials: 'include'
      }).then(response => response.json())
        .then(json => this.handleProjects(json.data));
    }
    this.setState({
      active: node
    });
  };

  render() {
    return (
      <div className="app">
        <div>{this.state.active ? this.state.active.module : 'NONE'}</div>
        <div className="tree">
          <Tree
            paddingLeft={20}
            tree={this.state.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
        </div>
        <div className="inspector">
          <h1>
            Test....
          </h1>
          <button onClick={this.updateTree}>update tree</button>
          <pre>
            {JSON.stringify(this.state.tree, null, '  ')}
          </pre>
        </div>
      </div>
    );
  }

  handleChange = tree => {
    this.setState({
      tree: tree
    });
  };

  updateTree = () => {
    const { tree } = this.state;
    tree.children.push({ module: 'test' });
    this.setState({
      tree: tree
    });
  };
}

export default App;
