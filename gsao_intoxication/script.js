gsap.registerPlugin(ScrollTrigger);

const entrytl = gsap.timeline();

entrytl.from(".navbar", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}).from(".hero h1", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
}, "-=0.5")
    .from(".hero p", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8");


const slides = gsap.utils.toArray(".slide");

const storyTl = gsap.timeline({
    ScrollTrigger: {
        trigger: ".story-container",
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: true,
        anticipatePin: 1
    }
})

slides.forEach((slide, i) => {
    if (i > 0) {
        storyTl.from(slide, {
            clipPath: "circle(0% at 50% 50%)",
            sclae: 1.5
        }, {
            clipPath: "circle(100% at 50% 50%)",
            scale: 1,
            duration: 2,
            ease: "power3.out"
        });
    }

    storyTl.from(slide.querySelector(".slide-content"), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1.5")

    storyTl.to({}, { duration: 1 });
});