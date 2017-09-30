import React from 'react';
import { Row, Col, Input } from 'react-materialize';

export default class ContactForm extends React.Component {
  render() {
    const { id, first_name, last_name, email, phone, tags, country, city, campaigns } = this.props.contacto;
    const { emailConfirmation } = this.props.contacto;
  	return(
			<div className="form">
				<Row>
          <Col s={12} m={8}>
            <Input s={12} name="first_name" value={ first_name } label="Nombre" onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={12} name="last_name" value={ last_name } label="Apellido" onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={12} name="email" value={ email } label="Email" onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={12} name="email_confirmation" value={ emailConfirmation } label="Email Confirmation" onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={12} name="phone" value={ phone } label="Teléfono" onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={6} name="country" value={ country } label="País" onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={6} name="city" value={ city } label="Ciudad" onChange={ (e) => this.props.handleChange(e) }/>
            <Input s={12} name="tags" value={ tags } label="Etiquetas" onChange={ (e) => this.props.handleChange(e) }/>
          </Col>
          <Col s={12} m={4}>
            <Input s={12} name="campaigns" value={ campaigns } label="Campañas" onChange={ (e) => this.props.handleChange(e) }/>
          </Col>
        </Row>
			</div>
		);
  }
}

ContactForm.defaultProps = {
  contacto: {}
}
