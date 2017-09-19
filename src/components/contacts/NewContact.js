import React from 'react';
import Header from '../Header';
import ContactForm from './ContactForm';
import $ from 'jquery';

class NewContact extends React.Component {
	constructor() {
		super();
		this.state = {
			contact: {}
		}
	}

	save() {
		console.log('save contact');
		this.props.history.push('/contactos');
	}

  render() {
		const { contact } = this.state;
  	return(
			<div className='contacts-new'>
				<Header
					title='Nuevo Contacto'
					back="/contactos"
					action={ () => this.save() }
          actionName="Guardar" />
				<div className="container">
					<ContactForm contact={ contact }/>
				</div>
  		</div>
		);
  }
}

export default NewContact;
