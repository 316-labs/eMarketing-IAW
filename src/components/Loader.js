import React from 'react';
import { ProgressBar } from 'react-materialize';

export default class Loader extends React.Component {
  render() {
    return (
      <div className="center">
        <ProgressBar />
      </div>
    );
  }
}