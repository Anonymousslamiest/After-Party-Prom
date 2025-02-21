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
  } else if (password === "vipaccess") { // VIP password
    showVIPSection(); // Show VIP section
  } else {
    alert("Incorrect Password. Try Again.");
  }
}

// Function to show family-friendly content
function showFamilyFriendly() {
  document.getElementById('invitation').classList.add('hidden');
  document.getElementById('family-friendly').classList.remove('hidden');
}

// Function to show VIP section
function showVIPSection() {
  document.getElementById('invitation').classList.add('hidden');
  document.getElementById('vip-section').classList.remove('hidden');
}

// Function to show the VIP lounge
function showVIPLounge() {
  document.getElementById('vip-section').classList.add('hidden');
  document.getElementById('vip-lounge').classList.remove('hidden');
}

// Function to exit the VIP lounge
function exitVIPLounge() {
  document.getElementById('vip-lounge').classList.add('hidden');
  document.getElementById('vip-section').classList.remove('hidden');
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
    const hours