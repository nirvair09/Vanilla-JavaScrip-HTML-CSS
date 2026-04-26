const input = document.getElementById("itemInput")

const btn = document.getElementById("addBtn")
const list = document.getElementById("list")

const countSpan = document.querySelector("#counter");

let count = 0;

let items = [];

function renderItems() {
    list.innerHTML = "";

    items.forEach((item, index) => {
        const li = document.createElement("li");

        li.textContent = item;

        const delBtn = document.createElement("button");
        delBtn.textContent = "X";

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "✔";

        delBtn.addEventListener("click", () => {
            items.splice(index, 1);
            renderItems();
        })

        doneBtn.addEventListener("click", () => {
            li.style.textDecoration = "line-through";
        })

        li.appendChild(delBtn);
        li.appendChild(doneBtn);
        list.appendChild(li);
    })

    countSpan.textContent = `Count: ${items.length}`;
}


btn.addEventListener("click", () => {
    const value = input.value.trim();

    if (value === "") return;

    items.push(value);
    input.value = "";

    renderItems();
});


renderItems();
