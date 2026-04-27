const items = document.querySelectorAll(".item");
const boxes = document.querySelectorAll(".box");

let draggedItem = null;

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        draggedItem = item;
    })
})


boxes.forEach(box => {
    box.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    box.addEventListener("drop", () => {
        if (draggedItem) {
            box.appendChild(draggedItem);
            draggedItem = null;
        }
    })
})