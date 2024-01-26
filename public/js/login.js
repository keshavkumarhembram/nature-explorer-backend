/* eslint-disable */
// import axios from 'axios';
// import { showAlert } from './alerts';

const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  };
  
  // type is 'success' or 'error'
  const showAlert = (type, msg, time = 7) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
  };

const login = async (email, password) => {
    try {
      const res = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log(res);
  
      const data = await res.json();
  
      if (data.status === 'success') {
        showAlert('success', 'Logged in successfully!');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    } catch (err) {
        console.log(err);
      showAlert('error', err.message || 'Login failed');
    }
  };

  const loginButton = document.getElementById('login-form')
  if(loginButton) {
    loginButton.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value ;
      const password = document.getElementById('password').value ;
      login(email, password);
  });
  }