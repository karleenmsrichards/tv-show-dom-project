//You can edit ALL of the code here

let allEpisodes = [];

const allShows = getAllShows();

const sortedShows = allShows.sort((a, b) => {
  let fa = a.name.toLowerCase(),
    fb = b.name.toLowerCase();

  if (fa < fb) {
    return -1;
  }
  if (fa > fb) {
    return 1;
  }
  return 0;
});

function pageForShows(sortedShows) {
  let root = document.getElementById("root");
  root.innerHTML = "";

  let showSectionContainter = document.createElement("div");
  showSectionContainter.setAttribute("id", "show-section-container");

  sortedShows.forEach((item) => {
    let showSection = document.createElement("div");
    showSection.classList.add("show-section");

    let showImage = document.createElement("img");
    showImage.classList.add("show-image");
    showImage.src =
      item.image?.medium ??
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSweXgcvq_bb0THeLZJ0daDBuSgxMWpQ5BTw8r0_6B0&s";

    let showTitleAnchor = document.createElement("a");
    showTitleAnchor.classList.add("show-title-anchor");
    showTitleAnchor.innerText = item.name;
    showSection.appendChild(showTitleAnchor);
    showTitleAnchor.href = "#";
    showTitleAnchor.addEventListener("click", () => {
      let showId = item.id;
      fetchAllEpsiodes(showId);
      // showsSelect.style.display = "none";

      setUpEpisodeSearch();
    });

    let showSummary = document.createElement("p");
    showSummary.classList.add("show-summary");
    showSummary.innerHTML = item.summary;

    let showGroup = document.createElement("div");
    showGroup.classList.add("show-group");

    let showRating = document.createElement("p");
    showRating.classList.add("show-rating");
    showRating.innerHTML = `Rated: ${item.rating.average}`;

    let showGenres = document.createElement("p");
    showGenres.classList.add("show-genres");
    showGenres.innerHTML = `Genres: ${item.genres}`;

    let showStatus = document.createElement("p");
    showStatus.classList.add("show-status");
    showStatus.innerHTML = `Status: ${item.status}`;

    let showRuntime = document.createElement("p");
    showRuntime.classList.add("show-runtime");
    showRuntime.innerHTML = `Runtime: ${item.runtime}`;

    let backToTop = document.createElement("a");
    backToTop.classList.add("shows-back-to-top");
    backToTop.innerText = "Back to top >>";
    backToTop.href = `#header-logo`;

    root.appendChild(showSectionContainter);
    showSectionContainter.appendChild(showSection);
    showSection.appendChild(showImage);
    showSection.appendChild(showSummary);
    showSection.appendChild(showGroup);

    showGroup.appendChild(showRating);
    showGroup.appendChild(showGenres);
    showGroup.appendChild(showStatus);
    showGroup.appendChild(showRuntime);
    showSection.appendChild(backToTop);
  });
}

function showsSelect(shows) {
  let showsSelect = document.getElementById("shows-select");
  showsSelect.innerHTML = "";
  let firstOption = document.createElement("option");
  firstOption.innerText = "Select a Show";
  showsSelect.appendChild(firstOption);

  shows.forEach((show) => {
    let option = document.createElement("option");
    option.classList.add("shows-option");
    // option.value = `https://api.tvmaze.com/shows/${show.id}/episodes`;
    option.value = show.id; // 1632
    option.innerText = show.name;
    showsSelect.appendChild(option);
  });

  showsSelect.addEventListener("change", (event) => {
    const showId = event.target.value;
    fetchAllEpsiodes(showId);
    setUpEpisodeSearch();
  });
}

