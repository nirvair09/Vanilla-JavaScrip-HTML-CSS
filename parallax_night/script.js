const stars = document.querySelector(".stars");
const moon = document.querySelector(".moon");
const mountains_behind = document.querySelector(".behind");
const mountains_front = document.querySelector(".front");


window.addEventListener("scroll", () => {
    let value = window.scrollY;

    stars.style.transform = `translateY(${value * 0.2}px)`;
    moon.style.transform = `translateY(${value * -0.5}px)`;
    mountains_behind.style.transform = `translateY(${value * -0.15}px)`;
    mountains_front.style.transform = `translateY(${value * 0.03}px)`;
})


const indicator = document.querySelector(".scroll-indicator");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollTop / pageHeight;

    indicator.style.height = progress * 80 + "vh";

});