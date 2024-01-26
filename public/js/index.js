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



const logout = async () => {
    try {
      const res = await fetch('/api/v1/users/logout', {
        method: 'GET',
      });
  
      const data = await res.json();
  
      if (data.status === 'success') {
        location.reload(true);
      }
    } catch (err) {
      console.error(err);
      showAlert('error', 'Error logging out! Try again.');
    }
  };

  const logoutButton = document.getElementById('logout-button');
  if(logoutButton) {
    logoutButton.addEventListener('click', () => {
      logout();
    })
  }
  

