import React from 'react';
import { Input, Button, ProgressBar } from 'react-materialize';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      nameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: ''
    }
  }


  static defaultProps = {
    registerErrors: {}
  }


  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    }, () => this.isValid());
  }


  isValid() {
    const { name, lastName, email, password } = this.state;
    let valid = false;
    if (name && lastName && email && password && password.length > 3) {
      valid = true;
    }
    this.setState({
      valid
    });
  }


  register() {
    const { name, lastName, email, password } = this.state;
    this.props.register(name, lastName, email, password);
  }


	render() {
    const { name, lastName, email, password, valid } = this.state;
    const { isLoading, registerErrors } = this.props;
		return (
			<div className='users-register'>
				<div className="container">
            <Input s={12} label='Nombre' name='name' value={ name } error={ registerErrors.name ? registerErrors.name.join(', ') : '' } onChange={ (e) => this.handleInput(e) }/>
            <Input s={12} label='Apellido' name='lastName' value={ lastName } error={ registerErrors.lastName ? registerErrors.lastName.join(', ') : ''} onChange={ (e) => this.handleInput(e) }/>
						<Input s={12} label='Email' name='email' value={ email } error={ registerErrors.email ? registerErrors.email.join(', ') : '' } onChange={ (e) => this.handleInput(e) }/>
						<Input s={12} label='Contraseña' name='password' type='password' value={ password } error={ registerErrors.password ? registerErrors.password.join(', ') : '' } onChange={ (e) => this.handleInput(e) }/>
            {
              isLoading ?
                <div className="center">
                  <ProgressBar />
                </div>
              :
                [
                  <Button key='sign-up' className='register-button' onClick={ () => this.register() } disabled={ !valid }>Registrarme</Button>,
                  <Link key='login' to='/login' className='btn btn-flat btn-block'>Iniciar sesión</Link>
                ]
            }
				</div>
			</div>
		);
	}
}

export default Register;