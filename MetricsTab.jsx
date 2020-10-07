import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { STATE } from '../../AppConstants';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getAppMetrics } from '../../redux/actions/dashboard';
import { PrettyPrintJson } from '../Common/utils.js';

class MetricsTab extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    this.props.getAppMetrics(
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
    this.props.getAppMetrics(
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
            <h4>/metrics:</h4>
            <PrettyPrintJson data={this.props.metrics} />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: _.get(state, STATE.CURRENT_USER_PROFILE),
    metrics: _.get(state, STATE.DASHBOARD_METRICS)
  };
}

export default connect(mapStateToProps, { getAppMetrics })(MetricsTab);
