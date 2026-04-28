//Nav bar logic//


const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
})

let state = {
    tab: "products",
    products: [],
    filtered: [],
    page: 1,
    limit: 10,
    loading: false,
    favourites: JSON.parse(localStorage.getItem("fav")) || []
};


const tabs = document.querySelectorAll(".tab");
const list = document.getElementById("list")

function render() {
    list.innerHTML = "";
    let data;

    if (state.tab === "products") {
        data = state.filtered;
    } else {
        data = state.favourites;
    }

    data.forEach(p => {
        const div = document.createElement("div");
        div.textContent = p.title;
        div.style.padding = "10px";
        div.style.borderBottom = "1px solid gray";
        // list.appendChild(div);

        div.oncontextmenu = (e) => {
            e.preventDefault();
            const exists = state.favourites.some(f => f.id === p.id)

            if (exists) {
                return;
            }

            state.favourites.push(p);
            localStorage.setItem("fav", JSON.stringify(state.favourites));

        }

        list.appendChild(div);
    });
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"))
        tab.classList.add("active");

        state.tab = tab.textContent.toLocaleLowerCase();

        render();

    })
})



async function fetchData() {
    if (state.loading) return;

    state.loading = true;

    const skip = (state.page - 1) * state.limit;
    const limit = state.limit;

    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const data = await response.json();
        state.products = [...state.products, ...data.products];
        state.filtered = state.products;
        state.page++;
        render();
    } catch (error) {
        console.log(error);
    }

    state.loading = false;
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


// window.addEventListener("scroll", () => {
//     const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

//     if (nearBottom && !state.loading) {
//         fetchData();
//     }
// });


window.addEventListener("scroll", () => {
    // 1. Use documentElement.scrollHeight (more reliable)
    // 2. Add a threshold of 100px so it triggers slightly BEFORE you hit the dead bottom
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = 100;
    const totalHeight = document.documentElement.scrollHeight;

    const nearBottom = scrollPosition >= (totalHeight - threshold);

    // Only fetch more if we aren't loading AND if we aren't currently searching
    // (Infinite scroll usually shouldn't trigger during a filtered search)
    const isSearching = searchInput.value.length > 0;

    if (nearBottom && !state.loading && !isSearching) {
        fetchData();
    }
});
