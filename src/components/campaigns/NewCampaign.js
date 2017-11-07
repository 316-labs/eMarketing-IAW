import React from 'react';
import Header from '../Header';
import CampaignForm from './CampaignForm';
import Loader from '../Loader';
import $ from 'jquery';
import { notify } from 'react-notify-toast';

class NewCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: {}
    }
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
      url: `${process.env.REACT_APP_API_HOST}/v1/campaigns`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
      method: 'post',
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
        notify.show('La campaña fue creada exitósamente', 'success');
        this.props.history.push(`/campaña/${response.id}`);
      })
      .fail(response => {
        this.setState({ isLoading: false, error: true });
        notify.show('Hubo un error al procesar tu pedido', 'error');
      })
  }

	render() {
    const { isLoading, campaign } = this.state;
		return (
			<div className='campaigns-new'>
				<Header
					title='Nueva Campaña'
          back='/campañas'
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

export default NewCampaign;