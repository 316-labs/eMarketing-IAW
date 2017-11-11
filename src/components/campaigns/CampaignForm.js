import React from 'react';
import { Row, Col, Input } from 'react-materialize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class CampaignForm extends React.Component {
  constructor() {
    super();
    this.modules = {
      toolbar: [
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'align': [] }],
        ['link', 'image'],
        ['blockquote', 'code-block'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],

        ['clean']                                         // remove formatting button
      ]
    };
  }

	render() {
    const { title, body } = this.props.campaign;
		return (
			<div className='campaign-form'>
        <Row>
          <Input s={12} m={10}
                 name='title'
                 labelClassName={ `${title ? 'active' : '' }` }
                 value={ title }
                 label='Título'
                 onChange={ (e) => this.props.handleChange(e) } />
          <Col s={12} m={10}>
            <label htmlFor="">Cuerpo</label>
            <ReactQuill
              value={ body }
              modules={ this.modules }
              theme='snow'
              onChange={ this.props.handleBodyChange }>
              <div className="editing-area"/>
            </ReactQuill>
          </Col>
          <Col s={12} m={2}>

          </Col>
        </Row>
			</div>
		);
	}
}