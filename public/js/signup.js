const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};

const signup = async (name, email, password, confirmPassword) => {
    try {
        console.log('inside login');
      const res = await fetch('/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
          email,
          password,
          confirmPassword
        }),
      });
      console.log(res);
  
      const data = await res.json();
  
      if (data.status === 'success') {
        showAlert('success', 'Signup in successfully!');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    } catch (err) {
        console.log(err);
      showAlert('error', err.message || 'Login failed');
    }
  };

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    const name = document.getElementById('name').value ;
    const email = document.getElementById('email').value ;
    const password = document.getElementById('password').value ;
    const confirmPassword = document.getElementById('confirm-password').value ;
    signup(name, email, password, confirmPassword);

  });