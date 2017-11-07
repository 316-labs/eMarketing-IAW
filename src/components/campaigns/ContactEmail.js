import React from 'react';
import $ from 'jquery';
import { ProgressBar } from 'react-materialize';
import { notify } from 'react-notify-toast';

export default class ContactEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {}
    }
    this.fetchEmail();
  }


  fetchEmail() {
    const { campaignId, contact } = this.props;
    const config = {
      url: `${process.env.REACT_APP_API_HOST}/v1/campaigns/${campaignId}/email?contact_id=${contact.id}`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
      method: 'get'
    };
    $.ajax(config)
      .done(response => this.setState({ isLoading: false, error: false, email: response }))
      .fail(response => this.setState({ isLoading: false, error: true }))
  }


  resendEmail() {
    this.setState({ isLoading: true });
    const { campaignId, contact } = this.props;
    const config = {
      url: `${process.env.REACT_APP_API_HOST}/v1/campaigns/${campaignId}/send_email?contact_id=${contact.id}`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
      method: 'post'
    }
    $.ajax(config)
      .always(() => this.setState({ isLoading: false }))
      .done(response => notify.show(response.message, 'success'))
      .fail(response => notify.show(response.message, 'error'))
  }


  render() {
    const { index, contact } = this.props;
    const { email, isLoading } = this.state;
    return(
      <div className="email">
        <div className="badge">{ index + 1 }</div>
          {
            isLoading &&
              <div className="center">
                <ProgressBar />
              </div>
          }
          <ul>
            <li>{ contact.firstName } { contact.lastName }</li>
            <li><span className="label">Veces enviadas:</span> { email.sentTimes || 0 }</li>
            <li><span className="label">Veces abiertas:</span> { email.openedTimes || 0 }</li>
            <li><span className="label">Clicks:</span> { email.clicks || 0 }</li>
          </ul>
        <div className="action" onClick={ () => this.resendEmail() }> ›› </div>
      </div>
    );
  }
}
