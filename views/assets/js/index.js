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
      if (tabList[index] !== index) {
        tabList.forEach((tabListElement) => {
          tabListElement.classList.remove('active');
        });
        adminElements.forEach((adminEl) => {
          adminEl.classList.remove('active');
        });
      }
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
