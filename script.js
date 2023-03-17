// //You can edit ALL of the code here

const allShows = getAllShows();

// ///////Slideshow

const mostPopularShows = allShows.filter((obj) => obj.rating.average >= 9);

// const imagesForSlideshow = mostPopularShows.map((item) => {
//   // console.log(item.rating.average);
//   // console.log(mostPopularShows.length);
//   // const slideshowImage = document.createElement("img");
//   // slideshowImage.classList.add("slideshow-image");
//   // const slideshowWrapper = document.getElementById("slideshow-wrapper");
//   // slideshowWrapper.appendChild(slideshowImage);
//   // slideshowImage.src =
//   return (
//     item.image?.original ??
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSweXgcvq_bb0THeLZJ0daDBuSgxMWpQ5BTw8r0_6B0&s"
//   );
// });

// const radioButtons = document.querySelectorAll('input[name="sort-by"]');
// btn.addEventListener("click", () => {
//   let selectedSize;
//   radioButtons.forEach((radioButton) => {
//     if (radioButton.checked) {
//       selectedSize = radioButton.value;
//     }
//   });
//   console.log(selectedSize);
// });
let sortBy = ""
const radioButtons = document.querySelectorAll('input[name="sort-by"]');
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("click", (e) => {
    console.log(e.target.value);
    sortBy = e.target.value
    myFileter(e.target.value)
  });
});

const imagesForSlideshow = mostPopularShows.map((item) => {
  console.log(item.rating.average);
  console.log(mostPopularShows.length);
  const slideshowImage = document.createElement("img");
  slideshowImage.classList.add("slideshow-image");
  const slideshowWrapper = document.getElementById("slideshow-wrapper");
  console.log(slideshowWrapper);
  slideshowWrapper.appendChild(slideshowImage);
  slideshowImage.src =
    item.image?.original ??
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSweXgcvq_bb0THeLZJ0daDBuSgxMWpQ5BTw8r0_6B0&s";
});

// console.log(imagesForSlideshow);

// let count = 2;
// let intervalId = null;

// const slideshowWrapper = document.querySelector(".slideshow-wrapper");

// function dragging(e) {
//   slideshowWrapper.scrollLeft = e.pageX;
// }
// slideshowWrapper.addEventListener("load", () => {
//   setIntervalId = setInterval(() => {}, 3000);
// });

// window.addEventListener("load", () => {
//   intervalId = setInterval(goForward, 3000);
// });

// function goForward() {
//   const slideshowImage = document.getElementById("slideshow-wrapper");
//   slideshowImage.style.border = "2px dotted red";
//   slideshowImage.style.height = "500px";
//   count++;
//   slideshowImage.style.backgroundImage = `url(${imagesForSlideshow[count]})`;

//   if (count === imagesForSlideshow.length) {
//     count = 0;
//     slideshowImage.style.backgroundImage = imagesForSlideshow[count];
//   }
// }

// window.addEventListener("load", () => {
//   intervalId = setInterval(goBackward, 3000);
// });

// function goForward() {
//   count++;
//   let showSlideshow = document.getElementById("show-slideshow");
//   let urlS = allShows.map((item) => item.image.medium);

//     showSlideshow.src =
//       item.image?.medium ??
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSweXgcvq_bb0THeLZJ0daDBuSgxMWpQ5BTw8r0_6B0&s";

//     item[count];
//     if (count === allShows.length) {
//       count = 0;
//       showSlideshow.src = item[count];
//     }
//   );
// }

// function goBackward() {
//   if (count === 0) {
//     count = imagesArray.length;
//     imgSlideshow.src = imagesArray[count];
//   }

//   count--;
//   imgSlideshow.src = imagesArray[count];
// }

//////

let allEpisodes = [];

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

function truncateSummary(summary) {
  return `${summary.substr(0, 250)}...`;
}

function pageForShows(sortedShows) {
  let root = document.getElementById("root");
  root.innerHTML = "";

  let totalShows = document.querySelector(".search-results");
  totalShows.innerText = `Displaying ${sortedShows.length} shows`;
  // totalShows.style.fontStyle = "italic";

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
      let newTitle = document.getElementById("main-title");
      newTitle.innerText = item.name;
      setUpEpisodeSearch();
      displayingShowsLength(sortedShows);
    });

    let showSummary = document.createElement("p");
    showSummary.classList.add("show-summary");
    showSummary.innerHTML =
      item.summary.length <= 250 ? item.summary : truncateSummary(item.summary);

    ////

    let readMoreSummary = document.createElement("a");
    readMoreSummary.innerText =
      showSummary.innerHTML === item.summary ? "" : "Read more";
    let showShortSummary = true;

    readMoreSummary.addEventListener("click", () => {
      showShortSummary = !showShortSummary;
      showSummary.innerHTML = showShortSummary
        ? truncateSummary(item.summary)
        : item.summary;
      showSummary.appendChild(readMoreSummary);
    });

    /////

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
    showSummary.appendChild(readMoreSummary);
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
    let mainTitle = document.getElementById("main-title");
    let filteredShow = sortedShows.filter(
      (show) => Number(show.id) === Number(showId)
    );
    console.log(showId);
    console.log(event.target.value);
    let newTitle = filteredShow.map((item) => item.name);
    console.log(newTitle);
    mainTitle.innerText = `/ ${newTitle}`;

    fetchAllEpsiodes(showId);
    fetchCasts(showId);

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
  display.innerText = `Found ${shows.length} show(s)`;
}

