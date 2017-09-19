import React from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { Button, Icon , Preloader, Input, Row, Col } from 'react-materialize';
import ContactIndex from './ContactIndex';
import $ from 'jquery';

class ContactsIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      contactos: []
    }
  }


  fetchContactos() {
    this.setState({
      isLoading: true
    })

    const fakeContacts = [
      { id: "1", first_name: "Luis", last_name: "Diozquericcio", email: "lucho.d@gmail.com", phone: "+54-221-2236534", etiquetas: ["Deporte", "Joven", "Electrónica", "Informática"] },
      { id: "2", first_name: "Esteban", last_name: "Mascalzonne", email: "estebanquito@hotmail.com", phone: "+54-221-56732142", etiquetas: ["Música", "Política", "Aviación", "Arte", "Moda", "Cultura"] },
      { id: "3", first_name: "Andrea", last_name: "Martinata", email: "martinandrea@aol.com", phone: "+54-221-1993824", etiquetas: ["Joven", "Electrónica", "Informática", "Arte", "Recitales"] }
    ];

    setTimeout(() => this.setState({
      contactos: fakeContacts,
      isLoading: false
    }), 2000);

    // // The following method fetchs the contacts from an API and uses promises and callbacks implemented by jQuery
    // $.ajax({
    //   url: 'http://localhost:5000/api/v1/contacts',
    //   method: 'get'
    // })
    //   .done(response => {
    //     this.setState({
    //       contactos: response,
    //       isLoading: false,
    //       error: false
    //     });
    //   })
    //   .fail(response => {
    //     this.setState({
    //       isLoading: false,
    //       error: true
    //     })
    //   })
  }


  componentDidMount() {
    this.fetchContactos();
  }


	buscarContacto() {
		console.log('buscando contacto');
	}


  renderContacto(contacto) {
    return(
      <ContactIndex contacto={ contacto } key={ contacto.id }/>
    );
  }


  renderBuscarContacto() {

    return(
      <div className="buscar-contacto">
        <h5>Buscar contacto</h5>
        <Input type="text" name="nombre" label="Nombre"/>
        <Button className="blue-grey darken-1" onClick={ () => this.buscarContacto() }>Buscar</Button>
      </div>
    )
  }

  render() {
    const { contactos, isLoading, error } = this.state;
  	return(
			<div className='contactos'>
				<Header
					title="Contactos"
					back="/" />
				<div className="container">
          <Row className="acciones">
            <Input s={12} m={6} type="select" name="ordenar" id="ordenar" defaultValue="">
              <option value="">Ordenar por ...</option>
              <option value="nombre">Nombre</option>
              <option value="email">Email</option>
            </Input>
            <Col s={12} m={6}>
              <Link to="/contactos/etiquetas" className="btn etiquetas blue-grey darken-1">Gestionar etiquetas</Link>
            </Col>
          </Row>

          <Row>
            <Col s={12} m={8}>
              {
                isLoading ?
                  <div className="center">
                    <Preloader />
                  </div>
                :
                  contactos.map(this.renderContacto)
              }
            </Col>
            <Col s={12} m={4}>
              { this.renderBuscarContacto() }
            </Col>
          </Row>
					<Button floating large className='fixed-action-btn'><Link to='/contactos/nuevo'><Icon>add</Icon></Link></Button>
				</div>
  		</div>
		);
  }
}

export default ContactsIndex;
