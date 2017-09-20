import React from 'react';
import Header from '../Header';
import ContactForm from './ContactForm';
import { ProgressBar } from 'react-materialize';
import $ from 'jquery';
import { notify } from 'react-notify-toast';

export default class NewContact extends React.Component {
	constructor() {
		super();
		this.state = {
			contacto: {}
		}
	}

	save() {
    this.setState({
      isLoading: true
    });

    // Manejo asincrónico de creación de contacto
    // const contacto = this.state.contacto;
    // $.ajax({
    //   url: 'localhost:5000/api/v1/contacts',
    //   method: 'POST',
    //   data: {
    //     contacto
    //   }
    // })
    //   .done(response => {
    //     this.setState({
    //       isLoading: false,
    //     });
    //     notify.show('Contacto creado exitosamente', 'success');
    //     this.props.history.push('/contactos');
    //   })
    //   .fail(response => {
    //     this.setState({
    //       isLoading: false,
    //       error: true,
    //       errorMessages: response
    //     });
    //     notify.show('Ocurrió un error. Revisa el formulario e intenta nuevamente', 'error');
    //   })

    setTimeout(() => {
      notify.show('Contacto creado exitósamente', 'success');
      this.props.history.push('/contactos');
    }, 2000);
	}

  render() {
		const { contacto, isLoading, error, errorMessages } = this.state;
  	return(
			<div className='contacts-new'>
				<Header
					title='Nuevo Contacto'
					back="/contactos"
					action={ () => this.save() }
          actionName="Guardar" />
				<div className="container">
          {
            isLoading &&
              <ProgressBar />
          }

					<ContactForm
            contacto={ contacto }
            isLoading={ isLoading }
            error={ error }/>
				</div>
  		</div>
		);
  }
}
