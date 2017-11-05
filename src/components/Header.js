import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button } from 'react-materialize'

class Header extends React.Component {
  render() {
		const { title, back, action, actionName, actionClassName } = this.props;
  	return(
			<header className="header">
				<Row>
					{
						back &&
						<Col s={1} className="back">
							<Link to={ back }><Icon className="back">arrow_back</Icon></Link>
						</Col>
					}
					<Col s={7}>
						<h1>{ title }</h1>
					</Col>
					{
						action &&
						<Col s={4}>
							<Button waves="light" className={`primary right ${ actionClassName ? actionClassName : '' }`} onClick={ () => action() }>{ actionName }</Button>
						</Col>
					}
				</Row>
			</header>
  	);
  }
}

export default Header;
