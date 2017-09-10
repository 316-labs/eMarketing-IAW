import React from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';

class ContactsIndex extends React.Component {
	search() {
		console.log('asd');
	}

  render() {
		const action = { action: this.search, name: 'Search' };
  	return(
			<div>
				<Header
					title="Contactos"
					back="/"
					action={ action }/>
				<div className="container">
					<h1>Contacts</h1>
					<Button floating large className='teal'><Link to='/contactos/nuevo'><Icon>add</Icon></Link></Button>
				</div>
  		</div>
		);
  }
}

export default ContactsIndex;
