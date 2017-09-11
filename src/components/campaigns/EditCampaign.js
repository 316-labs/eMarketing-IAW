import React from 'react';
import

class EditCampaign extends React.Component {

	render() {
		const { campaign } = this.props;
		return (
			<div className='campaign-edit'>
				<Header
					title='Editar Campaña'>
				<div className="container">
					<CampaignForm />
				</div>
			</div>
		);
	}
}

export default EditCampaign;