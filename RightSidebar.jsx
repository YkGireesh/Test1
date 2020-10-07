import React from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import { LABELS } from '../../MessagesEN';
import { LinkContainer } from 'react-router-bootstrap';
import { URLS } from '../../AppConstants';
import MarkAttendance from '../Attendance/MarkAttendance';
import GiveFeedback from '../Feedback/GiveFeedback';
// import BirthdayPanel from './BirthdayPanel';
import DUImageGalleryPopover from './DUImageGalleryPopover';
import QuizImageGalleryPopover from './QuizImageGalleryPopover';
import BadmintonGalleryPopover from './BadmintonGalleryPopover';
//const new_icon = require('../../assets/images/new_icon.jpg');

export default () => {
  return (
    <Row className="right-sidebar">
      <Col>
        <Panel header="News">
          <span>
            <ul>
              <li>
                <span>Quae cum essent dicta, discessimus</span>
              </li>
              <li>
                <span>An est aliquid, quod te sua sponte delectet</span>
              </li>
              <li>
                <span>Ad corpus diceres pertinere</span>
              </li>
            </ul>
          </span>
        </Panel>
        <Panel header="Feedback">
          <GiveFeedback />
        </Panel>
      </Col>
    </Row>
  );
};
