gsap.from(".logo", {
    x: -100,
    duration: 1
})

gsap.from(".menu", {
    y: -100,
    duration: 2,
    ease: "bounce.out"
})

gsap.from(".btn", {
    x: 100,
    duration: 1
})

gsap.from(".highlight_1", {
    x: -200,
    duration: 2,
    delay: 2,
    opacity: 0,
})

gsap.from(".highlight_2", {
    x: "150%",
    duration: 2,
    delay: 3,
    opacity: 0,
})

gsap.from(".highlight_3", {
    x: "-150%",
    duration: 2,
    delay: 4,
    opacity: 0,
})      