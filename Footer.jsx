import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { URLS } from '../../AppConstants';
import { LABELS, MSG } from '../../MessagesEN';

export default () => {
  return (
    <div>
      <Row className="footer-row">
        <Col sm={12} className="navbar">
          <footer>
            <span className="copyrightFooter">{MSG.COPYRIGHT}</span>
            <span className="footerLinks">
              <a href={URLS.TERMS} target="_blank" rel="noopener noreferrer">
                {LABELS.TERMS}
              </a>
            </span>
            <span className="footerLinks">
              <a href={URLS.BUILD} target="_blank" rel="noopener noreferrer">
                {LABELS.BUILD}
              </a>
            </span>
          </footer>
        </Col>
      </Row>
    </div>
  );
};
