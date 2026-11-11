(function () {
    'use strict';

    Fancybox.bind('[data-fancybox]', { Thumbs: false, caption: false });

    const days = document.getElementById('days');
    const weddingDate = new Date(days.dataset.weddingDate);
    const clock = ['days', 'hours', 'minutes', 'seconds'].map(unit =>
        document.querySelectorAll('#' + unit + ' .sm-timer-time_number')
    );

    function updateCountdown() {
        const remaining = Math.max(0, Math.floor((weddingDate - Date.now()) / 1000));
        const values = [
            Math.floor(remaining / 86400),
            Math.floor(remaining / 3600) % 24,
            Math.floor(remaining / 60) % 60,
            remaining % 60
        ];

        clock.forEach((digits, index) => {
            const value = String(values[index]).padStart(2, '0');
            digits.forEach((digit, position) => {
                if (index === 0) {
                    digit.style.display = position < value.length ? '' : 'none';
                }
                digit.firstElementChild.textContent = value[position] || '';
            });
        });

        if (remaining > 0) window.setTimeout(updateCountdown, 1000);
    }

    document.querySelectorAll('[data-jsscroll]').forEach(section => {
        if (section.getBoundingClientRect().top > window.innerHeight) {
            section.classList.remove('jsScroll__scrolled');
        }
    });
    jsScrollAnimations().init();

    updateCountdown();
})();
