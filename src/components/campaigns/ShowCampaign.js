import React from 'react';
import Header from '../Header';

class ShowCampaign extends React.Component {

	render() {
		return (
			<div className='campaign-show'>
				<Header
					title='Ver Campaña'/>
				<div className="container">
					<p>Viendo campaña</p>
				</div>
			</div>
		);
	}
}

export default ShowCampaign;