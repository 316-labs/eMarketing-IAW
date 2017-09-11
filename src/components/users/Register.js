import React from 'react';
import Header from '../Header';
import UserForm from './UserForm';

class Register extends React.Component {

	render() {
		return (
			<div className='users-register'>
				<div className="container">
					<label htmlFor="name">Nombre</label>
					<input type="text" name="name" value="Lusi carlos" />
				</div>
			</div>
		);
	}
}

export default Register;