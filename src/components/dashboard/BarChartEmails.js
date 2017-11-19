import React from 'react';
import { Bar } from 'react-chartjs-2';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import _ from 'lodash';

const moment = extendMoment(Moment);
const FORMAT = 'YYYY-MM-DD';

export default class BarChartEmails extends React.Component {
  constructor(props) {
    super(props);
    const startSentByDay = !_.isEmpty(props.sentByDay) ? moment(_.keys(props.sentByDay)[0], 'YYYY-MM-DD') : moment().subtract(7,'days');
    const startOpenedByDay = !_.isEmpty(props.openedByDay) ? moment(_.keys(props.openedByDay)[0], 'YYYY-MM-DD') : moment().subtract(7, 'days');
    const startClicksByDay = !_.isEmpty(props.clicksByDay) ? moment(_.keys(props.clicksByDay)[0], 'YYYY-MM-DD') : moment().subtract(7, 'days');
    const startDate = moment.min(startSentByDay, startOpenedByDay, startClicksByDay);

    const endSentByDay = !_.isEmpty(props.sentByDay) ? moment(_.findLastKey(props.sentByDay), FORMAT) : moment();
    const endOpenedByDay = !_.isEmpty(props.openedByDay) ? moment(_.findLastKey(props.openedByDay), FORMAT) : moment();
    const endClicksByDay = !_.isEmpty(props.clicksByDay) ? moment(_.findLastKey(props.clicksByDay), FORMAT) : moment();
    const endDate = moment.max(endSentByDay, endOpenedByDay, endClicksByDay);

    const range = moment.range(startDate, endDate);
    const days = Array.from(range.by('day'));
    const labels = _.map(days, day => day.format('D MMM'));
    this.state = {
      range,
      labels
    }
  }


  buildDataSets() {
    const { sentByDay, openedByDay, clicksByDay } = this.props;
    const sentDataset = {
      label: 'Enviados',
      backgroundColor: '#4b626d',
      borderWidth: 0,
      hoverBackgroundColor: '#5c7f8f',
      data: _.values(sentByDay)
    };
    const openedDataset = {
      label: 'Abiertos',
      backgroundColor: '#fb8c00',
      borderWidth: 0,
      hoverBackgroundColor: '#ffab41',
      data: _.values(openedByDay)
    };
    const clicksDataset = {
      label: 'Clicks',
      backgroundColor: '#4895B9',
      borderWidth: 0,
      hoverBackgroundColor: '#80A7B9',
      data: _.values(clicksByDay)
    };
    return [sentDataset, openedDataset, clicksDataset];
  }


  render() {
    const data = {
      labels: this.state.labels,
      datasets: this.buildDataSets()
    }
    return(
      <div>
        <Bar
          data={ data }
          width={ 100 }
          height={ 100 }
          options={{ maintainAspectRatio: false }} />
      </div>
    );
  }

}