import React, { Component } from 'react';
import { Row, Col, Tabs, Tab, Panel, Breadcrumb } from 'react-bootstrap';
import InfoTab from './InfoTab';
import MetricsTab from './MetricsTab';
import AuditTab from './AuditTab';
import TraceTab from './TraceTab';
import { STATE, URLS } from '../../AppConstants';
import { LABELS } from '../../MessagesEN';
import { connect } from 'react-redux';
import _ from 'lodash';
import { LinkContainer } from 'react-router-bootstrap';

class DashboardPage extends Component {
  render() {
    return (
      <Row>
        <Col>
          {breadcrumbInstance}
          <Panel header={LABELS.DASHBOARD}>
            <Tabs defaultActiveKey="1" id="admin-dashboard">
              <Tab title={LABELS.DASHBOARD_INFO} eventKey="1">
                <InfoTab profile={this.props.profile} />
              </Tab>
              <Tab title={LABELS.DASHBOARD_METRICS} eventKey="2">
                <MetricsTab profile={this.props.profile} />
              </Tab>
              <Tab title={LABELS.DASHBOARD_TRACE} eventKey="3">
                <TraceTab profile={this.props.profile} />
              </Tab>
              <Tab title={LABELS.DASHBOARD_AUDIT} eventKey="4">
                <AuditTab profile={this.props.profile} />
              </Tab>
            </Tabs>
          </Panel>
        </Col>
      </Row>
    );
  }
}

const breadcrumbInstance = (
  <Breadcrumb>
    <LinkContainer to={URLS.ROOT}>
      <Breadcrumb.Item>{LABELS.HOME}</Breadcrumb.Item>
    </LinkContainer>
    <Breadcrumb.Item active>{LABELS.DASHBOARD}</Breadcrumb.Item>
  </Breadcrumb>
);

function mapStateToProps(state) {
  return {
    profile: _.get(state, STATE.CURRENT_USER_PROFILE),
  };
}

export default connect(mapStateToProps)(DashboardPage);
