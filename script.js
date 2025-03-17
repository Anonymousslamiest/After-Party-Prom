const PARTY_START_TIME = new Date("2025-04-11T23:30:00");
const ADDRESS_REVEAL_TIME = new Date("2025-04-06T00:00:00");
const ADDRESS = "742 Elegant Avenue, Grand Hall";

function updateCountdown() {
    const now = new Date();
    const targetDate = now < ADDRESS_REVEAL_TIME ? ADDRESS_REVEAL_TIME : PARTY_START_TIME;
    const diff = targetDate - now;

    if (now >= PARTY_START_TIME) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        document.getElementById('address').textContent = "Event has begun! 🎉";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Update address display
    const addressElement = document.getElementById('address');
    if (now >= ADDRESS_REVEAL_TIME) {
        addressElement.textContent = ADDRESS;
    } else {
        addressElement.textContent = `Address will be revealed in ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Handle form submission
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    
    // Here you would typically send this data to your server
    console.log('RSVP Submission:', { name, email });
    alert('Thank you for your RSVP!');
    e.target.reset();
});