function displayingAllEpisodesLength(episodes) {
  let display = document.querySelector(".search-results");
  display.innerText = `Displaying ${episodes.length} / ${episodes.length} episode(s)`;
}

function pageForEpisodes(episodes) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  console.log(sortedShows);

  let displayAllShowsLink = document.getElementById("all-shows-link");
  console.log(displayAllShowsLink);
  displayAllShowsLink.addEventListener("click", () => {
    let newTitle = document.getElementById("main-title");
    newTitle.innerText = "Shows";
    let display = document.querySelector(".search-results");
    display.innerText = "";
    displayAllShowsLink.style.display = "none";
    pageForShows(sortedShows);
    let episodeSearchWrapper = document.getElementById(
      "episode-search-wrapper"
    );
    episodeSearchWrapper.style.display = "none";
    let episodeSelectWrapper = document.getElementById(
      "episode-select-wrapper"
    );

    episodeSelectWrapper.style.display = "none";
  });

  let display = document.querySelector(".search-results");
  display.style.display = "block";

  displayAllShowsLink.style.display = "inline";

  let episodeSearchWrapper = document.getElementById("episode-search-wrapper");
  episodeSearchWrapper.style.display = "inline";

  let episodeSelectWrapper = document.getElementById("episode-select-wrapper");
  episodeSelectWrapper.style.display = "inline";

  let episodeSectionContainer = document.createElement("div");
  episodeSectionContainer.classList.add("episode-section-container");

  let page = episodes.forEach((item) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("episode-section");

    let image = document.createElement("img");
    image.classList.add("image");
    image.src =
      item.image?.medium ??
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSweXgcvq_bb0THeLZJ0daDBuSgxMWpQ5BTw8r0_6B0&s";

    let heading = document.createElement("h2");
    heading.classList.add("episode-title");

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
  let cast = document.createElement("button");
  cast.innerText = "Cast";
  cast.addEventListener("click", fetchCasts);
}

function menu() {
  let mobileMenuItems = document.querySelector(".header-menu-mobile");
  let mobileMenu = document.querySelector(".hamburger-menu-display");
  mobileMenu.addEventListener("click", () => {
    mobileMenuItems.classList.toggle("open");
  });
}

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
  let episodeInput = document.getElementById("episode-input");
  episodeInput.addEventListener("keyup", filteredSearch);
}

function displayingAllEpisodesLength(episodes) {
  let display = document.querySelector(".search-results");
  display.innerText = `Displaying ${episodes.length} / ${episodes.length} episode(s)`;
}

function populateEpisodesSelect(episodes) {
  let episodeSelect = document.getElementById("episode-select");
  episodeSelect.innerHTML = "";

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

  // let formContainer = document.querySelector(".form");
  // formContainer.appendChild(episodeSelect);

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

const fetchAllEpsiodes = async (showId) => {
  // url: https://api.tvmaze.com/shows/SHOW_ID/episodes
  const res = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
  allEpisodes = await res.json();
  console.log(allEpisodes);
  pageForEpisodes(allEpisodes);
  populateEpisodesSelect(allEpisodes);
};

const fetchCasts = async (showId) => {
  // url: https://api.tvmaze.com/shows/SHOW_ID/episodes
  const res = await fetch(`http://api.tvmaze.com/shows/${showId}?embed=cast`);
  list = await res.json();
  console.log(list);

  let castArray = list._embedded.cast;
  let castContainer = document.createElement("div");
  castContainer.classList.add("cast-container");

  let detailsElement = document.createElement("details");
  let summary = document.createElement("summary");
  summary.innerText = "Casts";
  detailsElement.appendChild(summary);
  let castText = document.createElement("h2");
  let root = document.getElementById("root");
  castText.innerText = "Casts";
  root.appendChild(castText);
  castArray.forEach((obj) => {
    let section = document.createElement("div");

    let castMemberImage = document.createElement("img");
    castMemberImage.classList.add("cast-member-image");
    castMemberImage.src = obj.person.image.medium;

    let castMemberName = document.createElement("p");
    castMemberName.classList.add("cast-member-name");
    castMemberName.innerText = obj.person.name;

    section.appendChild(castMemberImage);
    section.appendChild(castMemberName);

    castContainer.appendChild(section);
  });

  root.insertBefore(detailsElement, root.children[0]);
  detailsElement.appendChild(castContainer);
};

function setup() {
  pageForShows(sortedShows);
  showsSelect(sortedShows);
  setUpShowSearch();
  const clickBtn = document.getElementById("click-btn");
  const ratingRadioButtons = document.querySelectorAll("input[sort-by]");
  for (const btn of ratingRadioButtons) {
    btn.addEventListener("change", () => {
      console.log("radio");
      pageForShows(allShows);
    });
  }
}

// const filterRating = () => {
//   const rating = doucment.getElementById("rating");
//   rating.addEventListener("checked", () => {
//     pageForShows(allShows);
//   });
// };

window.onload = setup;
