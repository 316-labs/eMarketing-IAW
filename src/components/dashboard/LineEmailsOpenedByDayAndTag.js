import React from 'react';
import _ from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Line } from 'react-chartjs-2';
import Color from 'color';

const moment = extendMoment(Moment);

export default class LineEmailsOpenedByDayAndTag extends React.Component {
  constructor(props) {
    super(props);
    const dates = moment.range(moment().subtract(7, 'days'), moment());
    const labels = _.map(Array.from(dates.by('day')), date => date.format('D MMM'));
    this.state = {
      labels,
      datasets: [],
      colors: ['#ACE0F9', '#4895B9', '#28343A', '#80A7B9', '#346B85', '#6D5E4B', '#B98F5B', '#6DA1B9', '#92ADB9', '#4B626D']
    }
  }


  componentDidMount() {
    this.buildDatasets(this.props.data);
  }


  componentWillReceiveProps(newProps) {
    if (newProps.data !== this.props.data) {
      this.buildDatasets(newProps.data);
    }
  }


  getAColor() {
    const { colors } = this.state;
    const random = _.random(0, colors.length - 1);
    return Color(colors[random]);
  }


  buildDatasets(data) {
    let datasets = _.map(data, (dates, tagName) => {
      const color = this.getAColor();
      return {
          label: tagName,
          fill: false,
          lineTension: 0.1,
          backgroundColor: color,
          borderColor: color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: color.lighten(0.2),
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: color.darken(0.2),
          pointHoverBorderColor: color.lighten(0.2),
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: _.values(dates)
      }
    });
    this.setState({ datasets });
  }


  render() {
    const { labels, datasets } = this.state;
    const data = {
      labels,
      datasets
    };
    return(
      <Line data={ data } />
    );
  }
}