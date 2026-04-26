const accordion = document.querySelector(".accordion");


accordion.addEventListener("click", function (e) {
    if (e.target.classList.contains("question")) {
        const item = e.target.parentElement;

        document.querySelectorAll(".item").forEach(el => {
            if (el !== item) el.classList.remove("active");

        })

        item.classList.toggle("active");
    }
});

