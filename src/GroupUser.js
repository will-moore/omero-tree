import React, { Component } from 'react';
import { fetchGroups, fetchObjects, setGroupId } from './actions';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class GroupUser extends Component {
  componentWillMount = () => {
    this.props.fetchGroups();
  };

  componentWillReceiveProps = nextProps => {
    const groupId = nextProps.groupId;

    // If we have a groupId in hand (and it's changed),
    // Need to refresh the objects... NB: objects will be loaded for current user & group
    if (groupId && groupId !== this.props.groupId) {
      this.props.fetchObjects('root');
    }
  };

  handleChange = (event, index, value) => {
    console.log('handleChange', value);
    this.props.setGroupId(value);
  };

  render() {
    const items = this.props.groups.map(g => {
      return (
        <MenuItem value={g['@id']} key={g['@id']} primaryText={g['Name']} />
      );
    });

    return (
      <div>
        <DropDownMenu
          maxHeight={300}
          value={this.props.groupId}
          onChange={this.handleChange}
        >
          {items}
        </DropDownMenu>
      </div>
    );
  }
}

// Define how state from store gets mapped to
// props of child component <ChannelList>
const mapStateToProps = (state, ownProps) => {
  return {
    groups: state.groups,
    groupId: state.groupId
  };
};

// Define functions that modify store and are
// passed as props of App so that it
// can update store
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchGroups: () => {
      dispatch(fetchGroups());
    },
    fetchObjects: parent => {
      dispatch(fetchObjects(parent));
    },
    setGroupId: groupId => {
      dispatch(setGroupId(groupId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupUser);
