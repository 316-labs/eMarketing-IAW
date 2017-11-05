import React from 'react';
import Header from './Header';

class Dashboard extends React.Component {
  render() {
  	return(
			<div>
				<Header
					title="Dashboard"/>
				<div className="container dashboard">
					<h1>Dashboard</h1>
				</div>
			</div>
  	);
  }
}

export default Dashboard;
