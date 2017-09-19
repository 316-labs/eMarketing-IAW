import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../logo.png';

class Sidebar extends React.Component {
	render() {
		return(
			<div className="sidebar">
        <div className="logo">
				  <img src={ LogoImage } alt="logo"/>
          <p>eMarketing</p>
        </div>
				<ul>
					<li><Link to='/'>Inicio</Link></li>
					<li><Link to='/campañas'>Campañas</Link></li>
					<li><Link to='/contactos'>Contactos</Link></li>
				</ul>

        <div className="crear-campana">
          <Link to='/campañas/nueva' className='crear-campana'>Crear campaña</Link>
        </div>

        <div className="salir">
          <input type="button" className="sidebar-btn" onClick={ () => this.props.logout() } value="Salir" />
        </div>

			</div>
		);
	}
}

export default Sidebar;

