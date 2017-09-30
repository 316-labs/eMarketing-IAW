import React from 'react';
import Header from '../Header';
import ContactForm from './ContactForm';
import { ProgressBar } from 'react-materialize';
import $ from 'jquery';
import { notify } from 'react-notify-toast';

export default class EditContact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contacto: props.contacto
		}
	}


  componentDidMount() {
    this.fetchContacto();
  }


  fetchContacto() {
    this.setState({
      isLoading: true
    });

    const id = this.props.match.params.id;
    $.ajax({
      url: `http://localhost:3000/v1/contacts/${ id }`,
      method: 'GET'
    })
      .always(response => {
        this.setState({
          isLoading: false
        })
      })
      .done(response => {
        this.setState({
          contacto: response
        })
      })
      .fail(response => {
        this.setState({
          error: true
        })
        notify.show("Ocurrió un error al obtener el contacto.", 'error');
      })
  }

	save() {
    this.setState({
      isLoading: true
    });

    // Manejo asincrónico de creación de contacto
    const contact = this.state.contacto;
    $.ajax({
      url: `http://localhost:3000/v1/contacts/${ contact.id }`,
      method: 'PUT',
      data: {
        contact
      }
    })
      .done(response => {
        this.setState({
          isLoading: false,
        });
        notify.show('Contacto actualizado exitosamente', 'success');
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


  render() {
    const id = this.props.match.params.id;
		const { contacto, isLoading, error, errorMessages } = this.state;
  	return(
			<div className='contacts-new'>
				<Header
          title={ `Editar Contacto ${ id }` }
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
            handleChange={ (e) => this.handleChange(e) }
            error={ error }/>
				</div>
  		</div>
		);
  }
}
