//Nav bar logic//

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
})


const tabs = document.querySelectorAll(".tab");
const list = document.getElementById("list")

function render(e) {
    list.innerHTML = `<h3>${e} Content</h3>`
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"))
        tab.classList.add("active");

        render(tab.innerHTML);

    })
})

