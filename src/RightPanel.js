import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedObjects } from './reducers';

class RightPanel extends Component {
  render() {
    return (
      <div>
        {this.props.selectedObjects
          .map(o => o.dtype[0].toUpperCase() + o.dtype.slice(1))
          .join(', ')}{' '}
        <br />
        ID: {this.props.selectedObjects.map(o => o.id).join(', ')} <br />
        Name: {this.props.selectedObjects.map(o => o.name).join(', ')}
      </div>
    );
  }
}

// Define how state from store gets mapped to
// props of child component <ChannelList>
const mapStateToProps = (state, ownProps) => {
  return {
    selectedObjects: getSelectedObjects(state)
  };
};

// Define functions that modify store and are
// passed as props of App so that it
// can update store
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
