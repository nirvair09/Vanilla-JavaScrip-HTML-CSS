const buttons = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");

        buttons.forEach(btn => btn.classList.remove("active"));

        contents.forEach(content => content.classList.remove("active"));

        button.classList.add("active");

        document
            .querySelector(`.tab-content[data-content="${tabId}"]`)
            .classList.add("active");
    })
})

