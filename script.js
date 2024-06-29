const accessKey = "PMZBOvKYzcnOKVYq4aMdGjU5trCkCq40moNAy4yezoY";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("#search-input"); // Corrected selector
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector("#show-more-button"); // Corrected selector

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?query=${inputData}&page=${page}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`An error occurred: ${response.statusText}`);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.text = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;

        showMore.style.display = results.length > 0 ? "block" : "none"; // Improved logic for showing "Show More"
    } catch (error) {
        console.error("Failed to fetch images:", error);
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
})