import React, { Component } from 'react';
import { Row, Col, CardPanel, Toast } from 'react-materialize';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Row>
        <Col s={ 12 } m={ 5 }>
          <CardPanel className="teal lighten-4 black-text">
            <span>Prueba prueba</span>
          </CardPanel>
        </Col>
        <Col s={ 12 } m={ 7 }>
          <Toast toast="here you go!">
            Toast
          </Toast>
        </Col>
      </Row>
    );
  }
}

export default App;
