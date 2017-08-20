import React, { Component } from 'react';
import Tree from './Tree';

class App extends Component {
  render() {
    return (
      <div>
        <h1>OMERO</h1>
        <div>
          <Tree />
        </div>
      </div>
    );
  }
}

export default App;
