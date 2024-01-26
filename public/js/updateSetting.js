const passwordUpdateForm = document.getElementById('update-form');
const settingForm = document.getElementById('setting-form');

const settingUpdate = async (data) => {
    try {
        const res = await fetch('/api/v1/users/update-me', {
            method: 'PATCH',
            body: data
        })
    } catch(err) {
        console.log(err);
    }
}

if(settingForm) {
    settingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("Listening");
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        console.log(form);
        settingUpdate(form);
    })
}