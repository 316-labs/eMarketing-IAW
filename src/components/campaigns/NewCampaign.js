import React from 'react';
import Header from '../Header';
import CampaignForm from './CampaignForm';

class NewCampaign extends React.Component {

	render() {
		return (
			<div className='campaign-new'>
				<Header
					title='Nueva Campaña'/>
				<div className="container">
					<CampaignForm />
				</div>
			</div>
		);
	}
}

export default NewCampaign;