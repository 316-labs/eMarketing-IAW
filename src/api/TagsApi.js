import $ from 'jquery';

export function fetchTags() {
  const config = {
    url: `${process.env.REACT_APP_API_HOST}/v1/tags`,
    headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
    method: 'get'
  };
  return $.ajax(config);
}

export function editTag(tagId, name) {
  const config = {
    url: `${process.env.REACT_APP_API_HOST}/v1/tags/${ tagId }`,
    headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
    method: 'put',
    data: {
      tag: {
        name
      }
    }
  };
  return $.ajax(config);
}

export function destroyTag(tagId) {
  const config = {
    url: `${process.env.REACT_APP_API_HOST}/v1/tags/${tagId}`,
    headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
    method: 'delete'
  };
  return $.ajax(config);
}

export function createTag(name) {
  const config = {
    url: `${process.env.REACT_APP_API_HOST}/v1/tags`,
    headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
    method: 'post',
    data: {
      tag: {
        name: name
      }
    }
  };
  return $.ajax(config);
}