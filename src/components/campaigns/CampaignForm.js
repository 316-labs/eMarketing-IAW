import React from 'react';

class CampaignForm extends React.Component {

	render() {
		// const { campaign } = this.props;
		return (
			<div>
				<label htmlFor="title">Título</label>
				<input type="text" name='title'/>
			</div>
		);
	}
}

export default CampaignForm;