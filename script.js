const faqButtons = document.querySelectorAll('.faq-item');
const bookingForm = document.getElementById('bookingForm');
const bookingsList = document.getElementById('bookingsList');
const bookingCount = document.getElementById('bookingCount');
const STORAGE_KEY = 'angelShapeBookings';

function toggleFAQ(button) {
  const currentlyActive = document.querySelector('.faq-item.active');
  if (currentlyActive && currentlyActive !== button) {
    currentlyActive.classList.remove('active');
    const panel = currentlyActive.nextElementSibling;
    if (panel) panel.style.display = 'none';
  }

  const panel = button.nextElementSibling;
  const isActive = button.classList.toggle('active');
  if (panel) panel.style.display = isActive ? 'block' : 'none';
}

faqButtons.forEach((button) => {
  button.addEventListener('click', () => toggleFAQ(button));
});

function loadBookings() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function renderBookings() {
  const bookings = loadBookings();
  bookingCount.textContent = bookings.length > 0 ? `${bookings.length} reserva(s) guardada(s)` : 'No hay reservas guardadas.';
  bookingsList.innerHTML = '';

  if (bookings.length === 0) {
    return;
  }

  bookings.forEach((booking) => {
    const item = document.createElement('div');
    item.className = 'booking-item';
    item.innerHTML = `
      <strong>${booking.service}</strong>
      <div>${booking.date} · ${booking.time}</div>
      <div>${booking.name} · ${booking.email}</div>
      <div>${booking.notes ? booking.notes : 'Sin notas adicionales'}</div>
    `;
    bookingsList.appendChild(item);
  });
}

function clearForm() {
  bookingForm.reset();
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const service = bookingForm.service.value;
    const date = bookingForm.date.value;
    const time = bookingForm.time.value;
    const name = bookingForm.name.value.trim();
    const email = bookingForm.email.value.trim();
    const notes = bookingForm.notes.value.trim();

    if (!service || !date || !time || !name || !email) {
      return;
    }

    const newBooking = {
      id: Date.now(),
      service,
      date,
      time,
      name,
      email,
      notes,
    };

    const bookings = loadBookings();
    bookings.unshift(newBooking);
    saveBookings(bookings);
    renderBookings();
    clearForm();
  });
}

renderBookings();
