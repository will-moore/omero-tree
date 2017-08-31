import React, { Component } from 'react';
import { fetchGroups } from './actions';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class GroupUser extends Component {
  componentWillMount = () => {
    this.props.fetchGroups();
  };

  handleChange = () => {};

  render() {
    console.log(this.props.groups);
    const items = this.props.groups.map(g => {
      return (
        <MenuItem value={g['@id']} key={g['@id']} primaryText={g['Name']} />
      );
    });

    return (
      <div>
        <DropDownMenu maxHeight={300} value={1} onChange={this.handleChange}>
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
    groups: state.groups
  };
};

// Define functions that modify store and are
// passed as props of App so that it
// can update store
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchGroups: () => {
      dispatch(fetchGroups());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupUser);
