import React from 'react';
import Header from '../Header';
import $ from 'jquery';
import { Table, Button, ProgressBar, Input } from 'react-materialize';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';

class Tags extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      editTagId: ''
    }
  }


  componentDidMount() {
    this.fetchTags();
  }


  static contextTypes = {
    userToken: PropTypes.string
  }


  fetchTags() {
    this.setState({ isLoading: true });
    $.ajax({
      url: `${process.env.REACT_APP_API_HOST}/v1/tags`,
      headers: {
        'Authorization': 'Bearer ' + this.context.userToken
      },
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


  handleEditButton(tagId) {
    this.setState({
      editTagId: tagId,
      error: false
    });
    console.log('edit' + tagId);
  }


  handleDeleteButton() {
    console.log('delete');
  }


  handleTagName(e) {
    const editTagId = this.state.editTagId;
    const name = e.target.value;
    const tags = this.state.tags;
    var editedTag = tags.find(tag => tag.id === editTagId);
    if (editedTag.name !== name) {
      $.ajax({
        url: `${process.env.REACT_APP_API_HOST}/v1/tags/${ editTagId }`,
        headers: {
          'Authorization': 'Bearer ' + this.context.userToken
        },
        method: 'put',
        data: {
          tag: {
            name
          }
        }
      })
        .done(response => {
          editedTag.name = name;
          this.setState({
            successId: editTagId,
            tags,
            error: false
          });
          notify.show('Etiqueta actualizada correctamente', 'success');
        })
        .fail(response => {
          this.setState({
            error: true
          })
        })
    }
  }


  renderNameOrField(tag) {
    const { editTagId, error } = this.state;
    if (tag.id === editTagId) {
      return(
        <Input
          autoFocus='true'
          name='name'
          defaultValue={ tag.name }
          onBlur={ (e) => this.handleTagName(e) }
          error={ error }/>
      );
    } else {
      return(
        tag.name
      );
    }
  }

  renderTag(tag) {
    const { editTagId, error, successId } = this.state;
    return (
      <tr key={ tag.id }>
        <td>{ tag.id }</td>
        <td className={ `${ successId === tag.id ? 'success' : '' } ${ (tag.id === editTagId && error) ? 'error' : '' }`}>
          { this.renderNameOrField(tag) }
        </td>
        <td>{ tag.contacts }</td>
        <td>{ tag.created_at }</td>
        <td className='actions'>
          <Button className='btn btn-outline' waves='light' onClick={ () => this.handleEditButton(tag.id) }>Editar</Button>
          <Button className='btn btn-outline' waves='red' onClick={ () => this.handleDeleteButton(tag.id) }>Eliminar</Button>
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