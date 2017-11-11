import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../logo.png';
import { logout, findByEmail, saveUser } from '../UsersApi';

export default class Sidebar extends React.Component {
  constructor() {
    super();
    const email = sessionStorage.getItem('email');
    const name = sessionStorage.getItem('name');
    const lastName = sessionStorage.getItem('lastName');
    this.state = {
      email,
      name,
      lastName
    };
    if (!name) {
      this.fetchUser();
    }
  }


  fetchUser() {
    const email = sessionStorage.getItem('email');
    if (email) {
      findByEmail(email)
        .done(response => {
          saveUser(response.email, response.name, response.lastName);
          this.setState({
            email: response.email,
            name: response.name,
            lastName: response.lastName
          })
        })
    }
  }


  handleLogout() {
    logout();
  }


	render() {
    const email = sessionStorage.getItem('email') || '';
    const name = sessionStorage.getItem('name') || '';
    const lastName = sessionStorage.getItem('lastName') || '';
		return(
			<div className="sidebar">
        <div className="logo">
				  <img src={ LogoImage } alt="logo"/>
          <p>eMarketing</p>
          <p className="user-email">{ email }</p>
          <p className="user-full-name">{ name } { lastName }</p>
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
          <input type="button" className="sidebar-btn" onClick={ () => this.handleLogout() } value="Salir" />
        </div>

			</div>
		);
	}
}
