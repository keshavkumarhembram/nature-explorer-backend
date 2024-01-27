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

  const bookTour = async (tourId) => {
    try {
      const res = await fetch(`/api/v1/bookings/checkout-session/${tourId}`, {
        method: 'POST'
      });
      const {session} = await res.json();
      location.assign(session.url);

    }catch(err) {
      console.log(err);
    }
  }

  const logoutButton = document.getElementById('logout-button');
  if(logoutButton) {
    logoutButton.addEventListener('click', () => {
      logout();
    })
  }

const bookTourButton = document.getElementById('book-tour');

if(bookTourButton) {
  bookTourButton.addEventListener('click', (e) => {
  
      e.target.textContent = 'Processing...';
      const { tourId } = e.target.dataset;
      bookTour(tourId);
  })
}
  

