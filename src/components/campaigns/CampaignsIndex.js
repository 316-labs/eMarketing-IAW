import React from 'react';
import Header from '../Header';
import CampaignIndex from './CampaignIndex';
import $ from 'jquery';
import { ProgressBar, Card, Row, Input, Button } from 'react-materialize';
import { notify } from 'react-notify-toast';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class CampaignsIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      error: false,
      campaigns: [],
      titleSearch: '',
      orderBy: ''
    }
  }


  componentDidMount() {
    this.fetchCampaigns();
  }


  fetchCampaigns() {
    this.setState({ isLoading: true });
    const config = {
      url: `${process.env.REACT_APP_API_HOST}/v1/campaigns`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
      method: 'get'
    }
    $.ajax(config)
      .done(response => this.onFetchSuccess(response))
      .fail(response => this.onFetchFail(response))
  }


  onFetchSuccess(response) {
    this.setState({
      isLoading: false,
      error: false,
      campaigns: response
    })
  }


  onFetchFail(response) {
    this.setState({
      isLoading: false,
      error: true
    })
  }


  deleteCampaign(campaign) {
    this.setState({
      isLoading: true
    });
    $.ajax({
      url: `${process.env.REACT_APP_API_HOST}/v1/campaigns/${ campaign.id }`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
      method: 'DELETE'
    })
      .done(response => {
        let campaigns = this.state.campaigns;
        _.remove(campaigns, c => c.id === campaign.id);
        this.setState({
          isLoading: false,
          error: false,
          campaigns
        })
        notify.show('Campaña eliminada exitosamente', 'success');
      })
      .fail(response => {
        this.setState({
          isLoading: false,
          error: true
        })
        notify.show('Hubo un error al tratar de eliminar esta campaña', 'error');
      })
  }


  handleOrdering(e) {
    console.log('handling ordering');
  }


  handleSearch(e) {
    e.preventDefault();
    const value = e.target.value;
    this.setState({
      titleSearch: value
    });
    console.log('handling search');
  }


  renderLoader() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="center">
          <ProgressBar />
        </div>
      );
    }
  }


  renderError() {
    const { error } = this.state;
    if (error) {
      return (
        <Card title='Hubo un error 😢'>Lo sentimos ocurrió un error al procesar tu pedido</Card>
      );
    }
  }


  renderCampaigns() {
    const { campaigns, error, isLoading } = this.state;
    if (!error && !_.isEmpty(campaigns)) {
      return campaigns.map((campaign, index) => this.renderCampaign(campaign, index));
    } else if (!error && !isLoading && _.isEmpty(campaigns)) {
      return (
        <Card
          title='No hay campañas 😅'
          actions={[<Link key='link-new-campaign' to='/campañas/nueva'>Crear campaña</Link>]}>
          Crea algunas para verlas acá
        </Card>
      );
    }
  }


  renderCampaign(campaign, index) {
    return (
      <CampaignIndex
        key={ `campaign-${campaign.id}`}
        campaign={ campaign }
        index={ index }
        deleteCampaign={ (c) => this.deleteCampaign(c) }
        history={ this.props.history } />
    );
  }


  renderActions() {
    const { titleSearch } = this.state;
    return (
      <Row className="acciones">
        <Input s={12} m={6} type="select" name="ordenar" id="ordenar" value="" onChange={ (e) => this.handleOrdering(e) }>
          <option value="">Ordenar por ...</option>
          <option value="title">Titulo</option>
          <option value="created_at">Fecha de creación</option>
        </Input>
        <form action="#" onSubmit={ (e) => this.handleSearch(e) }>
          <Input s={12} m={4}
                 type="text"
                 name="title"
                 id="search-title"
                 value={ titleSearch }
                 onChange={ (e) => this.handleSearch(e) }
                 className='search'
                 placeholder='Buscar por título' />
          <Input s={12} m={2}
                 type="submit"
                 value="Buscar"
                 className="btn btn-primary" />
         </form>
      </Row>
    );
  }

	render() {

		return (
			<div className='campaigns'>
				<Header
					title='Campañas' />
				<div className="container">
          { this.renderActions() }
          { this.renderLoader() }
          { this.renderError() }
          { this.renderCampaigns() }
          <Button floating large className='bottom-right-btn' waves='light' icon='add' onClick={ () => this.props.history.push(`/campañas/nueva`) }/>
				</div>
			</div>
		);
	}
}

export default CampaignsIndex;