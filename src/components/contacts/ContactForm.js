import React from 'react';
import { Row, Col, Input } from 'react-materialize';

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacto: props.contacto,
      emailConfirmation: ''
    }
  }


  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }


  render() {
    const { id, first_name, last_name, email, phone, tags, country, city, campaigns } = this.state.contacto;
    const { emailConfirmation } = this.state;
  	return(
			<div className="form">
				<Row>
          <Col s={12} m={8}>
            <Input s={12} name="first_name" value={ first_name } label="Nombre" onChange={ (e) => this.handleChange(e) }/>
            <Input s={12} name="last_name" value={ last_name } label="Apellido" onChange={ (e) => this.handleChange(e) }/>
            <Input s={12} name="email" value={ email } label="Email" onChange={ (e) => this.handleChange(e) }/>
            <Input s={12} name="email_confirmation" value={ emailConfirmation } label="Email Confirmation" onChange={ (e) => this.handleChange(e) }/>
            <Input s={12} name="phone" value={ phone } label="Teléfono" onChange={ (e) => this.handleChange(e) }/>
            <Input s={12} name="country" value={ first_name } label="País" onChange={ (e) => this.handleChange(e) }/>

          </Col>
          <Col s={12} m={4}>

          </Col>
        </Row>
			</div>
		);
  }
}

ContactForm.defaultProps = {
  contacto: {}
}
