const input = document.getElementById("search");

function debounce(fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

function handleSearch(e) {
    console.log("api calling....", e.target.value);
}

const debouncedSearch = debounce(handleSearch, 500);

input.addEventListener("input", debouncedSearch);