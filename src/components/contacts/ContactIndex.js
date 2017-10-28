import React from 'react';
import { Row, Col, Icon, Dropdown, NavItem } from 'react-materialize';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import { notify } from 'react-notify-toast';

export default class ContactIndex extends React.Component {

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

    console.log('eliminar contacto');
    const { id } = this.props.contacto;
    $.ajax({
      url: `${process.env.REACT_APP_API_HOST}/v1/contacts/${ id }`,
      method: 'DELETE'
    })
      .always(() => {
        this.setState({
          isLoading: false,
        });
      })
      .done(response => {
        notify.show("Contacto eliminado exitosamente", "success");
      })
      .fail(response => {
        notify.show("Hubo un error al tratar de eliminar este contacto", "error");
      })
  }


  render() {
    const { id, first_name, last_name, email, phone, tags } = this.props.contacto;
    return (
      <div className="contacto-index">
        <Row>
          <div className="badge">{ id }</div>
          <Col s={2}></Col>
          <Col s={6}>
            <ul className="contacto-info">
              <li><span className="campo">[ nombre ]</span> { first_name } { last_name }</li>
              <li><span className="campo">[ email ]</span> { email }</li>
              <li><span className="campo">[ teléfono ]</span> { phone }</li>
            </ul>
          </Col>
          <Col s={4}>
            <p><span className="campo">Etiquetas</span></p>
            <ul>
              { _.take(tags, 5).map(tag => this.renderEtiqueta(tag)) }
            </ul>
          </Col>
          <div className="actions">
            <Dropdown trigger={
              <a href="#" className="orange-text text-darken-1"><Icon>more_vert</Icon></a>
            }>
              <NavItem><Link to={ `contactos/${ id }/editar` }>Editar</Link></NavItem>
              <NavItem><a href="#" onClick={ () => this.eliminarContacto() }>Eliminar</a></NavItem>
            </Dropdown>

          </div>
        </Row>
      </div>
    )
  }
}