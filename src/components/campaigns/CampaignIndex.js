import React from 'react';
import { Row, Col, Icon, Dropdown, NavItem } from 'react-materialize';
import _ from 'lodash';

export default class CampaignIndex extends React.Component {
  renderTag(tag) {
    const id = this.props.campaign.id;
    return(
      <li key={ `${ tag.name }-${ id }` }>{ tag.name }</li>
    )
  }


  render() {
    const { id, title, tags, contacts } = this.props.campaign;
    const { index } = this.props;
    return (
      <div className='campaign-index' id={ `campaign-${id}` }>
        <Row>
          <div className='badge'>{ index + 1 }</div>
          <Col s={2} />
          <Col s={8}>
            <h3>
              <span className="field"><small>[ títutlo ]</small></span><br/>
              { title }
            </h3>
            <p><span className='field tags'>[ dirigido a ]</span></p>
            <ul>
              { _.take(tags, 5).map(tag => this.renderTag(tag)) }
            </ul>
          </Col>
          <Col s={2} />
          <div className="contacts">
            <p className="number">{ _.size(contacts) }</p>
            <p>contactos</p>
          </div>
          <div className='actions'>
            <Dropdown
              trigger={ <a className='orange-text text-darken-1 contact-actions'><Icon>more_vert</Icon></a> }
              children='span'>
              <NavItem href='#' onClick={ () => this.props.history.push(`campañas/${ id }`) } className='show'>Ver</NavItem>
              <NavItem href='#' onClick={ () => this.props.history.push(`campañas/${ id }/editar`) } className='edit'>Editar</NavItem>
              <NavItem href='#' onClick={ () => this.props.deleteCampaign(this.props.campaign) } className='delete'>Eliminar</NavItem>
            </Dropdown>

          </div>
        </Row>
      </div>
    )
  }
}