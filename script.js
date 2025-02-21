// Disable right-click and context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable keyboard shortcuts for screenshots (e.g., Print Screen, Ctrl+Shift+I)
document.addEventListener('keydown', (e) => {
  if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
    e.preventDefault();
    alert('Screenshots are not allowed.');
  }
});

// Function to show the invitation page
function showInvitation() {
  document.getElementById('homepage').classList.add('hidden');
  document.getElementById('invitation').classList.remove('hidden');
}

// Function to unlock details (password: kruh69, family123, vipaccess)
function unlockDetails() {
  const password = document.getElementById('password').value.toLowerCase(); // Case-insensitive check
  if (password === "kruh69") {
    document.getElementById('invitation').classList.add('hidden');
    checkDateAndReveal();
  } else if (password === "family123") { // Secret password for family-friendly page
    showFamilyFriendly(); // Show family-friendly content within the same page
  } else {
    alert("Incorrect Password. Try Again.");
  }
}

// Function to show family-friendly content
function showFamilyFriendly() {
  document.getElementById('invitation').classList.add('hidden');
  document.getElementById('family-friendly').classList.remove('hidden');
}

// Function to check the date and reveal the address
function checkDateAndReveal() {
  const today = new Date();
  const revealDate = new Date("April 10, 2025 18:00:00"); // April 10, 2025 at 6:00 PM

  if (today >= revealDate) {
    // Reveal the address
    document.getElementById('address').classList.remove('hidden');
    document.getElementById('address').innerHTML = "📍 The Secret Location: <strong>123 Hidden Lane, Mystic City</strong>";
    startConfetti(); // Start confetti animation
  } else {
    // Show countdown to April 10, 2025 at 6:00 PM
    startCountdown();
  }
}

// Countdown Timer to April 10, 2025 at 6:00 PM
function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  countdownElement.classList.remove('hidden');

  const revealDate = new Date("April 10, 2025 18:00:00").getTime(); // April 10, 2025 at 6:00 PM

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = revealDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `The Secret Will Be Revealed In:<br>${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
      clearInterval(timer);
      countdownElement.innerHTML = "The Secret Has Been Revealed!";
      checkDateAndReveal(); // Reveal the address if the countdown is over
    }
  }, 1000);
}

// Confetti Animation
function startConfetti() {
  const confettiCount = 100;
  const container = document.querySelector('.container');

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    container.appendChild(confetti);
  }
}
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
  document.body.style.backgroundColor = 'black';
}
// Function to create a calendar event for iPhone and Android
function createCalendarEvent() {
  const eventTitle = "After Party Event";
  const eventLocation = "123 Hidden Lane, Mystic City";
  const eventDescription = "Join us for the After Party!";
  const eventStartDate = new Date("April 10, 2025 18:00:00").toISOString();
  const eventEndDate = new Date("April 10, 2025 23:00:00").toISOString();

  // Create iPhone calendar event link
  const iosEventLink = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${eventStartDate.replace(/-|:|\.\d\d\d/g, '')}\nDTEND:${eventEndDate.replace(/-|:|\.\d\d\d/g, '')}\nSUMMARY:${eventTitle}\nDESCRIPTION:${eventDescription}\nLOCATION:${eventLocation}\nEND:VEVENT\nEND:VCALENDAR`;

  // Create Android calendar event link
  const androidEventLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventStartDate.replace(/-|:|\.\d\d\d/g, '')}/${eventEndDate.replace(/-|:|\.\d\d\d/g, '')}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;

  // Add calendar event links to the address reveal section
  document.getElementById('address').innerHTML += `<br><a href="${iosEventLink}" download="event.ics">Add to iPhone Calendar</a>`;
  document.getElementById('address').innerHTML += `<br><a href="${androidEventLink}" target="_blank">Add to Google Calendar</a>`;
}

// Modify the checkDateAndReveal function to call createCalendarEvent
function checkDateAndReveal() {
  const today = new Date();
  const revealDate = new Date("April 10, 2025 18:00:00"); // April 10, 2025 at 6:00 PM

  if (today >= revealDate) {
    // Reveal the address
    document.getElementById('address').classList.remove('hidden');
    document.getElementById('address').innerHTML = "📍 The Secret Location: <strong>123 Hidden Lane, Mystic City</strong>";
    startConfetti(); // Start confetti animation

    // Create calendar event
    createCalendarEvent();
  } else {
    // Show countdown to April 10, 2025 at 6:00 PM
    startCountdown();
  }