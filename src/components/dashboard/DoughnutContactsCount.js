import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import _ from 'lodash';

export default class DoughnutContactsCount extends React.Component {
  constructor() {
    super();
    this.state = {
      colors: ['#ACE0F9', '#4895B9', '#28343A', '#80A7B9', '#346B85', '#6D5E4B', '#B98F5B', '#6DA1B9', '#92ADB9', '#4B626D']
    }
  }


  render() {
    const { colors } = this.state;
    const labels = _.keys(this.props.data);
    const values = _.values(this.props.data);
    const data = {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        hoverBackgroundColor: colors
      }]
    }
    return(
      <Doughnut data={ data } />
    );
  }
}