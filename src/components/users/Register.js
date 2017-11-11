import React from 'react';
import { Input, Button, ProgressBar } from 'react-materialize';
import { Link } from 'react-router-dom';
import { authorize, register, saveUserToken, saveUser } from '../../UsersApi';

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
      passwordError: '',
      registerErrors: {}
    }
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
    this.setState({ isLoading: true });
    const { name, lastName, email, password } = this.state;
    const registered = register(name, lastName, email, password);
    registered
      .done(response => this.onRegisterSuccess(response))
      .fail(response => {
        this.setState({ isLoading: false, registerErrors: response.responseJSON})
      })
  }


  onRegisterSuccess(response) {
    const { email, password, name, lastName } = this.state;
    authorize(email, password)
      .done(token => {
        saveUserToken(token.jwt);
        saveUser(email, name, lastName);
        this.props.history.push('/');
      })
  }


	render() {
    const { isLoading, registerErrors, name, lastName, email, password, valid } = this.state;
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
                  <Link key='login' to='/' className='btn btn-flat btn-block'>Iniciar sesión</Link>
                ]
            }
				</div>
			</div>
		);
	}
}

export default Register;