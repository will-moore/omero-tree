import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { fetchEventContext } from './actions';
import { connect } from 'react-redux';

class Header extends Component {
  componentWillMount = () => {
    this.props.fetchEventContext();
  };

  render() {
    const userName = this.props.eventContext.userName || ' ';
    return (
      <AppBar
        title="OMERO"
        iconElementRight={<FlatButton label={userName} />}
      />
    );
  }
}

// Define how state from store gets mapped to
// props of child component <ChannelList>
const mapStateToProps = (state, ownProps) => {
  return {
    eventContext: state.eventContext
  };
};

// Define functions that modify store and are
// passed as props of App so that it
// can update store
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchEventContext: () => {
      dispatch(fetchEventContext());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
