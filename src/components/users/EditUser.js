import React from 'react';
import Header from '../Header';
import UserForm from './UserForm';

class EditUser extends React.Component {

	render() {
		return (
			<div className='users-edit'>
				<Header
					title='Editar usuario'/>
				<div className="container">
					<UserForm />
				</div>
			</div>
		);
	}
}

export default EditUser;