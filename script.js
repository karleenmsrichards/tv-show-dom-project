//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  setUpSearch();
  displayingAllEpisodesLength();
  populateSelect(allEpisodes);
  menu();
}

function setUpSearch() {
  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", filteredSearch);
}

function displayingAllEpisodesLength() {
  let episodes = getAllEpisodes();
  let display = document.querySelector(".search-results");
  display.innerText = `Displaying ${episodes.length} / ${episodes.length} episodes`;
}

function filteredSearch() {
  let searchInput = document.getElementById("search-input");
  let searchInputValue = searchInput.value.toLowerCase();
  let splitSearch = searchInputValue.split(" ");
  // remove all new-div s from root
  let root = document.getElementById("root");
  document.querySelectorAll(".new-div").forEach((element) => element.remove());

  // .filter on all episodes
  let episodes = getAllEpisodes();
  let filteredArr = episodes.filter((element) => {
    let name = element.name.toLowerCase();
    let paragraph = element.summary.toLowerCase();
    let allText = name + " " + paragraph;
    return containsAllSubStrings(allText, splitSearch);
    // name.includes(searchInputValue) || paragraph.includes(searchInputValue)
  });
  // makepage for remaining episodes

  function containsAllSubStrings(targetString, searchSubstrings) {
    //loop over searchSubstrings and return true if all of them are included in targetString
    return searchSubstrings.some((item) => targetString.includes(item));
  }

  makePageForEpisodes(filteredArr);
  let display = document.querySelector(".search-results");
  display.innerText = `Displaying ${filteredArr.length} / ${episodes.length} episodes`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  episodeList.forEach((item) => {
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
}

function menu() {
  let mobileMenuItems = document.querySelector(".header-menu-mobile");
  let mobileMenu = document.querySelector(".hamburger-menu-display");
  mobileMenu.addEventListener("click", () => {
    mobileMenuItems.classList.toggle("open");
  });
}

function populateSelect(allEpisodes) {
  let selectField = document.createElement("select");
  selectField.setAttribute("id", "select-field");

  allEpisodes.forEach((item) => {
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
