import React from 'react';
import _ from 'lodash';
import { Col, Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			valid: false
		}
	}

	handleInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		}, this.checkValid);
	}

	checkValid() {
		const { email, password } = this.state;
		const valid = !_.isEmpty(email) && !_.isEmpty(password);
		this.setState({ valid });
	}

	render() {
		const { valid, email, password } = this.state;
		return (
			<div className='users-signin'>
				<Row>
					<Col s={ 8 } offset='s2'>
						<Input s={12} label='Email' name='email' value={ email } onChange={ (e) => this.handleInput(e) }/>
						<Input s={12} type='password' name='password' value={ password } label='Contraseña' onChange={ (e) => this.handleInput(e) }/>
						<Button className='login-button' onClick={ () => this.props.authorize() } disabled={ !valid }>Ingresar</Button>
						<Link to='/registrarme' className='btn btn-flat btn-block'>Registrarme</Link>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Login;