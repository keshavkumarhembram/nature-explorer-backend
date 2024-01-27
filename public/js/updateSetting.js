const passwordUpdateForm = document.getElementById('update-form');
const settingForm = document.getElementById('setting-form');

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

const settingUpdate = async (formData) => {
    try {
        const res = await fetch('/api/v1/users/update-me', {
            method: 'PATCH',
            body: formData
        })
        const data = await res.json();
        if (data.status === 'success') {
            location.reload(true);
        }
    } catch(err) {
        showAlert('error', 'Error updating setting! Try again.');
    }
}

const updatePassword = async (formData) => {
    try {
        const res = await fetch('/api/v1/users/update-password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
            
        })
        const data = await res.json();
        if (data.status === 'success') {
            location.reload(true);
        }
    } catch (err) {
        showAlert('error', 'Error updating Password! Try again.');
    }
};

if(settingForm) {
    settingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        settingUpdate(form);
    })
}

if(passwordUpdateForm) {
    passwordUpdateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        passwordCurrent = document.getElementById('password-current').value;
        password = document.getElementById('password').value;
        passwordConfirm = document.getElementById('password-confirm').value;
        const data = {
            passwordCurrent,
            password,
            passwordConfirm
        }
        updatePassword(data);
        })
}