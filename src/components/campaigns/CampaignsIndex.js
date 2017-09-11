import React from 'react';
import Header from '../Header';
import CampaignIndex from './CampaignIndex';

class CampaignsIndex extends React.Component {

	render() {
		return (
			<div className='campaign-index'>
				<Header
					title='Campañas'/>
				<div className="container">
					<CampaignIndex />
					<CampaignIndex />
					<CampaignIndex />
				</div>
			</div>
		);
	}
}

export default CampaignsIndex;