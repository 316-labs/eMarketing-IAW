import React from 'react';
import Header from '../Header';
import CampaignForm from './CampaignForm';
import Loader from '../Loader';
import $ from 'jquery';
import { notify } from 'react-notify-toast';

export default class EditCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: {}
    }
    this.id = props.match.params.id;
    this.fetchCampaign();
  }


  fetchCampaign() {
    this.setState({ isLoading: true });
    const config = {
      url: `${process.env.REACT_APP_API_HOST}/v1/campaigns/${this.id}`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
      method: 'get'
    }
    $.ajax(config)
      .done(response => this.setState({ isLoading: false, error: false, campaign: response }))
      .fail(response => this.setState({ isLoading: false, error: true }))
  }


  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let campaign = this.state.campaign;
    campaign[name] = value;
    this.setState({
      campaign
    });
  }


  handleBodyChange(v) {
    let campaign = this.state.campaign;
    campaign.body = v;
    this.setState({
      campaign
    });
  }


  save() {
    this.setState({ isLoading: true });
    const { campaign } = this.state;
    const config = {
      url: `${process.env.REACT_APP_API_HOST}/v1/campaigns/${campaign.id}`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
      method: 'put',
      data: {
        campaign: {
          title: campaign.title,
          body: campaign.body
        }
      }
    }
    $.ajax(config)
      .done(response => {
        this.setState({ isLoading: false, error: false });
        notify.show('La campaña fue editada exitósamente', 'success');
        this.props.history.push(`/campañas/${response.id}`);
      })
      .fail(response => {
        this.setState({ isLoading: false, error: true });
        notify.show('Hubo un error al procesar tu pedido', 'error');
      })
  }


	render() {
    const { isLoading, campaign } = this.state;
		return (
			<div className='campaign-edit'>
				<Header
					title='Editar Campaña'
          back={ `/campañas/${campaign.id}` }
          action={ () => this.save() }
          actionName='Guardar'
          actionClassName='save-button'/>
				<div className="container">
        {
          isLoading ?
            <Loader />
          :
  					<CampaignForm
              campaign={ campaign }
              handleChange={ (e) => this.handleChange(e) }
              handleBodyChange={ (v) => this.handleBodyChange(v) }/>
        }
				</div>
			</div>
		);
	}
}