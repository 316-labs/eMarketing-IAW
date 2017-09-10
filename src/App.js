import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ContactsIndex from './components/contacts/ContactsIndex';
import NewContact from './components/contacts/NewContact';
import './stylesheets/App.css';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="emarketing">
					<Sidebar />
					<main>
						<Route exact path='/' component={ Dashboard } />
						<Route exact path='/contactos' component={ ContactsIndex } />
						<Route path='/contactos/nuevo' component={ NewContact } />
					</main>
				</div>
			</Router>
		);
	}
}

export default App;
