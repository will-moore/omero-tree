import React, { Component } from 'react';
import Tree from './Tree';
import GroupUser from './GroupUser';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <GroupUser />
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
