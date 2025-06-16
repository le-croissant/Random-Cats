const currentImg = document.getElementById("current-img");
const fetchBtn = document.getElementById("fetch");

// Changes image to the newly fetched one
const refreshCurrent = url => {
    currentImg.setAttribute("src", url);

    if (localStorage.getItem("previous_cats")) {
        const prevCats = JSON.parse(localStorage.getItem("previous_cats"));

        prevCats.unshift(url);
        prevCats.length > 5 && prevCats.pop();

        localStorage.setItem("previous_cats", JSON.stringify(prevCats))
    } else {
        localStorage.setItem("previous_cats", JSON.stringify([url]))
    }
}

// Sets current image to one of the previous fetches
const setCurrent = target => {
    currentImg.setAttribute("src", target.firstElementChild.getAttribute("src"));
}

// Renders previously fetched images below the current image
const renderPrevFetches = () => {
    if (localStorage.getItem("previous_cats")) {
        const data = JSON.parse(localStorage.getItem("previous_cats"));

    if (!document.querySelector(".prev-imgs")) {
        document.querySelector(".content-box")
            .appendChild(document.createElement("div"))
            .classList.add("prev-imgs");
    }

    document.querySelector(".prev-imgs").innerHTML = data.map(url => `
            <div class="img-container" onclick=setCurrent(this)>
                <img src=${url} alt="No cat?">
            </div>
        `).join("");
    }

}

// Fetching json with url for the image, setting it as the current
// and adding it (url) to the list of previous fetches
const fetchCat = async () => {
    const url = "https://cataas.com/cat?json=true"

    try {
        const response = await fetch(url);
        const json = await response.json();

        refreshCurrent(json.url)
    } catch (error) {
        console.error(error.message);
    }
}

fetchBtn.addEventListener("click", async () => {
    renderPrevFetches();
    await fetchCat();
})

renderPrevFetches();
fetchCat();

// <div class="img-container" onclick=setCurrent(this)>
// <img src=${url} alt="No cat?">
// </div>