function filterShow() {
  let allShows = getAllShows();
  let foundShows = allShows.filter((item) => {
    let searchInput = document.getElementById("show-input");
    let itemName = item.name;
    let itemSummary = item.summary;
    let itemGenres = item.genres.toString().replaceAll(",", " ");
    let allText = `${itemName} ${itemSummary} ${itemGenres}`;

    return allText.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  console.log(foundShows);
  pageForShows(foundShows);
  displayingShowsLength(foundShows);
  showsSelect(foundShows);
  setUpEpisodeSearch();
}

function setUpShowSearch() {
  let searchInput = document.getElementById("show-input");
  searchInput.addEventListener("keyup", filterShow);
}

function displayingShowsLength(shows) {
  let display = document.querySelector(".search-results");
  display.innerText = `Displaying ${shows.length} / ${shows.length} show(s)`;
}

function displayingAllEpisodesLength(episodes) {
  let display = document.querySelector(".search-results");
  display.innerText = `Displaying ${episodes.length} / ${episodes.length} episode(s)`;
}

function pageForEpisodes(episodes) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  const displayAllShowsLink = document.createElement("button");
  displayAllShowsLink.classList.add("display-all-shows-link");
  displayAllShowsLink.innerText = "All Shows";
  rootElem.appendChild(displayAllShowsLink);
  console.log(displayAllShowsLink.innerText);
  displayAllShowsLink.addEventListener("click", pageForShows);

  let episodeSectionContainer = document.createElement("div");
  episodeSectionContainer.classList.add("episode-section-container");

  let page = episodes.forEach((item) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("new-div");

    let image = document.createElement("img");
    image.classList.add("image");
    image.src =
      item.image?.medium ??
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSweXgcvq_bb0THeLZJ0daDBuSgxMWpQ5BTw8r0_6B0&s";

    let heading = document.createElement("h2");
    heading.classList.add("heading");

    let name = item.name;
    let season = item.season.toString().padStart(2, "0");
    let episode = item.number.toString().padStart(2, "0");
    heading.innerText = `S${season}E${episode} - ${name}`;

    newDiv.setAttribute("id", `S${season}E${episode} - ${name}`);

    let paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.innerHTML = item.summary;

    let backToTop = document.createElement("a");
    backToTop.classList.add("back-to-top");
    backToTop.innerText = "Back to top >>";
    backToTop.href = `#header-logo`;

    newDiv.appendChild(image);
    newDiv.appendChild(heading);
    newDiv.appendChild(paragraph);
    newDiv.appendChild(backToTop);
    episodeSectionContainer.appendChild(newDiv);
    rootElem.appendChild(episodeSectionContainer);
  });
  displayingAllEpisodesLength(episodes);
}

function menu() {
  let mobileMenuItems = document.querySelector(".header-menu-mobile");
  let mobileMenu = document.querySelector(".hamburger-menu-display");
  mobileMenu.addEventListener("click", () => {
    mobileMenuItems.classList.toggle("open");
  });
}

//LEVEL 200 ////////////////////////
///////////////ADD LIVE SEARCH INPUT
/////////////////1.ONLY DISPLAY EPISODES WHO'S NAMES AND SUMMARY ARE INCLUDED IN THE SEARCH AREA
/////////////////////2. SEARCH SHOULD BE CASE-INSENSITIVE
////////////////////////////3.DISPLAY SHOULD UPDATE IMMEDIATELY
/////////////////////////////////4. DISPLAY HOW MANY EPISODES MATCH CURRENT SEARCH
///////////////////////////////////////5. IF SEARCH AREA IS EMPTY DISPLAY ALL EPISODES

function filteredSearch() {
  let searchInput = document.getElementById("episode-input");
  let searchInputValue = searchInput.value.toLowerCase();
  let splitSearch = searchInputValue.split(" ");
  let filteredArr = [...allEpisodes].filter((element) => {
    let name = element.name.toLowerCase();
    let paragraph = element.summary.toLowerCase();
    let allText = name + " " + paragraph;
    return containsAllSubStrings(allText, splitSearch);
  });

  function containsAllSubStrings(targetString, searchSubstrings) {
    return searchSubstrings.every((item) => targetString.includes(item));
  }

  pageForEpisodes(filteredArr);
  displayingAllEpisodesLength(filteredArr);
}

