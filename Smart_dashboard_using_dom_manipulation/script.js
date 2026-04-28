//Nav bar logic//


const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
})

let state = {
    tab: "products",
    products: [],
    filtered: []
};


const tabs = document.querySelectorAll(".tab");
const list = document.getElementById("list")

function render() {
    list.innerHTML = "";
    let data;

    if (state.tab === "products") {
        data = state.filtered;
    } else {
        data = [];
    }

    data.forEach(p => {
        const div = document.createElement("div");
        div.textContent = p.title;
        div.style.padding = "10px";
        div.style.borderBottom = "1px solid gray";
        list.appendChild(div);

    });
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"))
        tab.classList.add("active");

        render();

    })
})



async function fetchData() {
    try {
        const response = await fetch("https://dummyjson.com/products?limit=10");
        const data = await response.json();
        state.products = data.products;
        state.filtered = data.products;
        render();
    } catch (error) {
        console.log(error);
    }
}

fetchData();


function debouncedSearch(fn, delay) {
    let timer;

    return function (...arg) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...arg)
        }, delay);
    };
}


const searchInput = document.getElementById("searchBar");

searchInput.addEventListener("input", debouncedSearch((e) => {
    const query = e.target.value.toLowerCase();
    // if (query === "") {
    //     state.filtered = state.products
    // }
    state.filtered = state.products.filter(item =>
        item.title.toLowerCase().includes(query))

    render();
}, 500));