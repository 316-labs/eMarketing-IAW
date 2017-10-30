import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/users/Login';
import Register from './components/users/Register';
import EditUser from './components/users/EditUser';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CampaignsIndex from './components/campaigns/CampaignsIndex';
import ShowCampaign from './components/campaigns/ShowCampaign';
import NewCampaign from './components/campaigns/NewCampaign';
import ContactsIndex from './components/contacts/ContactsIndex';
import NewContact from './components/contacts/NewContact';
import EditContact from './components/contacts/EditContact';
import Tags from './components/contacts/Tags';
import './stylesheets/App.css';
import WelcomeImage from './welcome-image.jpeg';
import LogoImage from './logo.png';
import Notifications from 'react-notify-toast';
import $ from 'jquery';
import PropTypes from 'prop-types';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			authorized: false,
      authorizeError: false,
      isLoading: false,
			userToken: '',
		}
	}


  static childContextTypes = {
    userToken: PropTypes.string
  };


  getChildContext() {
    return {
      userToken: this.state.userToken
    }
  }


	authorize(email, password) {
		this.setState({ isLoading: true });
    let config = {
      url: `${process.env.REACT_APP_API_HOST}/user_token`,
      method: 'post',
      data: {
        auth: {
          email,
          password
        }
      }
    };
    $.ajax(config)
      .done(response => this.onAuthorizeSuccess(response))
      .fail(response => this.onAuthorizeFail(response))
	}


  onAuthorizeSuccess(response) {
    this.setState({
      isLoading: false,
      authorized: true,
      userToken: response.jwt,
      authorizeError: false
    });
  }


  onAuthorizeFail(response) {
    console.log(response);
    this.setState({
      isLoading: false,
      authorized: false,
      userToken: '',
      authorizeError: true
    });
  }


  logout() {
    this.setState({ authorized: false });
  }


	render() {
		const { authorized, authorizeError, isLoading, userToken } = this.state;
		let authorizedRoutes;
		if (authorized) {
			authorizedRoutes = (
  			<div className="emarketing">
  				<Sidebar logout={ () => this.logout() } />
  				<main>
            <Switch>
  						<Route exact path='/' component={ Dashboard } />
  						<Route exact path='/campañas' component={ CampaignsIndex } />
  						<Route path='/campañas/nueva' component={ NewCampaign } />
  						<Route path='/campañas/:id' component={ ShowCampaign } />
  						<Route exact path='/contactos' render={ () => (
  						  <ContactsIndex userToken={ userToken } />
  						)} />
  						<Route path='/contactos/nuevo' component={ NewContact } />
              <Route path='/contactos/:id/editar' component={ EditContact } />
  						<Route path='/contactos/etiquetas' component={ Tags } />
  						<Route path='/perfil/editar' component={ EditUser } />
      	    </Switch>
  				</main>
  			</div>
			);
		} else {
			authorizedRoutes = (
				<div className="emarketing unauthorized">
					<div className="half welcome-image">
						<img src={ WelcomeImage } alt='welcome'/>
					</div>
					<div className="half views">
						<div className='logo center'><img src={ LogoImage } alt="emarketing" /></div>
						<Switch>
							<Route exact path='/registrarme' component={ Register } />
							<Route path='/' render={ () => (
                <Login
                  authorize={ (e, p) => this.authorize(e, p) }
                  authorizeError={ authorizeError }
                  isLoading={ isLoading }/>
              )} />
						</Switch>
					</div>
				</div>
			);
		}
		return (
      <div className="app">
        <Notifications />
  			<Router>
  				{ authorizedRoutes }
  			</Router>
      </div>
		);
	}
}
