// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Skip empty or bare "#" links
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// EmailJS setup
// Replace these three values with the ones from your EmailJS dashboard:
// - PUBLIC_KEY: Account > General
// - SERVICE_ID: Email Services tab
// - TEMPLATE_ID: Email Templates tab
(function () {
    emailjs.init({ publicKey: "MrHKctqojB2ejgqgD" });
})();

const SERVICE_ID = "service_o8jz10j";
const TEMPLATE_ID = "template_ybfhxoc";

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
            .then(() => {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.classList.add('success');
                contactForm.reset();
            })
            .catch((error) => {
                formStatus.textContent = 'Something went wrong. Please try again.';
                formStatus.classList.add('error');
                console.error('EmailJS error:', error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send';
            });
    });
}

const resumeLink = document.getElementById('resume-download');

if (resumeLink) {
    resumeLink.addEventListener('click', function () {
        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            message: "Someone just downloaded your resume!",
            time: new Date().toLocaleString()
        });
    });
}