import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from '../Home/HomePage';
import About from '../About/AboutPage';
import EditUserProfilePage from '../Profile/EditUserProfilePage';
import SecurityPage from '../Security/SecurityPage';
import IdeaHomePage from '../Idea/IdeaHomePage';
import ViewIdeaPage from '../Idea/ViewIdeaPage';
import NewIdeaPage from '../Idea/NewIdeaPage';
import NewOriginationPage from '../Origination/NewOriginationPage';
import OriginationHomePage from '../Origination/OriginationHomePage';
import ViewOriginationPage from '../Origination/ViewOriginationPage';
import IdeaDashboardPage from '../Idea/IdeaDashboardPage';
import UserProfilePage from '../Profile/UserProfilePage';
import EmployeeRosterPage from '../Roster/EmployeeRosterPage';
import DashboardPage from '../Dashboard/DashboardPage';
import FeedbackPage from '../Feedback/FeedbackPage';
import AttendanceReportsPage from '../Reports/Attendance/AttendanceReportsPage';
import IdeaReportsPage from '../Reports/Ideas/IdeaReportsPage';
import LeftSidebar from '../Common/LeftSidebar';
//import RightSidebar from '../Common/RightSidebar';
import TeamProfilePage from '../Team/TeamProfilePage';
import TeamHomePage from '../Team/TeamHomePage';
import { STATE } from '../../AppConstants';
import { Route, Switch } from 'react-router-dom';
import { URLS } from '../../AppConstants';
import { LABELS } from '../../MessagesEN';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { fetchUserProfile } from '../../redux/actions/user';
import { dismissError } from '../../redux/actions/app';
import BlendedRateContainer from '../BlendedRate/BlendedRateContainer';
import _ from 'lodash';

import EvidenceReview from '../ERP/EvidenceReview';
import EvidenceReviewPage from '../ERP/EvidenceReviewPage';
import ERPDashboard from '../ERP/ERPDashboard';
import ERPReporting from '../ERP/ERPReporting';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
//   UNSAFE_componentWillMount() {
//     if (this.props.authenticated) {
//       if (!this.props.profile) {
//         this.props.fetchUserProfile(() => {
//           this.setState({ loading: false });
//         });
//       } else {
//         this.setState({ loading: false });
//       }
//     }
//   }
//   UNSAFE_componentWillReceiveProps(nextProps) {
//     if (nextProps.profile && !nextProps.profile.profileUpdated && nextProps.location.pathname !== URLS.EDIT_PROFILE) {
//       this.props.history.push(URLS.EDIT_PROFILE);
//     }
//   }
//   handleAlertDismiss = () => {
//     this.props.dismissError();
//   };
  render() {
    // if (!this.props.authenticated || !this.props.profile) {
    //   return null;
    // } else if (this.state.loading) {
    //   return null;
    // } else {
      return (
        <Row>
          <Col xsHidden className="left-sidebar-col">
            {/* {this.props.profile.profileUpdated && <LeftSidebar roles={this.props.profile.roles} />}
            {!this.props.profile.profileUpdated && <Col sm={2} />} */}
          </Col>
          <Col xs={12} sm={10} md={10} className="main-col">
            {/* {this.props.errorMsg && (
              <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                <p>
                  {this.props.errorMsg}
                  <Button onClick={this.handleAlertDismiss}>{LABELS.DISMISS}</Button>
                </p>
              </Alert>
            )} */}
            <Switch>
              {/* <Route exact path={URLS.PROFILE} component={UserProfilePage} />
              <Route exact path={URLS.EDIT_PROFILE} component={EditUserProfilePage} />
              <Route exact path={URLS.EDIT_SECURITY} component={SecurityPage} />
              <Route exact path={URLS.NAVRITI_NEW} component={NewIdeaPage} />
              <Route exact path={URLS.NAVRITI_DASHBOARD} component={IdeaDashboardPage} />
              <Route exact path={URLS.VIEW_IDEA} component={ViewIdeaPage} />
              <Route exact path={URLS.NAVRITI} component={IdeaHomePage} />
              <Route exact path={URLS.FEEDBACK} component={FeedbackPage} />
              <Route exact path={URLS.ATTENDANCE_REPORTS} component={AttendanceReportsPage} />
              <Route exact path={URLS.IDEA_REPORTS} component={IdeaReportsPage} />
              <Route exact path={URLS.ROSTER} component={EmployeeRosterPage} /> */}
              {/* <Route exact path={URLS.DASHBOARD} component={DashboardPage} /> */}
              {/* <Route exact path={URLS.TEAM_PROFILE} component={TeamProfilePage} />
              <Route exact path={URLS.TEAM} component={TeamHomePage} /> */}
              <Route exact path={URLS.ROOT} component={HomePage} />
              <Route exact path={URLS.ABOUT} component={About} />
              {/* <Route exact path={URLS.ORIGINATION_NEW} component={NewOriginationPage} />
              <Route exact path={URLS.ORIGINATION} component={OriginationHomePage} />
              <Route exact path={URLS.VIEW_ORIGINATION} component={ViewOriginationPage} />
              <Route exact path={URLS.AUTOMATION} component={IdeaHomePage} />
              <Route exact path={URLS.AUTOMATION_DASHBOARD} component={IdeaDashboardPage} />
              <Route exact path={URLS.BLENDED_RATE} component={BlendedRateContainer} /> */}

              <Route exact path={URLS.ERP} component={EvidenceReview} />
              <Route exact path={URLS.ERP_PAGE} component={EvidenceReviewPage} />
              <Route exact path={URLS.ERP_DASHBOARD} component={ERPDashboard} />
              <Route exact path={URLS.ERP_REPORTING} component={ERPReporting} />
            </Switch>
          </Col>
          {/* <Col md={2} xsHidden smHidden className="right-sidebar-col pull-right">
            {this.props.profile.profileUpdated && <RightSidebar birthdays={this.props.birthdays} />}
            {!this.props.profile.profileUpdated && <Col sm={2} />}
          </Col> */}
        </Row>
      );
    }
}
//     }
//   }
//}

// function mapStateToProps(state) {
//   return {
//     authenticated: _.get(state, STATE.AUTHENTICATED_FLAG),
//     profile: _.get(state, STATE.CURRENT_USER_PROFILE),
//     errorMsg: _.get(state, STATE.ERROR_MESSAGE),
//   };
// }

// export default connect(mapStateToProps, { fetchUserProfile, dismissError })(MainContainer);
export default MainContainer;
