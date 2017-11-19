import React from 'react';
import { Icon } from 'react-materialize';
import BarChartEmails from './BarChartEmails';

export default class DashboardCampaign extends React.Component {
  render() {
    const { campaign } = this.props;
    return(
      <div className="dashboard-campaign">
        <h4 className='dashboard-campaign-title'>{ campaign.title } <Icon className='orange-text'>star</Icon></h4>
        <BarChartEmails
          sentByDay={ campaign.sentByDay }
          openedByDay={ campaign.openedByDay }
          clicksByDay={ campaign.clicksByDay } />
      </div>
    );
  }
}