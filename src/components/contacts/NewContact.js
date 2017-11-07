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
			contacto: {},
      selectedTags: []
		}
	}


	save() {
    this.setState({
      isLoading: true
    });

    // Manejo asincrónico de creación de contacto
    const contact = this.state.contacto;
    delete contact.tags;
    contact.tag_ids = this.state.selectedTags;
    $.ajax({
      url: `${process.env.REACT_APP_API_HOST}/v1/contacts`,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.userToken
      },
      method: 'POST',
      data: {
        contact
      }
    })
      .done(response => {
        this.setState({
          isLoading: false,
        });
        notify.show('Contacto creado exitosamente', 'success');
        this.props.history.push('/contactos');
      })
      .fail(response => {
        this.setState({
          isLoading: false,
          error: true,
          errorMessages: response
        });
        notify.show('Ocurrió un error. Revisa el formulario e intenta nuevamente', 'error');
      })
	}


  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    var contacto = this.state.contacto;
    contacto[name] = value;
    this.setState({
      contacto
    });
  }


  handleTagChange(e) {
    const selectedTags = [...e.target.selectedOptions].map(option => option.value);
    this.setState({
      selectedTags
    })
  }


  render() {
		const { contacto, isLoading, error, errorMessages } = this.state;
  	return(
			<div className='contacts-new'>
				<Header
					title='Nuevo Contacto'
					back='/contactos'
					action={ () => this.save() }
          actionName='Guardar'
          actionClassName='save' />
				<div className='container'>
          {
            isLoading &&
              <ProgressBar />
          }

					<ContactForm
            contacto={ contacto }
            isLoading={ isLoading }
            handleChange={ (e) => this.handleChange(e) }
            handleTagChange={ (e) => this.handleTagChange(e) }
            error={ error }
            errorMessages={ errorMessages }/>
				</div>
  		</div>
		);
  }
}
