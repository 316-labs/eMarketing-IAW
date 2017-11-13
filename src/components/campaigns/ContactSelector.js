import React from 'react';
import { Input, Preloader, Chip } from 'react-materialize';
import { searchContacts } from '../../api/ContactsApi';
import _ from 'lodash';

export default class ContactSelector extends React.Component {
  constructor() {
    super();
    this.state = {
      contactNameOrEmailToAdd: '',
      contacts: []
    }
    this.handleSearch = _.debounce(this.handleSearch, 500);
  }


  handleSearch() {
    this.setState({ isLoading: true });
    const { contactNameOrEmailToAdd } = this.state;
    searchContacts(contactNameOrEmailToAdd)
      .done(response => this.onSuccess(response))
      .fail(response => this.onError())
  }


  onSuccess(response) {
    this.setState({
      isLoading: false,
      contacts: _.isEmpty(response) ? [] : response
    })
  }


  onError() {
    this.setState({
      isLoading: false,
      error: true,
      contacts: []
    })
  }


  handleQuery(e) {
    const value = e.target.value;
    this.setState({ contactNameOrEmailToAdd: value });
    if (value.length > 0) {
      this.handleSearch();
    }
  }


  renderOption(contact) {
    return(
      <option key={ `contact-option-${contact.id}`} value={ contact.id }>{ `${contact.firstName} ${contact.lastName} - ${contact.email}` }</option>
    );
  }


  renderResultContacts() {
    const { contacts } = this.state;
    const modern = (
      <Input s={12} m={12}
             type='select'
             onChange={ (e) => this.handleOnChange(e) }
             disabled={ _.isEmpty(contacts) }>
        <option value="" disabled>Seleccione</option>
        { contacts.map(contact => this.renderOption(contact)) }
      </Input>
    );

    if (_.isEmpty(contacts)) {
      return(<Chip>No hay resultados</Chip>);
    } else {
      return(modern);
    }
  }


  handleOnChange(e) {
    const value = e.target.value;
    this.props.onSelect(value);
  }


  render() {
    const { contactNameOrEmailToAdd, isLoading } = this.state;
    return(
      <div className="add-contact">
        <Input s={12} m={12}
               name='contactNameOrEmailToAdd'
               value={ contactNameOrEmailToAdd }
               label='Nombre o email'
               onChange={ (e) => this.handleQuery(e) } />
        {
          isLoading &&
            <Preloader size='small' />
        }
        { this.renderResultContacts() }
      </div>
    );
  }
}

