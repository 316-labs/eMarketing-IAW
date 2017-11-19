import React from 'react';
import Header from '../Header';
import $ from 'jquery';
import { Row, Col, ProgressBar, Table, Button, Icon } from 'react-materialize';
import ContactEmail from './ContactEmail';
import { notify } from 'react-notify-toast';
import _ from 'lodash';

export default class ShowCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: {
        title: '',
        body: '',
        contacts: []
      },
      isLoading: true
    }
    this.id = props.match.params.id;
    this.getCampaign();
  }


  getCampaign() {
    this.setState({ isLoading: true });
    const id = this.id;
    $.ajax({
      url: `${process.env.REACT_APP_API_HOST}/v1/campaigns/${ id }`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
      method: 'get'
    })
      .done(response => {
        this.setState({
          campaign: response,
          isLoading: false,
          error: false
        });
      })
      .fail(response => {
        this.setState({
          error: true,
          isLoading: false
        });
      })
  }


  sendCampaign() {
    this.setState({ isLoading: true })
    const { campaign } = this.state;
    const config = {
      url: `${process.env.REACT_APP_API_HOST}/v1/campaigns/${campaign.id}/send_emails`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
      method: 'post'
    }
    $.ajax(config)
      .always(() => this.setState({ isLoading: false }))
      .done(response => notify.show(response.message, 'success'))
      .fail(() => notify.show('Hubo un error al procesar tu pedido', 'error'))
  }


  createMarkup() {
    return {
      __html: this.state.campaign.body
    };
  }


  renderContact(contact, index) {
    return(
      <ContactEmail
        key={ `contact-${contact.id}` }
        campaignId={ this.id }
        contact={ contact }
        index={ index }/>
    )
  }


  renderStatistics() {
    const { campaign } = this.state;
    const table = (
      <Table>
        <thead>
          <tr>
            <th>Evento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Envios realizados</td>
            <td>{ campaign.sentTimes }</td>
          </tr>
          <tr>
            <td>Mail fue abierto</td>
            <td>{ campaign.openedTimes }</td>
          </tr>
          <tr>
            <td>Clicks en el mail</td>
            <td>{ campaign.clicks }</td>
          </tr>
        </tbody>
      </Table>
    );
    return (
      <div className="statistics">
        <p className="field-label">Estadísticas</p>
        { table }
      </div>
    )
  }


  renderCampaign() {
    const campaign = this.state.campaign;
    if (!_.isEmpty(campaign)) {
      return(
        <div className="campaign">
          <Row>
            <Col s={12} m={8}>
              <p className='field-label'>Previsualización { campaign.spotlighted && <Icon className='orange-text'>star</Icon> }</p>
              <div className="campaign-body" dangerouslySetInnerHTML={ this.createMarkup() }></div>
              { this.renderStatistics() }
            </Col>
            <Col s={12} m={4}>
              <p className="field-label">Contactos</p>
              <div className="campaign-contacts">
                { campaign.contacts.map((contact, index) => this.renderContact(contact, index)) }
              </div>
            </Col>
          </Row>
        </div>
      );
    } else {
      return null;
    }
  }


	render() {
    const { isLoading, campaign } = this.state;
		return (
			<div className='campaign-show'>
				<Header
          title={ `${campaign.title}` }
          back='/campañas'
          action={ () => this.sendCampaign() }
          actionName='Enviar a todos'
          actionClassName='send-button'/>
				<div className="container">
          {
            isLoading &&
              <div className="center">
                <ProgressBar />
              </div>
          }
          { this.renderCampaign() }
          <Button floating large className='bottom-right-btn' waves='light' icon='edit' onClick={ () => this.props.history.push(`/campañas/${campaign.id}/editar`) }/>
				</div>
			</div>
		);
	}
}