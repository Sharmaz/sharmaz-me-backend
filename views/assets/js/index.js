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

/** Profile Create Button */

const createProfileButton = document.getElementById('create-profile-button');
const createProfileForm = document.getElementById('create-profile-form');

if (createProfileButton) {
  createProfileButton.addEventListener('click', () => {
    createProfileForm.classList.remove('d-none');
    createProfileButton.classList.add('d-none');
  });
}

/** Profile Create */

const addProfileButton = document.getElementById('profile-create-button');
if (addProfileButton) {
  addProfileButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const documentCookie = document.cookie;
    const accessToken = getTokenFromCookie(documentCookie);
    const formData = {
      name: createProfileForm.name.value,
      profilePic: createProfileForm.profile_pic_url.value,
      about: createProfileForm.about.value,
      blog: createProfileForm.blog_url.value,
      github: createProfileForm.github_url.value,
      linkedIn: createProfileForm.linkedin_url.value,
      twitter: createProfileForm.twitter_url.value,
    };

    await fetch(`http://localhost:3000/api/v1/profiles/`, {
      method: 'POST',
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

/** Profile Delete */

const profileDeleteButton = document.getElementById('delete-profile-button');
if (profileDeleteButton) {
  profileDeleteButton.addEventListener('click', async () => {
    const profileId = profileDeleteButton.dataset.profile;
    const documentCookie = document.cookie;
    const accessToken = getTokenFromCookie(documentCookie);

    await fetch(`http://localhost:3000/api/v1/profiles/${profileId}`, {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'same-origin',
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

/** Jobs Create */

const addJobButton = document.getElementById('create-job');
if (addJobButton) {
  addJobButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const documentCookie = document.cookie;
    const accessToken = getTokenFromCookie(documentCookie);
    const details = [...createJobForm.querySelectorAll('.job-detail')];
    const detailList = details.map((detail) => detail.value);
    const formData = {
      name: createJobForm.name.value,
      dateStarted: createJobForm.date_started.value,
      dateEnded: createJobForm.date_ended.value,
      description: createJobForm.description.value,
      role: createJobForm.job_role.value,
      details: detailList,
    };

    await fetch(`http://localhost:3000/api/v1/jobs/`, {
      method: 'POST',
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

/** Projects Add New Project Button */

const addNewProjectButton = document.getElementById('add-new-project');
const createProjectForm = document.getElementById('create-project-form');

if (addNewProjectButton) {
  addNewProjectButton.addEventListener('click', () => {
    createProjectForm.classList.remove('d-none');
    addNewProjectButton.classList.add('d-none');
  });
}

/** Projects Edit Button */

const editProjectButtons = document.querySelectorAll('.edit-project-button');
const editProjectForms = document.querySelectorAll('.edit-project-form');
if (editProjectButtons) {
  editProjectButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      editProjectForms.forEach((form) => {
        form.classList.add('d-none');
      });
      addNewProjectButton.classList.add('d-none');
      createProjectForm.classList.add('d-none');
      editProjectForms[index].classList.remove('d-none');
    });
  });
}

/** Projects Forms add tag */

const addTagButtons = document.querySelectorAll('.add-project-tag');
if (addTagButtons) {
  addTagButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const tagField = document.createElement('input');
      tagField.setAttribute('type', 'text');
      tagField.setAttribute('name', 'tag');
      tagField.setAttribute('class', 'input-text mt-20 project-tag');
      button.insertAdjacentElement('beforebegin', tagField);
    });
  });
}

/** Project Create */

const addProjectButton = document.getElementById('create-project');
if (addProjectButton) {
  addProjectButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const documentCookie = document.cookie;
    const accessToken = getTokenFromCookie(documentCookie);
    const tags = [...createProjectForm.querySelectorAll('.project-tag')];
    const tagList = tags.map((tag) => tag.value);
    const formData = {
      name: createProjectForm.name.value,
      description: createProjectForm.project_description.value,
      githubLink: createProjectForm.github_link.value,
      demoLink: createProjectForm.demo_link.value,
      tags: tagList,
    };

    await fetch(`http://localhost:3000/api/v1/projects/`, {
      method: 'POST',
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
}

/** Projects Update */

const updateProjectButtons = document.querySelectorAll('.update-project-button');
const updateProjectForm = document.querySelectorAll('.edit-project-form');

if (updateProjectButtons) {
  updateProjectButtons.forEach((button, index) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const tags = [...updateProjectForm[index].querySelectorAll('.project-tag')];
      const tagList = tags.map((tag) => tag.value);
      const formData = {
        name: updateProjectForm[index].name.value,
        description: updateProjectForm[index].project_description.value,
        githubLink: updateProjectForm[index].github_link.value,
        demoLink: updateProjectForm[index].demo_link.value,
        tags: tagList,
      };
      const projectId = updateProjectForm[index].dataset.project;
      const documentCookie = document.cookie;
      const accessToken = getTokenFromCookie(documentCookie);

      await fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
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

/** Projects Delete */

const deleteProjectButtons = document.querySelectorAll('.delete-project-button');
if (deleteProjectButtons) {
  deleteProjectButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const projectId = button.dataset.project;
      const documentCookie = document.cookie;
      const accessToken = getTokenFromCookie(documentCookie);

      await fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
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

/** Users Add New User Button */

const addNewUserButton = document.getElementById('add-new-user');
const createUserForm = document.getElementById('create-user-form');

if (addNewUserButton) {
  addNewUserButton.addEventListener('click', () => {
    createUserForm.classList.remove('d-none');
    addNewUserButton.classList.add('d-none');
  });
}

/** Users Edit Button */

const editUserButtons = document.querySelectorAll('.edit-user-button');
const editUserForms = document.querySelectorAll('.edit-user-form');
if (editUserButtons) {
  editUserButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      editUserForms.forEach((form) => {
        form.classList.add('d-none');
      });
      addNewUserButton.classList.add('d-none');
      createUserForm.classList.add('d-none');
      editUserForms[index].classList.remove('d-none');
    });
  });
}

/** Users Create */

const addUserButton = document.getElementById('user-create-button');
if (addUserButton) {
  addUserButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const documentCookie = document.cookie;
    const accessToken = getTokenFromCookie(documentCookie);
    const formData = {
      email: createUserForm.email.value,
      password: createUserForm.password.value,
      role: createUserForm.role.value,
    };

    await fetch(`http://localhost:3000/api/v1/users/`, {
      method: 'POST',
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
}

/** Users Update */

const updateUsersButtons = document.querySelectorAll('.update-user-button');
const updateUserForm = document.querySelectorAll('.edit-user-form');

if (updateUsersButtons) {
  updateUsersButtons.forEach((button, index) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const userId = updateUserForm[index].dataset.user;
      const documentCookie = document.cookie;
      const accessToken = getTokenFromCookie(documentCookie);
      const formData = {
        email: updateUserForm[index].email.value,
        role: updateUserForm[index].role.value,
      };

      await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
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

/** User Delete */

const deleteUserButtons = document.querySelectorAll('.delete-user-button');
if (deleteUserButtons) {
  deleteUserButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const userId = button.dataset.user;
      const documentCookie = document.cookie;
      const accessToken = getTokenFromCookie(documentCookie);

      await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
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
