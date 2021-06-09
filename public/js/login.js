const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const loginUsername = document.querySelector('#username-login').value.trim();
  const loginPassword = document.querySelector('#password-login').value.trim();

  if (loginUsername && loginPassword) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const newUsername = document.querySelector('#username-signup').value.trim();
  const newPassword = document.querySelector('#password-signup').value.trim();

  if (newUsername && newPassword) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username: newUsername, password: newPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
