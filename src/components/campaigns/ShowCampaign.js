import React from 'react';
import Header from '../Header';
import $ from 'jquery';
import { Row, Col, ProgressBar } from 'react-materialize';

export default class ShowCampaign extends React.Component {
  constructor() {
    super();
    this.state = {
      campaign: {},
      isLoading: true
    }
  }


  componentDidMount() {
    this.getCampaign();
  }


  getCampaign() {
    this.setState({ isLoading: true });
    const id = this.props.match.params.id;
    $.ajax({
      url: `${process.env.REACT_APP_API_HOST}/v1/campaigns/${ id }`,
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


  createMarkup() {
    return {
      __html: this.state.campaign.body
    };
  }


  renderCampaign() {
    const campaign = this.state.campaign;
    return(
      <div className="campaign">
        <h1 className='title'>{ campaign.title }</h1>
        <p className="body" dangerouslySetInnerHTML={ this.createMarkup() }></p>
      </div>
    );
  }


	render() {
    const { isLoading } = this.state;
    const id = this.props.match.params.id;
		return (
			<div className='campaign-show'>
				<Header
          title={ `Campaña #${ id }` } />
				<div className="container">
					<Row>
            <Col s={12} m={8}>
              {
                isLoading ?
                  <div className="center">
                    <ProgressBar />
                  </div>
                :
                  this.renderCampaign()
              }
            </Col>
          </Row>
				</div>
			</div>
		);
	}
}