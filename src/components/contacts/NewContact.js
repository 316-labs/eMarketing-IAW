import React from 'react';
import Header from '../Header';
import ContactForm from './ContactForm';

class NewContact extends React.Component {
	constructor() {
		super();
		this.state = {
			contact: {}
		}
	}

	save() {
		console.log('save');
	}

  render() {
		const { contact } = this.state;
		const headerAction = { action: this.save, name: 'Guardar' };
  	return(
			<div>
				<Header
					title='Nuevo Contacto'
					back="/contactos"
					action={ headerAction }/>
				<div className="container">
					<h1>Formulario Contacto</h1>
					<ContactForm contact={ contact }/>
				</div>
  		</div>
		);
  }
}

export default NewContact;
