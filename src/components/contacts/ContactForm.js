import React from 'react';
import { Row, Col, Input } from 'react-materialize';
import $ from 'jquery';

export default class ContactForm extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: []
    };
    this.fetchTags();
  }


  static defaultProps = {
    contacto: {
      first_name: '',
      last_name: '',
      city: '',
      country: '',
      email: '',
      id: '',
      phone: '',
      tag_ids: []
    }
  }


  fetchTags() {
    const config = {
      url: `${process.env.REACT_APP_API_HOST}/v1/tags`,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.userToken
      },
      method: 'get',
    };
    $.ajax(config)
      .done(response => this.setState({ tags: response, tagsError: false }))
      .fail(response => this.setState({ tagsError: true }))
  }


  renderTag(tag) {
    return (
      <option key={ `tag-${tag.id}` } value={ tag.id }>{ tag.name }</option>
    );
  }


  renderTagOptions() {
    const { tags } = this.state;
    return tags.map(tag => this.renderTag(tag));
  }


  render() {
    const { first_name, last_name, email, phone, country, city, emailConfirmation } = this.props.contacto;
    const { selectedTags } = this.props;
  	return(
			<div className='form'>
				<Row>
          <Col s={12} m={12}>
            <Input s={12}
                   name='first_name'
                   labelClassName={ `${first_name ? 'active' : '' }` }
                   value={ first_name }
                   label='Nombre'
                   onChange={ (e) => this.props.handleChange(e) } />
            <Input s={12}
                   name='last_name'
                   labelClassName={ `${last_name ? 'active' : '' }` }
                   value={ last_name }
                   label='Apellido'
                   onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={12}
                   name='email'
                   labelClassName={ `${email ? 'active' : '' }` }
                   value={ email }
                   label='Email'
                   onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={12}
                   name='email_confirmation'
                   labelClassName={ `${emailConfirmation ? 'active' : '' }` }
                   value={ emailConfirmation }
                   label='Email Confirmation'
                   onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={12}
                   name='phone'
                   labelClassName={ `${phone ? 'active' : '' }` }
                   value={ phone }
                   label='Teléfono'
                   onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={6}
                   name='country'
                   labelClassName={ `${country ? 'active' : '' }` }
                   value={ country }
                   label='País'
                   onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={6}
                   name='city'
                   labelClassName={ `${city ? 'active' : '' }` }
                   value={ city }
                   label='Ciudad'
                   onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={12}
                   name='tags'
                   type='select'
                   label='Etiquetas'
                   multiple
                   value={ selectedTags }
                   onChange={ (e) => this.props.handleTagChange(e) }>
              { this.renderTagOptions() }
            </Input>
          </Col>
        </Row>
			</div>
		);
  }
}

ContactForm.defaultProps = {
  contacto: {}
}
