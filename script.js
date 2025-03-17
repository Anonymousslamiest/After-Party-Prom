document.addEventListener('DOMContentLoaded', function() {
    // Set the party start time
    const partyStartTime = new Date("2025-04-11T23:30:00");

    // Initialize variables
    let timeLeft = null;
    let address = "";
    let isFamilyVersion = false;

    // Countdown Timer
    function initializeCountdown() {
        const endDate = new Date("2025-03-15T23:00:00");

        const timer = setInterval(() => {
            const now = new Date();
            const difference = endDate - now;

            if (difference <= 0) {
                clearInterval(timer);
                timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
                address = "Grand Ballroom, Crystal Hotel";
                updateLocation();
            } else {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
                updateCountdown();
            }
        }, 1000);
    }

    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        countdownElement.innerHTML = `
            <h2 class="text-2xl font-playfair text-[#d4af37] mb-6">Grand Reveal In</h2>
            <div class="countdown-container">
                <div class="countdown-item">
                    <span class="text-3xl text-[#d4af37]">${timeLeft.days}</span>
                    <div class="text-[#ffa6a6]">Days</div>
                </div>
                <div class="countdown-item">
                    <span class="text-3xl text-[#d4af37]">${timeLeft.hours}</span>
                    <div class="text-[#ffa6a6]">Hours</div>
                </div>
                <div class="countdown-item">
                    <span class="text-3xl text-[#d4af37]">${timeLeft.minutes}</span>
                    <div class="text-[#ffa6a6]">Minutes</div>
                </div>
                <div class="countdown-item">
                    <span class="text-3xl text-[#d4af37]">${timeLeft.seconds}</span>
                    <div class="text-[#ffa6a6]">Seconds</div>
                </div>
            </div>
        `;
    }

    function updateLocation() {
        const locationElement = document.getElementById('eventLocation');
        if (locationElement) {
            locationElement.textContent = address;
        }
    }

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

    // Toggle version
    function toggleVersion() {
        isFamilyVersion = !isFamilyVersion;
        const toggleButton = document.getElementById('toggleVersion');
        const mainTitle = document.getElementById('mainTitle');
        const mainSubtitle = document.getElementById('mainSubtitle');
        const eventTitle = document.getElementById('eventTitle');
        const eventTime = document.getElementById('eventTime');
        const address = document.getElementById('address');

        if (isFamilyVersion) {
            toggleButton.textContent = "Switch to Original Version";
            mainTitle.textContent = "Post-Prom Celebration";
            mainSubtitle.textContent = "An Enchanted Evening of Elegance & Romance";
            eventTitle.textContent = "Event Details";
            eventTime.textContent = "March 15, 2025 | 11:00 PM - 3:00 AM";
            address.textContent = "Location to be announced";
        } else {
            toggleButton.textContent = "Switch to Family Version";
            mainTitle.textContent = "AFTER HOURS";
            mainSubtitle.textContent = "When the night truly begins";
            eventTitle.textContent = "THE GATHERING";
            eventTime.textContent = "april 11 11:00pm • 23:30";
            address.textContent = "[REDACTED UNTIL PARTY START]";
        }
    }

    // Initial update
    updateCountdownAndAddress();

    // Update every second
    setInterval(updateCountdownAndAddress, 1000);

    // Handle form submission
    document.getElementById('rsvpForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const errorElement = document.getElementById('error');

        if (!name || !email) {
            errorElement.textContent = "Please fill in all fields";
            errorElement.style.display = "block";
            return;
        }

        // Hide form and show success message
        document.getElementById('rsvpForm').style.display = 'none';
        document.getElementById('successMessage').classList.remove('hidden');

        alert('RSVP Confirmed! Get ready for the night of your life.');
    });

    // Initialize countdown when page loads
    initializeCountdown();

    // Add event listener for the toggle button
    document.getElementById('toggleVersion').addEventListener('click', toggleVersion);
});
