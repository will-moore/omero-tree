import React, { Component } from 'react';
import Tree from './Tree';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="OMERO"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div className="columnContainer">
            <div className="leftPanel">
              <Tree />
            </div>
            <div className="centrePanel">Centre</div>
            <div className="rightPanel">Right</div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
