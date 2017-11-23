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
    const { firstName, lastName, email, phone, country, city } = this.props.contacto;
    const selectedTags = this.props.contacto.tagIds;
  	return(
			<div className='form'>
				<Row>
          <Col s={12} m={12}>
            <Input s={12}
                   name='firstName'
                   labelClassName={ `${firstName ? 'active' : '' }` }
                   value={ firstName }
                   label='Nombre'
                   onChange={ (e) => this.props.handleChange(e) } />
            <Input s={12}
                   name='lastName'
                   labelClassName={ `${lastName ? 'active' : '' }` }
                   value={ lastName }
                   label='Apellido'
                   onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={12}
                   name='email'
                   labelClassName={ `${email ? 'active' : '' }` }
                   value={ email }
                   label='Email'
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
                   value={ selectedTags }
                   onChange={ (e) => this.props.handleTagChange(e) }
                   multiple>
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
