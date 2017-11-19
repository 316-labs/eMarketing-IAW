import $ from 'jquery';

export function fetchSpotlightedCampaigns(count = 2) {
  const config = {
    url: `${process.env.REACT_APP_API_HOST}/v1/dashboard`,
    headers: { 'Authorization': `Bearer ${sessionStorage.userToken}` },
    method: 'get',
    data: {
      count
    }
  };
  return $.ajax(config);
}