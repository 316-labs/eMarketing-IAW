import React from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';

class ContactsIndex extends React.Component {
	search() {
		console.log('search contact');
	}

  render() {
  	return(
			<div className='contacts-index'>
				<Header
					title="Contactos"
					back="/"
					action={ () => this.search() }
					actionName='Search' />
				<div className="container">
					<h1>Contacts</h1>
					<Button floating large className='teal'><Link to='/contactos/nuevo'><Icon>add</Icon></Link></Button>
				</div>
  		</div>
		);
  }
}

export default ContactsIndex;
