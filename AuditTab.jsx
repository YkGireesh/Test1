import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { STATE } from '../../AppConstants';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getAppAudit } from '../../redux/actions/dashboard';
import { PrettyPrintJson } from '../Common/utils.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class AuditTab extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    this.props.getAppAudit(
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
    this.props.getAppAudit(
      () => {
        this.setState({ loading: false });
      },
      msg => {
        console.error(msg);
      }
    );
  };

  options = {
    defaultSortName: 'timestamp',
    defaultSortOrder: 'desc',
    clearSearch: true
  };

  dateFormatter = (cell, row) => {
    return moment(cell).format('DD/MM/YYYY -- HH:mm:ss:SS');
  };

  isExpandableRow = row => {
    if (row.data) return true;
    else return false;
  };

  expandComponent = row => {
    return <PrettyPrintJson data={row.data} />;
  };

  expandColumnComponent = ({ isExpandableRow, isExpanded }) => {
    let content = '';

    if (isExpandableRow) {
      content = isExpanded ? '(-)' : '(+)';
    } else {
      content = ' ';
    }
    return <div> {content} </div>;
  };

  handlerClickCleanFiltered = () => {
    this.refs.principalCol.cleanFiltered();
    this.refs.typeCol.cleanFiltered();
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
        <Row className="top-buffer pull-right audit-button-spacing">
          <Col xs={12}>
            <Button onClick={this.handlerClickCleanFiltered}>Clear Filters</Button>
            <Button onClick={this.refresh} bsStyle="primary" className="button-spacing">
              Refresh
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <BootstrapTable
              data={this.props.audit.events}
              striped
              hover
              options={this.options}
              pagination
              ignoreSinglePage
              search
              multiColumnSearch
              expandableRow={this.isExpandableRow}
              expandComponent={this.expandComponent}
              expandColumnOptions={{
                expandColumnVisible: true,
                expandColumnComponent: this.expandColumnComponent,
                columnWidth: 50
              }}
            >
              <TableHeaderColumn
                dataField="timestamp"
                isKey
                dataAlign="center"
                dataFormat={this.dateFormatter}
                dataSort
                width="25%"
              >
                Time Stamp
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="principal"
                dataAlign="center"
                filter={{
                  type: 'TextFilter',
                  delay: 10,
                  placeholder: 'Principal'
                }}
                width="25%"
                ref="principalCol"
              >
                Principal
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="type"
                dataAlign="center"
                filter={{
                  type: 'TextFilter',
                  delay: 10,
                  placeholder: 'Type'
                }}
                ref="typeCol"
              >
                Event Type
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: _.get(state, STATE.CURRENT_USER_PROFILE),
    audit: _.get(state, STATE.DASHBOARD_AUDIT)
  };
}

export default connect(mapStateToProps, { getAppAudit })(AuditTab);
