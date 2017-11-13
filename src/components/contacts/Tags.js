import React from 'react';
import Header from '../Header';
import { Table, Button, ProgressBar, Input } from 'react-materialize';
import { notify } from 'react-notify-toast';
import { fetchTags, editTag, destroyTag, createTag } from '../../api/TagsApi';
import _ from 'lodash';
import moment from 'moment';

class Tags extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      editTagId: '',
      newTag: false,
      newTagName: '',
      newTagErrors: []
    }
    moment.locale('es');
  }


  componentDidMount() {
    this.fetchTags();
  }


  fetchTags() {
    this.setState({ isLoading: true });
    fetchTags()
      .done(response => this.setState({ isLoading: false, tags: response, error: false }))
      .fail(response => this.setState({ isLoading: false, error: true }))
  }


  handleEditButton(tagId) {
    this.setState({
      editTagId: tagId,
      error: false
    });
  }


  handleDestroyButton(tagId) {
    this.setState({ isLoading: true });
    let { tags } = this.state;
    destroyTag(tagId)
      .done(response => {
        _.remove(tags, tag => tag.id === tagId);
        this.setState({ isLoading: false, tags });
        notify.show('La etiqueta fue eliminada correctamente', 'success');
      })
      .fail(response => {
        this.setState({ isLoading: false });
        notify.show('No se pudo eliminar la etiqueta', 'error');
      })
  }


  handleTagName(e) {
    const editTagId = this.state.editTagId;
    const name = e.target.value;
    const tags = this.state.tags;
    var editedTag = tags.find(tag => tag.id === editTagId);
    if (editedTag.name !== name) {
      editTag(editTagId, name)
        .done(response => {
          editedTag.name = name;
          this.setState({ successId: editTagId, tags, error: false });
          notify.show('Etiqueta actualizada correctamente', 'success');
        })
        .fail(response => {
          this.setState({ error: true })
          notify.show('No se pudo actualizar la etiqueta', 'error');
        })
    }
  }


  saveNewTag() {
    this.setState({ isLoading: true });
    const { newTagName } = this.state;
    let { tags } = this.state;
    createTag(newTagName)
      .done(response => {
        tags.unshift(response);
        this.setState({ isLoading: false, newTag: false, newTagName: '', newTagErrors: [], tags });
        notify.show('Etiqueta creada correctamente', 'success');
      })
      .fail(response => {
        this.setState({ isLoading: false, newTagErrors: response.responseJSON });
        notify.show('No se pudo crear la etiqueta', 'error');
      })
  }


  cancelNewTag() {
    this.setState({
      newTag: false,
      newTagName: '',
      newTagErrors: []
    });
  }


  renderNewTag() {
    const { newTagErrors, newTagName } = this.state;
    return(
      <tr>
        <td></td>
        <td>
          <Input
            autoFocus='true'
            name='name'
            value={ newTagName }
            onChange={ (e) => this.setState({ newTagName: e.target.value }) }
            error={ newTagErrors.join(', ') }/>
        </td>
      <td></td>
      <td></td>
      <td className='actions'>
        <Button className="btn" waves='light' onClick={ () => this.saveNewTag() }>Guardar</Button>
        <Button className="btn grey" waves='light' onClick={ () => this.cancelNewTag() }>Cancelar</Button>
      </td>
      </tr>
    );
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
        <td>{ moment(tag.createdAt).locale('es').format('LLL') }</td>
        <td className='actions'>
          <Button className='btn blue-grey' waves='light' onClick={ () => this.handleEditButton(tag.id) }>Editar</Button>
          <Button className='btn grey' waves='red' onClick={ () => this.handleDestroyButton(tag.id) }>Eliminar</Button>
        </td>
      </tr>
    );
  }


	render() {
    const { tags, isLoading, newTag } = this.state;
		return (
			<div className="tags">
				<Header
          title='Etiquetas'
          back='/contactos'
          action={ () => this.setState({ newTag: true }) }
          actionName='Crear etiqueta'
          actionClassName='new-button'/>
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
                newTag &&
                  this.renderNewTag()
              }
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