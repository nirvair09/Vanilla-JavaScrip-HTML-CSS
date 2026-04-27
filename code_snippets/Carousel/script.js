const track = document.getElementById("track");

const slides = document.querySelectorAll(".slide");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
let idx = 0;
function updateSlide() {
    track.style.transform = `translateX(-${idx * 100}%)`;
}

nextBtn.addEventListener("click", () => {
    if (idx < slides.length - 1) {
        idx++;
    } else {
        idx = 0;
    }
    updateSlide();
});


prevBtn.addEventListener("click", () => {
    if (idx > 0) {
        idx--;
    } else {
        idx = slides.length - 1;
    }
    updateSlide();
})