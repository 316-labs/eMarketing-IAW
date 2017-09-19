import React from 'react';
import { Row, Col } from 'react-materialize';
import _ from 'lodash';

export default class ContactIndex extends React.Component {

  renderEtiqueta(etiqueta) {
    const id = this.props.contacto.id;
    return(
      <li key={ `${ etiqueta }-${ id }` }>{ etiqueta }</li>
    )
  }

  render() {
    const { id, first_name, last_name, email, phone, etiquetas } = this.props.contacto;
    return (
      <div className="contacto-index">
        <Row>
          <Col s={2}>
            <div className="badge">{ id }</div>
          </Col>
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
              { _.take(etiquetas, 5).map(etiqueta => this.renderEtiqueta(etiqueta)) }
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}