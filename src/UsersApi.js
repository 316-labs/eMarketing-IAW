import $ from 'jquery';

let event = new Event('token');

export function authorize(email, password) {
  let config = {
    url: `${process.env.REACT_APP_API_HOST}/user_token`,
    method: 'post',
    data: {
      auth: {
        email,
        password
      }
    }
  };
  return $.ajax(config);
}


export function register(name, lastName, email, password) {
  const config = {
    url: `${process.env.REACT_APP_API_HOST}/v1/users`,
    method: 'post',
    data: {
      user: {
        name,
        last_name: lastName,
        email,
        password
      }
    }
  }
  return $.ajax(config);
}


export function logout() {
  sessionStorage.clear();
  window.dispatchEvent(event);
}

export function findByEmail(email) {
  const config = {
    url: `${process.env.REACT_APP_API_HOST}/v1/users/find_by_email`,
    headers: { 'Authorization': 'Bearer ' + sessionStorage.userToken },
    method: 'get',
    data: {
      email
    }
  };
  return $.ajax(config);
}

export function saveUserToken(token) {
  sessionStorage.setItem('userToken', token);
  window.dispatchEvent(event);
}

export function saveUser(email, name, lastName) {
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('name', name);
  sessionStorage.setItem('lastName', lastName);
}