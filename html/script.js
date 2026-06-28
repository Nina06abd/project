
// VIEW TOGGLE
function showList() {
  document.getElementById('listView').classList.remove('hidden');
  document.getElementById('monthView').classList.remove('visible');
  document.getElementById('btnList').classList.add('active');
  document.getElementById('btnMonth').classList.remove('active');
}

function showMonth() {
  document.getElementById('listView').classList.add('hidden');
  document.getElementById('monthView').classList.add('visible');
  document.getElementById('btnList').classList.remove('active');
  document.getElementById('btnMonth').classList.add('active');
  renderCalendar();
}

// CALENDAR
const eventDays = {
  5: [23],  // June
  6: [10],  // July
  7: [18]   // August
};

let calYear  = 2025;
let calMonth = 5;

const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function renderCalendar() {
  document.getElementById('calTitle').textContent = monthNames[calMonth] + ' ' + calYear;
  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-day-name';
    el.textContent = d;
    grid.appendChild(el);
  });

  const firstDay    = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    const hasEvent = eventDays[calMonth] && eventDays[calMonth].includes(d);
    el.className = 'cal-day' + (hasEvent ? ' has-event' : '');
    el.innerHTML = d + (hasEvent ? '<div class="event-dot"></div>' : '');
    if (hasEvent) {
      el.title   = 'Event on ' + monthNames[calMonth] + ' ' + d;
      el.onclick = () => jumpToEvent(calMonth);
    }
    grid.appendChild(el);
  }
}

function changeMonth(dir) {
  calMonth += dir;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0)  { calMonth = 11; calYear--; }
  renderCalendar();
}

function jumpToEvent(month) {
  showList();
  const monthShort = monthNames[month].slice(0, 3).toLowerCase();
  document.querySelectorAll('.event-row').forEach(row => {
    if (row.dataset.month === monthShort) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.style.outline = '2px solid #4caf8f';
      setTimeout(() => row.style.outline = 'none', 2000);
    }
  });
}

// SEARCH
function doSearch() {
  const query    = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultEl = document.getElementById('searchResult');
  const rows     = document.querySelectorAll('.event-row');
  const noRes    = document.getElementById('noResults');

  if (!query) {
    resultEl.textContent = 'Please enter a search term.';
    return;
  }

  let found = 0;
  rows.forEach(row => {
    const matches =
      (row.dataset.name  || '').includes(query) ||
      (row.dataset.month || '').includes(query) ||
      (row.dataset.date  || '').includes(query);
    row.classList.toggle('hidden-event', !matches);
    if (matches) found++;
  });

  noRes.style.display  = found === 0 ? 'block' : 'none';
  resultEl.textContent = found > 0
    ? found + ' event' + (found > 1 ? 's' : '') + ' found for "' + query + '"'
    : 'No results for "' + query + '"';
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResult').textContent = '';
  document.querySelectorAll('.event-row').forEach(r => r.classList.remove('hidden-event'));
  document.getElementById('noResults').style.display = 'none';
}

document.getElementById('searchInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') doSearch();
});