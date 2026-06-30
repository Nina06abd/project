function togglePassword() {
  const input = document.getElementById('password');
  const icon = document.getElementById('eyeIcon');

  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>`;
  } else {
    input.type = 'password';
    icon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>`;
  }
}

let registeredList = JSON.parse(sessionStorage.getItem('qaiwan_registered') || '[]');

function saveList() {
  sessionStorage.setItem('qaiwan_registered', JSON.stringify(registeredList));
}

function register() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
  const dob = document.getElementById('dob').value;
  const city = document.getElementById('city').value;

  if (!username) {
    shake('username');
    return;
  }

  if (!password) {
    shake('password');
    return;
  }

  if (!dob) {
    shake('dob');
    return;
  }

  if (!city) {
    alert('Please select a city.');
    return;
  }

  // Save registration
  registeredList.push({
    username,
    gender,
    dob,
    city,
    time: new Date().toLocaleTimeString()
  });

  saveList();
  showToast();
  renderWaitlist();

  // Clear form
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('city').value = '';

 setTimeout(() => {
    window.location.href = "./Event.html";
}, 2000);
}

function shake(id) {
  const el = document.getElementById(id);

  el.style.borderColor = '#e53935';
  el.style.animation = 'shake 0.3s ease';

  setTimeout(() => {
    el.style.borderColor = '#e0e0e0';
    el.style.animation = '';
  }, 600);

  el.focus();
}

const s = document.createElement('style');

s.textContent = `
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}`;

document.head.appendChild(s);

function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');

  setTimeout(() => {
    t.classList.remove('show');
  }, 3000);
}

function toggleWaitlist() {
  const panel = document.getElementById('waitlistPanel');
  panel.classList.toggle('show');

  if (panel.classList.contains('show')) {
    renderWaitlist();
  }
}

function renderWaitlist() {
  const body = document.getElementById('waitlistBody');
  const empty = document.getElementById('waitlistEmpty');
  const count = document.getElementById('waitlistCount');

  count.textContent = registeredList.length;

  if (registeredList.length === 0) {
    empty.style.display = 'block';
    body.querySelectorAll('.waitlist-item').forEach(e => e.remove());
    return;
  }

  empty.style.display = 'none';
  body.querySelectorAll('.waitlist-item').forEach(e => e.remove());

  registeredList.forEach(p => {
    const el = document.createElement('div');

    el.className = 'waitlist-item';
    el.innerHTML = `
      <div class="waitlist-avatar">${p.username.charAt(0).toUpperCase()}</div>
      <div class="waitlist-info">
        <div class="w-name">${p.username}</div>
        <div class="w-meta">${p.city} · ${p.gender} · ${p.time}</div>
      </div>`;

    body.appendChild(el);
  });
}