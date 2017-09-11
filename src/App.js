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
import Tags from './components/contacts/Tags';
import './stylesheets/App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			authorized: false,
		}
	}


	authorize(email, password) {
		// const config = {
// 			url: '/api/v1/sign_in',
// 			method: 'post',
// 			data: {
// 				email,
// 				password
// 			}
// 		}
// 		$.ajax(config)
// 			.success(response => this.setState(authorized: true))
// 			.error(response => this.setState(authorized: false))
	}




	render() {
		const { authorized } = this.state;
		let authorizedRoutes;
		if (authorized) {
			authorizedRoutes = (
				<Switch>
					<div className="emarketing">
						<Sidebar />
						<main>
							<Route exact path='/' component={ Dashboard } />
							<Route exact path='/campañas' component={ CampaignsIndex } />
							<Route path='/campañas/nueva' component={ NewCampaign } />
							<Route path='/campañas/ver' component={ ShowCampaign } />
							<Route exact path='/contactos' component={ ContactsIndex } />
							<Route path='/contactos/nuevo' component={ NewContact } />
							<Route path='/contactos/etiquetas' component={ Tags } />
						</main>
					</div>
				</Switch>
			);
		} else {
			authorizedRoutes = (
				<Switch>
					<div className="emarketing">
						<main>
							<Route exact path='/' component={ Login } />
							<Route path='/register' component={ Register } />
						</main>
					</div>
				</Switch>
			);
		}
		return (
			<Router>
				{ authorizedRoutes }
			</Router>
		);
	}
}

export default App;
