import React from 'react';
import { Row, Col, Input } from 'react-materialize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class CampaignForm extends React.Component {
  constructor() {
    super();
    this.modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ]
    };
    this.formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]
  }

	render() {
    const { title, body } = this.props.campaign;
		return (
			<div>
        <Row>
          <Input s={12} m={8}
                 name='title'
                 labelClassName={ `${title ? 'active' : '' }` }
                 value={ title }
                 label='Título'
                 onChange={ (e) => this.props.handleChange(e) } />
          <Col s={12} m={8}>
            <label htmlFor="">Cuerpo</label>
            <ReactQuill
                 value={ body }
                 modules={ this.modules }
                 formats={ this.formats }
                 onChange={ (v) => this.props.handleBodyChange(v) } />
          </Col>
          <Col s={12} m={4}>

          </Col>
        </Row>
			</div>
		);
	}
}