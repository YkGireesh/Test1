import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { STATE } from '../../AppConstants';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getAppTrace } from '../../redux/actions/dashboard';
import { PrettyPrintJson } from '../Common/utils.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

class TraceTab extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    this.props.getAppTrace(
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
    this.props.getAppTrace(
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
    return true;
  };

  expandComponent = row => {
    return <PrettyPrintJson data={row.info.headers} />;
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
    this.refs.pathCol.cleanFiltered();
    this.refs.methodCol.cleanFiltered();
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
              data={this.props.trace}
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
                Time StampÍ
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="path"
                dataAlign="center"
                filter={{
                  type: 'TextFilter',
                  delay: 10,
                  placeholder: 'Path'
                }}
                dataSort
                width="35%"
                ref="pathCol"
              >
                API Path
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="method"
                dataAlign="center"
                filter={{
                  type: 'TextFilter',
                  delay: 10,
                  placeholder: 'Method'
                }}
                ref="methodCol"
              >
                Method
              </TableHeaderColumn>
              <TableHeaderColumn dataField="timeTaken" dataAlign="center" dataSort>
                Time Taken
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
    trace: _.get(state, STATE.DASHBOARD_TRACE)
  };
}

export default connect(mapStateToProps, { getAppTrace })(TraceTab);
