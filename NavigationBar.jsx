import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STATE } from '../../AppConstants';
import _ from 'lodash';
import NavbarPublic from './NavbarPublic';
import NavbarSecure from './NavbarSecure';

class NavigationBar extends Component {
  render() {
    if (!this.props.authenticated) {
      return <NavbarPublic />;
    } else if (!this.props.profile) {
      return null;
    } else {
      return (
        <NavbarSecure
          enterpriseId={this.props.profile.enterpriseId}
          lastPhotoUpdated={
            this.props.profile.details.personal.lastPhotoUpdated
          }
        />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    authenticated: _.get(state, STATE.AUTHENTICATED_FLAG),
    profile: _.get(state, STATE.CURRENT_USER_PROFILE)
  };
}

export default connect(mapStateToProps, null, null, {
  pure: false
})(NavigationBar);
