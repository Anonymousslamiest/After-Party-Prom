document.addEventListener('DOMContentLoaded', function() {
    // Constants
    const PARTY_START_TIME = new Date("2025-04-11T23:30:00");
    const ADDRESS_REVEAL_TIME = new Date("2025-04-06T00:00:00");
    const FAMILY_EVENT_TIME = new Date("2025-04-11T18:30:00");

    // Elements
    const versionToggle = document.getElementById('versionToggle');
    const afterPartyVersion = document.getElementById('afterPartyVersion');
    const familyVersion = document.getElementById('familyVersion');
    const addressElement = document.getElementById('address');
    const rsvpForm = document.getElementById('rsvpForm');
    const familyRsvpForm = document.getElementById('familyRsvpForm');

    // Toggle between versions
    let isAfterPartyVersion = true;
    versionToggle.addEventListener('click', () => {
        isAfterPartyVersion = !isAfterPartyVersion;
        afterPartyVersion.classList.toggle('active');
        familyVersion.classList.toggle('active');
        versionToggle.textContent = `Switch to ${isAfterPartyVersion ? 'Family' : 'After Party'} Version`;
    });

    // Countdown timer function
    function updateCountdown() {
        const now = new Date();
        const targetDate = isAfterPartyVersion ? 
            (now < ADDRESS_REVEAL_TIME ? ADDRESS_REVEAL_TIME : PARTY_START_TIME) :
            FAMILY_EVENT_TIME;
        
        const diff = targetDate - now;

        if (diff <= 0) {
            if (isAfterPartyVersion) {
                addressElement.textContent = now >= PARTY_START_TIME ? 
                    "Event has begun! 🎉" : 
                    "742 Elegant Avenue, Grand Hall";
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update both versions' countdown
        document.querySelectorAll('.version').forEach(version => {
            version.querySelector('#days').textContent = days.toString().padStart(2, '0');
            version.querySelector('#hours').textContent = hours.toString().padStart(2, '0');
            version.querySelector('#minutes').textContent = minutes.toString().padStart(2, '0');
            version.querySelector('#seconds').textContent = seconds.toString().padStart(2, '0');
        });

        // Update address reveal countdown
        if (isAfterPartyVersion && now < ADDRESS_REVEAL_TIME) {
            addressElement.textContent = `Address will be revealed in ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Handle RSVP form submissions
    [rsvpForm, familyRsvpForm].forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const email = formData.get('email');
            
            // Here you would typically send this data to your server
            console.log(`RSVP received from ${name} (${email})`);
            alert('Thank you for your RSVP! We look forward to celebrating with you.');
            form.reset();
        });
    });
});
