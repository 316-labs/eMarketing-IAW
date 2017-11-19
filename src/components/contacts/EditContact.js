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
			contacto: {},
      selectedTags: []
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
      url: `${process.env.REACT_APP_API_HOST}/v1/contacts/${ id }`,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.userToken
      },
      method: 'GET'
    })
      .done(response => {
        this.setState({
          contacto: response,
          selectedTags: response.tag_ids,
          isLoading: false
        })
      })
      .fail(response => {
        this.setState({
          error: true,
          isLoading: false
        })
        notify.show('Ocurrió un error al obtener el contacto.', 'error');
      })
  }

	save() {
    this.setState({
      isLoading: true
    });

    // Manejo asincrónico de creación de contacto
    let contact = this.state.contacto;
    contact.tag_ids = this.state.contacto.tagIds;
    delete contact.tags;
    delete contact.tagIds;
    $.ajax({
      url: `${process.env.REACT_APP_API_HOST}/v1/contacts/${ contact.id }`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
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


  handleTagChange(e) {
    const selectedTags = [...e.target.selectedOptions].map(option => option.value);
    let contact = this.state.contacto;
    contact.tagIds = selectedTags;
    this.setState({
      contact
    })
  }


  render() {
    const id = this.props.match.params.id;
		const { contacto, selectedTags, isLoading, error, errorMessages } = this.state;
  	return(
			<div className='contacts-new'>
				<Header
          title={ `Editar Contacto ${ id }` }
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
            selectedTags={ selectedTags }
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
