import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { URLS, STATE } from '../../AppConstants';
import { LABELS } from '../../MessagesEN';
import _ from 'lodash';

class Header extends Component {
  render() {
    return (
      <header>
        <Row>
          <Col xs={12} sm={8} smOffset={2}>
            <span>{LABELS.APP_NAME}</span>

            {!this.props.authenticated && (
              <span className="headerPills">
                <Link className="linkPill" to={URLS.SIGN_IN}>
                  {LABELS.SIGN_IN}
                </Link>
                <Link className="linkPill" to={URLS.SIGN_UP}>
                  {LABELS.SIGN_UP}
                </Link>{' '}
              </span>
            )}
            <span>
              {this.props.authenticated && (
                <Link className="linkPill" to={URLS.SIGN_OUT}>
                  {LABELS.SIGN_OUT}
                </Link>
              )}
            </span>
          </Col>
        </Row>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: _.get(state, STATE.AUTHENTICATED_FLAG) };
}

export default connect(mapStateToProps)(Header);
