function setup() {
  let allShows = getAllShows();
  fetchEpisodes();
  fetchAndFilterEpisodes();
  populateShowsSelect(allShows);
  setUpSearch();
  menu();
}

const fetchEpisodes = async () => {
  const response = await fetch("https://api.tvmaze.com/shows/179/episodes");
  const data = await response.json();
  makePageForEpisodes(data);
  populateEpisodesSelect(data);
  displayingAllEpisodesLength(data);
};

function makePageForEpisodes(episodes) {
  const rootElem = document.getElementById("root");

  let pageForAllEpisodes = episodes.forEach((item) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("new-div");

    let image = document.createElement("img");
    image.classList.add("image");
    image.src = item.image.medium;

    let heading = document.createElement("h2");
    heading.classList.add("heading");

    let name = item.name;
    let season = item.season.toString().padStart(2, "0");
    let episode = item.number.toString().padStart(2, "0");
    heading.innerText = `S${season}E${episode} - ${name}`;

    newDiv.setAttribute("id", `S${season}E${episode} - ${name}`);

    let paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.innerText = item.summary
      .replaceAll("<p>", "")
      .replaceAll("</p>", "")
      .replaceAll("<br>", "")
      .replaceAll("</br>", "");

    let backToTop = document.createElement("a");
    backToTop.classList.add("back-to-top");
    backToTop.innerText = "Back to top >>";
    backToTop.href = `#header-logo`;

    newDiv.appendChild(image);
    newDiv.appendChild(heading);
    newDiv.appendChild(paragraph);
    newDiv.appendChild(backToTop);
    rootElem.appendChild(newDiv);
  });

  return pageForAllEpisodes;
}

function menu() {
  let mobileMenuItems = document.querySelector(".header-menu-mobile");
  let mobileMenu = document.querySelector(".hamburger-menu-display");
  mobileMenu.addEventListener("click", () => {
    mobileMenuItems.classList.toggle("open");
  });
}
function setUpSearch() {
  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", filteredSearch);
}

const fetchAndFilterEpisodes = async () => {
  const response = await fetch("https://api.tvmaze.com/shows/179/episodes");
  const data = await response.json();

  let searchInput = document.getElementById("search-input");
  let searchInputValue = searchInput.value.toLowerCase();
  let splitSearch = searchInputValue.split(" ");

  document.querySelectorAll(".new-div").forEach((element) => element.remove());

  let filteredArr = data.filter((item) => {
    let name = item.name.toLowerCase();
    let paragraph = item.summary.toLowerCase();
    let allText = name + " " + paragraph;
    return containsAllSubStrings(allText, splitSearch);
  });

  function containsAllSubStrings(targetString, searchSubstrings) {
    return searchSubstrings.some((item) => targetString.includes(item));
  }

  makePageForEpisodes(filteredArr);
  let display = document.querySelector(".search-results");
  display.innerText = `Displaying ${filteredArr.length} / ${data.length} episodes`;

  console.log(data);
};

function setUpSearch() {
  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", fetchAndFilterEpisodes);
}

function displayingAllEpisodesLength(episodes) {
  let display = document.querySelector(".search-results");
  display.innerText = `Displaying ${episodes.length} / ${episodes.length} episodes`;
}

function populateEpisodesSelect(episodes) {
  let selectField = document.createElement("select");
  selectField.setAttribute("id", "select-field");

  episodes.forEach((item) => {
    let optionField = document.createElement("option");
    let name = item.name;
    let season = item.season.toString().padStart(2, "0");
    let episode = item.number.toString().padStart(2, "0");
    let designation = `#S${season}E${episode} - ${name}`;
    optionField.value = designation;
    optionField.innerText = designation;
    selectField.appendChild(optionField);
  });

  let formContainer = document.querySelector(".form");
  formContainer.appendChild(selectField);

  selectField.addEventListener("change", (event) => {
    let newDivLocation = event.target.value;
    window.location = newDivLocation;
  });
}

window.onload = setup;
