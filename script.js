
document.addEventListener('DOMContentLoaded', function() {
    // Set the party start time
    const partyStartTime = new Date("2025-04-11T23:30:00");
    
    // Update countdown and address visibility
    function updateCountdownAndAddress() {
        const now = new Date();
        const diff = partyStartTime - now;

        // Calculate time units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update countdown display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Update hours until party
        document.getElementById('hours-until').textContent = 
            `${hours} hours until the real party begins`;

        // Update address visibility
        const addressElement = document.getElementById('address');
        if (now >= partyStartTime) {
            addressElement.textContent = "CLASSIFIED LOCATION REVEALED: 742 DARK AVENUE";
            addressElement.classList.remove('address-hidden');
        } else {
            addressElement.textContent = "[REDACTED UNTIL PARTY START]";
            addressElement.classList.add('address-hidden');
        }
    }

    // Initial update
    updateCountdownAndAddress();

    // Update every second
    setInterval(updateCountdownAndAddress, 1000);

    // Handle form submission
    document.getElementById('rsvpForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('RSVP Confirmed! Get ready for the night of your life.');
    });
});
