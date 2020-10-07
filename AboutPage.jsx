import React, { Component } from 'react';
import { Row, Col, Panel, Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { STATE, URLS } from '../../AppConstants';
import { LABELS } from '../../MessagesEN';
import { connect } from 'react-redux';
import _ from 'lodash';
const know_more_esi = require('../../assets/images/know_more_esi.png');
const client_co_innovation = require('../../assets/images/client_co_innovation.png');
const accenture_presence = require('../../assets/images/accenture_presence.png');
const erp_about = require('../../assets/images/erp-about.png');
require('../../assets/styles/NewJoin.css');

class About extends Component {
  render() {
    return (
      <Row>
        <Col>
          {breadcrumbInstance}
          <Panel header={LABELS.ABOUT}>
            <div className="aboutUsDiv">
              <div className="col-md-4 aboutUsExploreEsiImageDiv">
                <img src={erp_about} alt="Explore Cigna" className="aboutUsExploreEsiImage" />
              </div>
              <div className="col-md-8 aboutUsKnowMoreBlock">
                <Col xs={12} md={3} className="padding0">
                  <img src={know_more_esi} alt="Explore Cigna" className="aboutUsContentImage" />
                  <div className="aboutUsImageText">KNOW MORE ABOUT ERP</div>
                </Col>
                <Col xs={12} md={9} className="aboutUsKnowMoreContent">
                  Duo Reges: constructio interrete. Quid ergo aliud intellegetur nisi uti ne quae pars naturae
                  neglegatur? Verba tu fingas et ea dicas, quae non sentias? Cur tantas regiones barbarorum pedibus
                  obiit, tot maria transmisit? Bonum negas esse divitias, praeposìtum esse dicis? Ita multa dicunt, quae
                  vix intellegam. Ergo ita: non posse honeste vivi, nisi honeste vivatur.
                  <br />
                  Videmusne ut pueri ne verberibus quidem a contemplandis rebus perquirendisque deterreantur.{' '}
                  {/*Read More*/}
                </Col>
              </div>
              <div className="col-md-8 aboutUsSalientFeaturesBlock">
                <Col xs={12} md={3} className="padding0">
                  <img src={client_co_innovation} alt="Explore ESI" className="aboutUsContentImage" />
                  <div className="aboutUsImageText">Client Co Innovation</div>
                </Col>
                <Col xs={12} md={9} className="aboutUsSalientFeaturesContent">
                  <ul className={'tickList'}>
                    <li>Sin kakan malitiam dixisses, ad aliud nos unum certum vitium consuetudo Latina traduceret.</li>
                    <li>
                      Et quidem illud ipsum non nimium probo et tantum patior, philosophum loqui de cupiditatibus
                      finiendis.
                    </li>
                    <li>Tum Quintus: Est plane, Piso, ut dicis, inquit.</li>
                    <li>
                      Nunc reliqua videamus, nisi aut ad haec, Cato, dicere aliquid vis aut nos iam longiores sumus.
                    </li>
                  </ul>
                </Col>
              </div>
              <div className="col-md-8 aboutUsTrainingsBlock">
                <Col xs={12} md={3} className="padding0">
                  <img src={accenture_presence} alt="Explore ESI" className="aboutUsContentImage" />
                  <div className="aboutUsImageText">Accenture</div>
                </Col>
                <Col xs={12} md={9} className="padding10">
                  Tertium autem omnibus aut maximis rebus iis, quae secundum naturam sint, fruentem vivere. Nihil opus
                  est exemplis hoc facere longius. Quae quidem sapientes sequuntur duce natura tamquam videntes; Nam
                  memini etiam quae nolo, oblivisci non possum quae volo. Vos autem cum perspicuis dubia debeatis
                  illustrare, dubiis perspicua conamini tollere.
                </Col>
              </div>
            </div>
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
    <Breadcrumb.Item active>{LABELS.ABOUT}</Breadcrumb.Item>
  </Breadcrumb>
);

function mapStateToProps(state) {
  return { profile: _.get(state, STATE.CURRENT_USER_PROFILE) };
}

export default connect(mapStateToProps)(About);
