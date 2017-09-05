import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { fetchEventContext, fetchObjects } from './actions';
import { connect } from 'react-redux';

class Header extends Component {
  componentWillReceiveProps = nextProps => {
    console.log('next', nextProps);
    console.log('props', this.props);

    const userId = nextProps.eventContext.userId;

    // If we now have a userId in hand (and it's changed),
    // Need to refresh the objects... NB: objects will be loaded for current user & group
    if (
      userId &&
      this.props.eventContxt &&
      (userId !== this.props.eventContxt.userId ||
        nextProps.eventContext.groupId !== this.props.eventContext.groupId)
    ) {
      this.props.fetchObjects();
    }
  };

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
    },
    fetchObjects: () => {
      dispatch(fetchObjects('root'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
