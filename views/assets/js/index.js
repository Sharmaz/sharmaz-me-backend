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
