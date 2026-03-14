gsap.registerPlugin(ScrollTrigger);

// Create a unified timeline for the complete slide sequence
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".story-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrub for parallax effect
    }
});

// Since slide-1 is z-index 3 (top), slide-2 is z-index 2 (middle), slide-3 is z-index 1 (bottom).
// Set initial positions for underneath slides to create parallax depth
gsap.set(".slide-2", { yPercent: 30, opacity: 0 });
gsap.set(".slide-3", { yPercent: 30, opacity: 0 });

// Transition 1: Slide 1 moves up and fades out, Slide 2 moves up to 0% and fades in
tl.to(".slide-1", {
    yPercent: -100,
    opacity: 0,
    ease: "none"
}, "0"); // Start at timeline start

tl.to(".slide-2", {
    yPercent: 0,
    opacity: 1,
    ease: "none"
}, "0"); // Start at the same time as slide-1

// Transition 2: Slide 2 moves up and fades out, Slide 3 moves up to 0% and fades in
tl.to(".slide-2", {
    yPercent: -100,
    opacity: 0,
    ease: "none"
}, "1"); // Start after first transition

tl.to(".slide-3", {
    yPercent: 0,
    opacity: 1,
    ease: "none"
}, "1"); // Start at the same time as slide-2

// --- Contact Form Modal & Notification Logic ---
const contactBtn = document.getElementById("openContactForm");
const contactModal = document.getElementById("contactModal");
const closeBtn = document.getElementById("closeContactForm");
const contactForm = document.getElementById("contactForm");
const notificationPopup = document.getElementById("notificationPopup");

// Open Modal
contactBtn.addEventListener("click", () => {
    contactModal.classList.add("show");
});

// Close Modal
closeBtn.addEventListener("click", () => {
    contactModal.classList.remove("show");
});

// Close Modal if clicking outside the form content
window.addEventListener("click", (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove("show");
    }
});

// Handle Form Submission (Dummy Submit)
contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh

    // Close the modal
    contactModal.classList.remove("show");

    // Optional: Reset form fields
    contactForm.reset();

    // Show Notification Popup
    notificationPopup.classList.add("show");

    // Hide Notification Popup after 4 seconds
    setTimeout(() => {
        notificationPopup.classList.remove("show");
    }, 4000);
});