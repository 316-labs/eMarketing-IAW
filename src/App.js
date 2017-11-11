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
import EditCampaign from './components/campaigns/EditCampaign';
import ContactsIndex from './components/contacts/ContactsIndex';
import NewContact from './components/contacts/NewContact';
import EditContact from './components/contacts/EditContact';
import Tags from './components/contacts/Tags';
import './stylesheets/App.css';
import WelcomeImage from './welcome-image.jpeg';
import LogoImage from './logo.png';
import Notifications from 'react-notify-toast';
import _ from 'lodash';

export default class App extends React.Component {
  componentDidMount() {
    window.addEventListener('token', (e) => {
      this.forceUpdate();
    });
  }


	render() {
    const authorized = !_.isEmpty(sessionStorage.getItem('userToken'));
		let authorizedRoutes;
		if (authorized) {
			authorizedRoutes = (
  			<div className="emarketing">
  				<Sidebar />
  				<main>
            <Switch>
  						<Route exact path='/' component={ Dashboard } />
  						<Route exact path='/campañas' component={ CampaignsIndex } />
  						<Route path='/campañas/nueva' component={ NewCampaign } />
  						<Route exact path='/campañas/:id' component={ ShowCampaign } />
              <Route path='/campañas/:id/editar' component={ EditCampaign } />
              <Route exact path='/contactos' component={ ContactsIndex } />
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
              <Route path='/' component={ Login } />
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
