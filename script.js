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

populateShowsSelect(sortedShows);



function makePageForEpisodes(episodes) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  let pageForEpisodes = episodes.forEach((item) => {
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
    paragraph.innerHTML = item.summary;

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
  let searchInput = document.getElementById("search-input");
  let searchInputValue = searchInput.value.toLowerCase();
  let splitSearch = searchInputValue.split(" ");
  // let pageWithEpisodes = allEpisodes;
  let filteredArr = [...allEpisodes].filter((element) => {
    let name = element.name.toLowerCase();
    let paragraph = element.summary.toLowerCase();
    let allText = name + " " + paragraph;
    return containsAllSubStrings(allText, splitSearch);
  });

  function containsAllSubStrings(targetString, searchSubstrings) {
    return searchSubstrings.every((item) => targetString.includes(item));
  }

  makePageForEpisodes(filteredArr);
  displayingAllEpisodesLength(filteredArr);
}

function setUpSearch() {
  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", filteredSearch);
}

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
  let selectField = document.createElement("select");
  selectField.setAttribute("id", "select-field");

  episodes.forEach((item) => {
    let optionField = document.createElement("option");
    let name = item.name;
    let season = item.season.toString().padStart(2, "0");
    let episode = item.number.toString().padStart(2, "0");
    let designation = `#S${season}E${episode} - ${name}`;
    optionField.value = designation;
    optionField.innerText = `S${season}E${episode} - ${name}`;
    selectField.appendChild(optionField);
  });

  let formContainer = document.querySelector(".form");
  formContainer.appendChild(selectField);

  selectField.addEventListener("change", (event) => {
    console.log(event.target.value);
    let designation = event.target.value;
    let filteredEpisode = episodes.filter((item) => {
      let name = item.name;
      let season = item.season.toString().padStart(2, "0");
      let episode = item.number.toString().padStart(2, "0");
      let designation1 = `#S${season}E${episode} - ${name}`;
      return designation1 === designation;
    });
    makePageForEpisodes(filteredEpisode);
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

const setup = async () => {
  // let allEpisodes = getAllEpisodes();
  const res = await fetch("https://api.tvmaze.com/shows/82/episodes");
  allEpisodes = await res.json();

  makePageForEpisodes(allEpisodes);
  populateEpisodesSelect(allEpisodes);
  filteredSearch(allEpisodes);
  displayingAllEpisodesLength(allEpisodes);
  setUpSearch();
  menu();
};

//LEVEL 400///////////

const fetchAllEpsiodes = async (showId) => {
  // url: https://api.tvmaze.com/shows/SHOW_ID/episodes
  const res = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
  allEpisodes = await res.json();

  makePageForEpisodes(allEpisodes);
  populateEpisodesSelect(allEpisodes);
  console.log(allEpisodes);
};

function populateShowsSelect(shows) {
  let showsSelect = document.createElement("select");
  showsSelect.setAttribute("id", "shows-select");
  shows.forEach((show) => {
    let option = document.createElement("option");
    option.classList.add("shows-option");
    // option.value = `https://api.tvmaze.com/shows/${show.id}/episodes`;
    option.value = show.id; // 1632
    option.innerText = show.name;
    showsSelect.appendChild(option);
  });

  let formContainer = document.querySelector(".form");
  formContainer.appendChild(showsSelect);

  // I click the shows dropdown with show 1632
  // that creates an event:
  showsSelect.addEventListener("change", (event) => {
    console.log(event);
    // event = {
    //   target: {
    //     value: 1632
    //   },
    // }
    const showId = event.target.value;
    // targetValueArray.push(event.target.value);
    allEpisodes = [];
    fetchAllEpsiodes(showId);

    let episodesSelect = document.getElementById("select-field");
    episodesSelect.remove();

    let text = showsSelect.options[showsSelect.selectedIndex].text;
    let oldShowTitle = document.getElementById("main-title");
    oldShowTitle.innerText = text;
  });
}

window.onload = setup;
