import React, { Component } from 'react';
import Tree from './Tree';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="OMERO"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div>
            <Tree />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
