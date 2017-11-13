import React from 'react';
import { Row, Col, Input, Chip, Icon } from 'react-materialize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import _ from 'lodash';
import ContactSelector from './ContactSelector';
import { addContactToCampaign, destroyContactFromCampaign } from '../../api/ContactsApi';
import { notify } from 'react-notify-toast';

export default class CampaignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: props.campaign,
      contactNameOrEmailToAdd: ''
    }
    this.modules = {
      toolbar: [
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'align': [] }],
        ['link', 'image'],
        ['blockquote', 'code-block'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],

        ['clean']                                         // remove formatting button
      ]
    };
  }


  componentWillReceiveProps(newProps) {
    this.setState({
      campaign: newProps.campaign
    })
  }


  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let campaign = this.state.campaign;
    campaign[name] = value;
    this.setState({
      campaign
    });
  }


  handleBodyChange(v) {
    let campaign = this.state.campaign;
    campaign.body = v;
    this.setState({
      campaign
    });
  }


  handleAddContact(v) {
    let campaign = this.state.campaign;
    addContactToCampaign(v, campaign.id)
      .done(response => {
        if (response) {
          campaign.contacts.push(response);
          this.setState({
            campaign
          });
          notify.show('Contacto añadido exitosamente', 'success');
        }
      })
  }


  handleDestroyContact(contactId) {
    const campaign  = this.state.campaign;
    destroyContactFromCampaign(contactId, campaign.id)
      .done(response => {
        _.remove(campaign.contacts, contact => contact.id === contactId);
        this.setState({
          campaign
        })
        notify.show('Contacto eliminado exitosamente', 'success');
      })
  }


  renderSelectContact() {
    return(
      <Row>
        <Col s={12} m={12}>
          <ContactSelector
            onSelect={ v => this.handleAddContact(v) }/>
        </Col>
      </Row>
    );
  }


  renderContactTag(contact, tag) {
    return(
      <Chip key={ `contact-${contact.id}-tag-${tag.id}` }>{ tag.name }</Chip>
    );
  }


  renderContact(contact) {
    return(
      <Col key={ `contact-${contact.id}` } className='contact' s={12} m={4} >
        <span className='destroy-contact' onClick={ () => this.handleDestroyContact(contact.id) }><Icon small>clear</Icon></span>
        <p className="contact-full-name">{ contact.firstName } { contact.lastName }</p>
        <p className="contact-email">{ contact.email }</p>
        <div className="contact-tags">{ _.take(contact.tags, 6).map(tag => this.renderContactTag(contact, tag)) }</div>
      </Col>
    );
  }


  renderContacts() {
    const { campaign } = this.state;
    if (!_.isEmpty(campaign)) {
      return(
        <div className="contacts">
          { this.renderSelectContact() }
          <Row>
            { campaign.contacts.map(contact => this.renderContact(contact)) }
          </Row>
        </div>
      );
    }
  }


	render() {
    const { title, body } = this.state.campaign;
		return (
			<div className='campaign-form'>
        <Row>
          <Input s={12} m={12}
                 name='title'
                 labelClassName={ `${title ? 'active' : '' }` }
                 value={ title }
                 label='Título'
                 onChange={ (e) => this.handleChange(e) } />
          <Col s={12} m={10}>
            <div className="section">
              <label htmlFor="">Cuerpo</label>
              <ReactQuill
                value={ body }
                modules={ this.modules }
                theme='snow'
                onChange={ (v) => this.handleBodyChange(v) }>
                <div className="editing-area"/>
              </ReactQuill>
            </div>

            <div className="section">
              <label htmlFor="">Contactos</label>
              { this.renderContacts() }
            </div>
          </Col>
          <Col s={12} m={2}>
            <div className="section">
              <label htmlFor="">Templates</label>
            </div>
          </Col>
        </Row>
			</div>
		);
	}
}