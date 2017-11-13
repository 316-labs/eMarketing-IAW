import $ from 'jquery';

export function searchContacts(query) {
  const config = {
    url: `${process.env.REACT_APP_API_HOST}/v1/contacts/search`,
    headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
    method: 'get',
    data: {
      contact: {
        name_or_email: query
      }
    }
  };
  return $.ajax(config);
}

export function addContactToCampaign(contactId, campaignId) {
  const config = {
    url: `${process.env.REACT_APP_API_HOST}/v1/campaigns/${campaignId}/add_contact`,
    headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
    method: 'post',
    data: {
      contact_id: contactId
    }
  };
  return $.ajax(config);
}

export function destroyContactFromCampaign(contactId, campaignId) {
  const config = {
    url: `${process.env.REACT_APP_API_HOST}/v1/campaigns/${campaignId}/destroy_contact`,
    headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
    method: 'post',
    data: {
      contact_id: contactId
    }
  };
  return $.ajax(config);
}