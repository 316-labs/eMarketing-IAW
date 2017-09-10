import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
	render() {
		return(
			<div className="sidebar">
				<h1>Sidebar</h1>
				<ul>
					<li><Link to='/'>Inicio</Link></li>
					<li><Link to='/contactos'>Contactos</Link></li>
				</ul>
			</div>
		);
	}
}

export default Sidebar;

