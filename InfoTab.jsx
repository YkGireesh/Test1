import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { STATE } from '../../AppConstants';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getAppInfo } from '../../redux/actions/dashboard';
import { PrettyPrintJson } from '../Common/utils.js';

class InfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    this.props.getAppInfo(
      () => {
        this.setState({ loading: false });
      },
      msg => {
        this.setState({ loading: false });
      }
    );
  }

  refresh = () => {
    this.setState({ loading: true });
    this.props.getAppInfo(
      () => {
        this.setState({ loading: false });
      },
      msg => {
        console.error(msg);
      }
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <Row>
          <Col xs={12} className="text-centered">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
          </Col>
        </Row>
      );
    }
    return (
      <div>
        <Row className="top-buffer pull-right">
          <Col xs={12}>
            <Button onClick={this.refresh} bsStyle="primary">
              Refresh
            </Button>
          </Col>
        </Row>
        <Row className="top-buffer">
          <Col xs={12}>
            <h4>/info:</h4>
            <PrettyPrintJson data={this.props.info} />
          </Col>
        </Row>
        <Row className="top-buffer">
          <Col xs={12}>
            <h4>/health:</h4>
            <PrettyPrintJson data={this.props.health} />
          </Col>
        </Row>
        <Row className="top-buffer">
          <Col xs={12}>
            <h4>/env:</h4>
            <PrettyPrintJson data={this.props.env} />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: _.get(state, STATE.CURRENT_USER_PROFILE),
    info: _.get(state, STATE.DASHBOARD_INFO),
    health: _.get(state, STATE.DASHBOARD_HEALTH),
    env: _.get(state, STATE.DASHBOARD_ENV)
  };
}

export default connect(mapStateToProps, { getAppInfo })(InfoTab);
