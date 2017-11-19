import React from 'react';
import Header from '../Header';
import DashboardCampaign from './DashboardCampaign';
import DoughnutContactsCount from './DoughnutContactsCount';
import LineEmailsOpenedByDayAndTag from './LineEmailsOpenedByDayAndTag';
import { Row, Col, ProgressBar, Card } from 'react-materialize';
import { fetchSpotlightedCampaigns } from '../../api/DashboardApi';
import _ from 'lodash';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      campaigns: [],
      isLoading: true
    }
  }


  componentDidMount() {
    this.fetchCampaigns();
  }


  fetchCampaigns() {
    fetchSpotlightedCampaigns()
      .done(response => this.setState({ isLoading: false, campaigns: response.campaigns, contactsCount: response.contactsCount, emailsOpenedToday: response.emailsOpenedToday, emailsSentToday: response.emailsSentToday, emailsOpenedByDayAndTag: response.emailsOpenedByDayAndTag, error: false }))
      .fail(response => this.setState({ isLoading: false, error: true }))
  }


  renderCampaigns() {
    const { campaigns, isLoading } = this.state;
    if (isLoading) {
      return(
        <div className="loading">
          <ProgressBar />
        </div>
      );
    } else if (campaigns.length > 0) {
      return(
        _.map(campaigns, campaign => {
          return(
            <DashboardCampaign key={ `campaign-${campaign.id}` } campaign={ campaign } />
          );
        })
      );
    } else if (!isLoading && campaigns.length < 1) {
      return(
        <Card
          title='No hay campañas 😅'
          actions={[<Link key='link-new-campaign' to='/campañas/nueva'>Crear campaña</Link>]}>
          Crea algunas para verlas acá
        </Card>
      );
    }
  }


  renderContactInfo() {
    const { contactsCount, emailsOpenedByDayAndTag, isLoading } = this.state;
    if (isLoading) {
      return null
    } else {
      return(
        <div className="contacts-info">
          <div className="section">
            <h5>Contactos agrupados por etiqueta</h5>
            <DoughnutContactsCount data={ contactsCount } />
          </div>

          <div className="section">
            <h5>Engagement de contactos por etiqueta</h5>
            <LineEmailsOpenedByDayAndTag data={ emailsOpenedByDayAndTag } />
          </div>

        </div>
      );
    }
  }


  renderTodayTotals() {
    const { emailsOpenedToday, emailsSentToday } = this.state;
    return(
      <div className='today-totals'>
        <div className="today-totals-opened"><span className='number'>{ emailsOpenedToday }</span><span className="text">Emails abiertos hoy</span></div>
        <div className="today-totals-sent"><span className="number">{ emailsSentToday }</span><span className="text">Emails enviados hoy</span></div>
      </div>
    );
  }


  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return(
        <div className="loading">
          <ProgressBar />
        </div>
      );
    } else {
      return(
  			<div>
  				<Header
  					title="Dashboard"/>
  				<div className="dashboard">
            { this.renderTodayTotals() }
            <Row>
              <Col s={12} m={6}>
                { this.renderCampaigns() }
              </Col>
              <Col s={12} m={6}>
                { this.renderContactInfo() }
              </Col>
            </Row>
  				</div>
  			</div>
    	);
    }
  }
}
