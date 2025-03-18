document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const CORRECT_PASSWORD = 'kruh69';
    const REVEAL_DATE = new Date('2025-04-05T00:00:00');
    const EVENT_DATE = new Date('2025-04-11T00:00:00');

    // Elements
    const passwordButton = document.getElementById('passwordButton');
    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');
    const cancelPassword = document.getElementById('cancelPassword');
    const errorMessage = document.getElementById('errorMessage');
    const venueInfo = document.getElementById('venueInfo');
    const addressCountdown = document.getElementById('addressCountdown');
    const eventInfoButton = document.getElementById('eventInfoButton');
    const eventDetailsModal = document.getElementById('eventDetailsModal');
    const closeEventDetails = document.getElementById('closeEventDetails');

    let passwordVerified = false;

    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const difference = EVENT_DATE - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Address Reveal Countdown
    function updateAddressCountdown() {
        const now = new Date();
        const difference = REVEAL_DATE - now;

        if (difference <= 0 && passwordVerified) {
            showVenueDetails();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        addressCountdown.innerHTML = `
            <p>Address will be revealed in:</p>
            <div class="countdown-mini">
                <span>${days}d</span>
                <span>${hours}h</span>
                <span>${minutes}m</span>
                <span>${seconds}s</span>
            </div>
        `;
    }

    // Password Verification
    function verifyPassword() {
        const password = passwordInput.value;
        
        if (password === CORRECT_PASSWORD) {
            passwordVerified = true;
            passwordModal.classList.add('hidden');
            errorMessage.classList.add('hidden');
            passwordInput.value = '';
            
            const now = new Date();
            if (now >= REVEAL_DATE) {
                showVenueDetails();
            } else {
                showPasswordSuccess();
            }
        } else {
            errorMessage.textContent = 'Incorrect password';
            errorMessage.classList.remove('hidden');
        }
    }

    function showVenueDetails() {
        venueInfo.innerHTML = `
            <p class="venue-address">123 Mystery Avenue, Secret Location</p>
            <p class="venue-additional">Additional details will be provided upon arrival</p>
        `;
        venueInfo.classList.remove('hidden');
        addressCountdown.classList.add('hidden');
    }

    function showPasswordSuccess() {
        addressCountdown.classList.remove('hidden');
        updateAddressCountdown();
    }

    // Event Listeners
    passwordButton.addEventListener('click', () => {
        passwordModal.classList.remove('hidden');
    });

    submitPassword.addEventListener('click', verifyPassword);

    cancelPassword.addEventListener('click', () => {
        passwordModal.classList.add('hidden');
        passwordInput.value = '';
        errorMessage.classList.add('hidden');
    });

    eventInfoButton.addEventListener('click', () => {
        eventDetailsModal.classList.remove('hidden');
    });

    closeEventDetails.addEventListener('click', () => {
        eventDetailsModal.classList.add('hidden');
    });

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyPassword();
        }
    });

    // Initialize
    setInterval(updateCountdown, 1000);
    if (passwordVerified) {
        setInterval(updateAddressCountdown, 1000);
    }
});