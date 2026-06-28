// Toggle password visibility
function togglePassword() {
  const input   = document.getElementById('password');
  const icon    = document.getElementById('eyeIcon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>`;
  } else {
    input.type = 'password';
    icon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>`;
  }
}

// Sign in
function signIn() {
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg      = document.getElementById('loginMessage');

  if (!email) {
    msg.style.color = '#e53935';
    msg.textContent = 'Please enter your email.';
    return;
  }
  if (!password) {
    msg.style.color = '#e53935';
    msg.textContent = 'Please enter your password.';
    return;
  }

  msg.style.color = '#4caf8f';
  msg.textContent = 'Signing in...';

  setTimeout(() => {
    window.location.href = 'event.html';
  }, 800);
}

// Forgot password
function forgotPassword() {
  const email = document.getElementById('email').value.trim();
  const msg   = document.getElementById('loginMessage');
  if (!email) {
    msg.style.color = '#e53935';
    msg.textContent = 'Enter your email first, then click Forgot Password.';
    return;
  }
  msg.style.color = '#4caf8f';
  msg.textContent = 'Password reset link sent to ' + email;
}

// Enter key triggers sign in
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') signIn();
});
