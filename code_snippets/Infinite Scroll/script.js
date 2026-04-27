const container = document.getElementById("container");

let count = 0;

function loadItems() {
    for (let i = 0; i < 10; i++) {
        const item = document.createElement("div");
        item.textContent = "Item " + count;
        item.style.padding = "20px";
        count++;
        container.appendChild(item);
    }
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        loadItems();
    }
})

loadItems();