function setUpEpisodeSearch() {
  const episodeSearch = document.getElementById("episode-search-wrapper");
  episodeSearch.style.display = "block";
  const showSearch = document.getElementById("show-search-wrapper");
  showSearch.style.display = "none";
  let episodeInput = document.getElementById("episode-input");
  episodeInput.addEventListener("keyup", filteredSearch);
}

// function setUpEpisodeSearch() {
//   let episodeInput = document.getElementById("episode-input");
//   episodeInput.addEventListener("keyup", filteredSearch);
// }

function displayingAllEpisodesLength(episodes) {
  let display = document.querySelector(".search-results");
  display.innerText = `Displaying ${episodes.length} / ${episodes.length} episode(s)`;
}

//LEVEL 300 ////////
///////ADD SELECT TO JUMP TO SELECTED EPISODE
//////////1.EPISODES TO BE LISTED IN FORMAT S01E05
//////////////2.ON SELECTION USER SHOULD BE TAKEN DIRECTLY TO EPISODE
//////////////////3.SHOW THE SELECTED EPISODE ONLY OR CREATE A LINK TO EPISODE
/////////////////////4.MAKE A WAY FOR THE USER TO GET BACK TO ALL EPISODES

function populateEpisodesSelect(episodes) {
  let episodeSelect = document.getElementById("episode-select");

  episodes.forEach((item) => {
    let optionField = document.createElement("option");
    let name = item.name;
    let season = item.season.toString().padStart(2, "0");
    let episode = item.number.toString().padStart(2, "0");
    let designation = `#S${season}E${episode} - ${name}`;
    optionField.value = designation;
    optionField.innerText = `S${season}E${episode} - ${name}`;
    episodeSelect.appendChild(optionField);
  });

  let formContainer = document.querySelector(".form");
  formContainer.appendChild(episodeSelect);

  episodeSelect.addEventListener("change", (event) => {
    console.log(event.target.value);
    let designation = event.target.value;
    let filteredEpisode = episodes.filter((item) => {
      let name = item.name;
      let season = item.season.toString().padStart(2, "0");
      let episode = item.number.toString().padStart(2, "0");
      let designation1 = `#S${season}E${episode} - ${name}`;

      return designation1 === designation;
    });

    pageForEpisodes(filteredEpisode);

    displayingAllEpisodesLength(filteredEpisode);
    // filter episode by creating a same page link below////
    // let newDivLocation = event.target.value;
    // window.location = newDivLocation;
  });
}

//LEVEL 350///////////
///////////////PAGE SHOULD LOAD WITH THE SAME EPISODES BUT FETCH FROM API
//////////////////1.YOUR SEARCH AN EPISODE SELECTOR MUST CONTINUE TO WORK AS BEFORE
////////////////////////2. DO NOT RE-FETCH EPISODES EACH TIME A USER TYPES A CHARACTER

//LEVEL 400///////////

const fetchAllEpsiodes = async (showId) => {
  // url: https://api.tvmaze.com/shows/SHOW_ID/episodes
  const res = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
  allEpisodes = await res.json();

  pageForEpisodes(allEpisodes);
  populateEpisodesSelect(allEpisodes);
};

function setup() {
  // let allShows = getAllShows();
  const episodeSearch = document.getElementById("episode-search-wrapper");
  episodeSearch.style.display = "none";
  const showSearch = document.getElementById("show-search-wrapper");
  showSearch.style.display = "block";

  pageForShows(sortedShows);
  showsSelect(sortedShows);
  setUpShowSearch();
}

// function setup() {
//   // let allShows = getAllShows();
//   pageForShows(sortedShows);
//   showsSelect(sortedShows);
//   setUpShowSearch();
// }

window.onload = setup;
