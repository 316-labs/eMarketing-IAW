import React from 'react';
import Header from '../Header';

class Tags extends React.Component {

	render() {
		return (
			<div className="tags">
				<Header title='Etiquetas' />
				<div className="container">
					<p>etiquetas aquí</p>
				</div>
			</div>
		);
	}
}

export default Tags;