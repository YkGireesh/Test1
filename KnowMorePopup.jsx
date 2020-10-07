import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Modal from '../Common/Modal';
const hyderabad_charminar = require('../../assets/images/hyderabad_charminar.png');
const leading_in_the_new = require('../../assets/images/leading_in_the_new.png');
const manila_representation = require('../../assets/images/manilaRepresentation.png');

class KnowMorePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showPopOver: false,
      showManilaPopOver: false,
      modalHeaderString: '',
    };
  }

  close = () => {
    this.setState({ showModal: false });
  };

  showPopOver = () => {
    this.setState({ showPopOver: true });
  };

  hidePopOver = () => {
    this.setState({ showPopOver: !this.state.showPopOver });
  };

  showManilaPopOver = () => {
    this.setState({ showManilaPopOver: true });
  };

  hideManilaPopOver = () => {
    this.setState({ showManilaPopOver: !this.state.showManilaPopOver });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  render() {
    return (
      <div>
        <span className="knowMoreAboutUs" onClick={this.open}>
          Know More
        </span>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="lg" dialogClassName="footPrintModal">
          <Modal.Body bsClass="footPrintModalBody">
            <button type="button" className="close manualClose" onClick={this.close}>
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
            <div className="hydBlock" onMouseEnter={this.showPopOver} onMouseLeave={this.hidePopOver} />
            <div className="manilaBlock" onMouseEnter={this.showManilaPopOver} onMouseLeave={this.hideManilaPopOver} />
            <div
              className={this.state.showPopOver ? 'hydContent' : 'hydContentHide'}
              onMouseEnter={this.showPopOver}
              onMouseLeave={this.hidePopOver}
            >
              <Col md={2} className="hydRepresentDiv">
                <img src={leading_in_the_new} alt="Explore Cigna" className="accLeadingImage" />
                <img src={hyderabad_charminar} alt="Explore Cigna" className="hydCharminarImage" />
                <span className="locationNameHyd">HYDERABAD</span>
              </Col>
              <Col md={10} className="hydContentText">
                <p>
                  Hyderabad is the capital of the Indian state of Telangana . Hyderabad means "Haydar's city" or "lion
                  city", from haydar (lion) and ābād (city), and was named to honor the Caliph Ali Ibn Abi Talib
                  .Established in 1591 by Muhammad Quli Qutb Shah, Hyderabad remained under the rule of the Qutb Shahi
                  dynasty for nearly a century before the Mughals captured the region. It was brought into the Indian
                  Union in 1948, and became the capital of Andhra Pradesh
                </p>
                <p>
                  Hyderabad was historically known as a pearl and diamond trading center, and it continues to be known
                  as the "City of Pearls“.
                </p>
                <p>
                  Hyderabad is among the global centers of information technology for which it is known
                  as Cyberabad (Cyber City). The city's IT sector includes the IT-enabled services, business process
                  outsourcing, entertainment industries, and Financial services.
                </p>
                <br />
                <p>
                  Accenture has 4 Development Centers in Hyderabad. Cigna Engagement operates from HDC2 , Financial
                  District .
                  <br />
                  200+ people in ATCI are working on this engagement from Hyderabad.
                </p>
                <p>
                  Offshore Project MD : <strong>Bappaditya Mallick</strong>
                </p>
                <p>
                  DU Lead : <strong>Satya Panigrahy</strong>
                </p>
              </Col>
            </div>
            <div
              className={this.state.showManilaPopOver ? 'manilaContent' : 'manilaContentHide'}
              onMouseEnter={this.showManilaPopOver}
              onMouseLeave={this.hideManilaPopOver}
            >
              <Col md={2} className="hydRepresentDiv">
                <img src={leading_in_the_new} alt="Explore Cigna" className="accLeadingImage" />
                <img src={manila_representation} alt="Explore Cigna" className="hydCharminarImage" />
                <span className="locationNameManila">MANILA</span>
              </Col>
              <Col md={10} className="hydContentText">
                <p>
                  Metropolitan Manila is the seat of government and one of the three defined metropolitan areas of the
                  Philippines. It is officially known as the National Capital Region (NCR), and is commonly known as
                  Metro Manila or simply Manila and is made up of 16 cities.
                </p>
                <p>
                  The region was established in 1975 in response to the needs to sustain the growing population and for
                  the creation for the center of political power and the seat of the Government of the Philippines. The
                  region is the center of culture, economy, education and government of the Philippines. Designated as a
                  global power city, NCR exerts a significant impact on commerce, finance, media, art, fashion,
                  research, technology, education, and entertainment, both locally and internationally. It is the home
                  to all the consulates and embassies in the Philippines, thereby making it an important center for
                  international diplomacy in the country. Its economic power makes the region the country's premier
                  center for finance and commerce.
                </p>
                <p>
                  Accenture has 6 Delivery Centers in 4 major cities of Metro Manila and Cigna project is located at
                  Uptown Tower 2 in Taguig and another one in 1880 Building in Quezon City with a total of 150+
                  individuals working on this engagement.
                </p>
              </Col>
            </div>

            <img
              src={'https://expressbeats.accenture.com/images/accenture_footprint.jpg'}
              alt="Explore Cigna"
              className="footPrintImage"
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default KnowMorePopup;
