/** Utils */
function getTokenFromCookie(cookie) {
  const token = cookie.split('=');
  return token[1];
}

/** Log In */

const loginButton = document.querySelector('.login-button');
const loginForm = document.getElementById('login-form');

if (loginButton) {
  loginButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const loginData = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    }

    await fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      }
    });
   window.location.href = '/';
  });
}

/** Tabs */
const tabList = document.querySelectorAll('.menu-list li');
if (tabList) {
  const adminElements = document.querySelectorAll('.admin-content');
  tabList.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabList.forEach((tabListElement) => {
        tabListElement.classList.remove('active');
      });
      adminElements.forEach((adminEl) => {
        adminEl.classList.remove('active');
      });
      tab.classList.add('active');
      adminElements[index].classList.add('active');
    });
  });
}

/** Account Update */
const accountForm = document.getElementById('update-account');
const accountButton = document.getElementById('account-button');

if (accountForm && accountButton) {
  accountButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const formData = {
      email: accountForm.email.value,
    }
    const userId = accountForm.dataset.user;
    const documentCookie = document.cookie;
    const accessToken = getTokenFromCookie(documentCookie);

    await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'same-origin',
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${accessToken}`,
      }
    });
    window.location.href = '/';
  });
}

/** Profile Update */

const profileForm = document.getElementById('update-profile');
const profileButton = document.getElementById('profile-button');

if (profileForm && profileButton) {
  profileButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const formData = {
      name: profileForm.name.value,
      profilePic: profileForm.profile_pic_url.value,
      about: profileForm.about.value,
      blog: profileForm.blog_url.value,
      github: profileForm.github_url.value,
      linkedIn: profileForm.linkedin_url.value,
      twitter: profileForm.twitter_url.value,
    };
    const profileId = profileForm.dataset.profile;
    const documentCookie = document.cookie;
    const accessToken = getTokenFromCookie(documentCookie);

    await fetch(`http://localhost:3000/api/v1/profiles/${profileId}`, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'same-origin',
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${accessToken}`,
      }
    });
    window.location.href = '/';
  });
}

/** Jobs Add New Job Button */

const addNewJobButton = document.getElementById('add-new-job');
const createJobForm = document.getElementById('create-job-form');

if (addNewJobButton) {
  addNewJobButton.addEventListener('click', () => {
    createJobForm.classList.remove('d-none');
    addNewJobButton.classList.add('d-none');
  });
}

/** Jobs Edit Button */

const editButtons = document.querySelectorAll('.edit-job-button');
const editJobForms = document.querySelectorAll('.edit-job-form');
if (editButtons) {
  editButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      editJobForms.forEach((form) => {
        form.classList.add('d-none');
      });
      addNewJobButton.classList.add('d-none');
      createJobForm.classList.add('d-none');
      editJobForms[index].classList.remove('d-none');
    });
  });
}

/** Jobs Form add detail */

const addDetailButtons = document.querySelectorAll('.add-job-detail');
if (addDetailButtons) {
  addDetailButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const detailField = document.createElement('input');
      detailField.setAttribute('type', 'text');
      detailField.setAttribute('name', 'detail');
      detailField.setAttribute('class', 'input-text mt-20 job-detail');
      button.insertAdjacentElement('beforebegin', detailField);
    });
  });
}

/** Jobs Update */
const updateJobButtons = document.querySelectorAll('.update-job-button');
const updateJobForm = document.querySelectorAll('.edit-job-form');

if (updateJobButtons) {
  updateJobButtons.forEach((button, index) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const details = [...updateJobForm[index].querySelectorAll('.job-detail')];
      const detailList = details.map((detail) => detail.value);
      const formData = {
        name: updateJobForm[index].name.value,
        dateStarted: updateJobForm[index].date_started.value,
        dateEnded: updateJobForm[index].date_ended.value,
        description: updateJobForm[index].description.value,
        role: updateJobForm[index].job_role.value,
        details: detailList,
      };
      const jobId = updateJobForm[index].dataset.job;
      const documentCookie = document.cookie;
      const accessToken = getTokenFromCookie(documentCookie);

      await fetch(`http://localhost:3000/api/v1/jobs/${jobId}`, {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'same-origin',
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${accessToken}`,
        },
      });
      window.location.href = '/';
    });
  });
}

/** Jobs Delete */
const deleteButtons = document.querySelectorAll('.delete-job-button');
if (deleteButtons) {
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const jobId = button.dataset.job;
      const documentCookie = document.cookie;
      const accessToken = getTokenFromCookie(documentCookie);

      await fetch(`http://localhost:3000/api/v1/jobs/${jobId}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${accessToken}`,
      }
    });
      button.closest('tr') .remove();
    });
  });
}
