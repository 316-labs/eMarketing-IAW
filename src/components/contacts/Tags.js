import React from 'react';
import Header from '../Header';
import $ from 'jquery';
import { Table, Button, ProgressBar } from 'react-materialize';

class Tags extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: []
    }
  }


  componentDidMount() {
    this.fetchTags();
  }


  fetchTags() {
    this.setState({ isLoading: true });
    $.ajax({
      url: 'http://localhost:3000/v1/tags',
      method: 'get'
    })
      .done(response => {
        this.setState({
          isLoading: false,
          tags: response,
          error: false
        });
      })
      .fail(response => {
        this.setState({
          isLoading: false,
          error: true
        })
      })
  }


  handleEditButton() {
    console.log('edit');
  }


  handleDeleteButton() {
    console.log('delete');
  }


  renderTag(tag) {
    return (
      <tr key={ tag.id }>
        <td>{ tag.id }</td>
        <td>{ tag.name }</td>
        <td>{ tag.contacts }</td>
        <td>{ tag.created_at }</td>
        <td className='actions'>
          <Button className='btn btn-outline' waves='light' onClick={ () => this.handleEditButton() }>Editar</Button>
          <Button className='btn btn-outline' waves='red' onClick={ () => this.handleDeleteButton() }>Eliminar</Button>
        </td>
      </tr>
    );
  }


	render() {
    const { tags, isLoading } = this.state;
		return (
			<div className="tags">
				<Header title='Etiquetas' />
				<div className="container">
					<Table hoverable bordered striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Contactos</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                isLoading ?
                  <tr>
                    <td colSpan='5'>
                      <div className="center">
                        <ProgressBar />
                      </div>
                    </td>
                  </tr>
                :
                  tags.map(tag => this.renderTag(tag))
              }
            </tbody>
          </Table>
				</div>
			</div>
		);
	}
}

export default Tags;