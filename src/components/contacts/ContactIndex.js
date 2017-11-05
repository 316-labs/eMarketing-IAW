import React from 'react';
import { Row, Col, Icon, Dropdown, NavItem } from 'react-materialize';
import _ from 'lodash';
import $ from 'jquery';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';

export default class ContactIndex extends React.Component {
  static contextTypes = {
    userToken: PropTypes.string
  }


  renderEtiqueta(etiqueta) {
    const id = this.props.contacto.id;
    return(
      <li key={ `${ etiqueta.name }-${ id }` }>{ etiqueta.name }</li>
    )
  }


  eliminarContacto() {
    this.setState({
      isLoading: true
    });
    const { id } = this.props.contacto;
    $.ajax({
      url: `${process.env.REACT_APP_API_HOST}/v1/contacts/${ id }`,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.userToken
      },
      method: 'DELETE'
    })
      .always(() => {
        this.setState({
          isLoading: false,
        });
      })
      .done(response => {
        notify.show('Contacto eliminado exitosamente', 'success');
      })
      .fail(response => {
        notify.show('Hubo un error al tratar de eliminar este contacto', 'error');
      })
    window.location.reload();
  }


  render() {
    const { id, first_name, last_name, email, phone, tags } = this.props.contacto;
    const { index } = this.props;
    return (
      <div className='contact-index' id={ `contact-${id}` }>
        <Row>
          <div className='badge'>{ index }</div>
          <Col s={2}></Col>
          <Col s={6}>
            <ul className='contacto-info'>
              <li className='full-name'><span className='campo'>[ nombre ]</span> { first_name } { last_name }</li>
              <li className='email'><span className='campo'>[ email ]</span> { email }</li>
              <li className='phone'><span className='campo'>[ teléfono ]</span> { phone }</li>
            </ul>
          </Col>
          <Col s={4}>
            <p><span className='campo tags'>Etiquetas</span></p>
            <ul>
              { _.take(tags, 5).map(tag => this.renderEtiqueta(tag)) }
            </ul>
          </Col>
          <div className='actions'>
            <Dropdown
              trigger={ <a className='orange-text text-darken-1 contact-actions'><Icon>more_vert</Icon></a> }
              children='span'>
              <NavItem href='#' onClick={ () => this.props.history.push(`contactos/${ id }/editar`) } className='edit'>Editar</NavItem>
              <NavItem href='#' onClick={ () => this.eliminarContacto() } className='delete'>Eliminar</NavItem>
            </Dropdown>

          </div>
        </Row>
      </div>
    )
  }
}