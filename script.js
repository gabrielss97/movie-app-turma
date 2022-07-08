const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const mainEl = document.querySelector("#main");
const formEl = document.querySelector("#form");
const searchEl = document.querySelector("#search");

getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  createCards(respData.results);
}

function createCards(movies) {
  mainEl.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieCardEl = document.createElement("div");
    movieCardEl.classList.add("movie");

    movieCardEl.innerHTML = `
    <img
    src="${IMGPATH + poster_path}"
    alt="${title}"
    />
    <div class="movie-info">
    <h3>${title}</h3>
    <span class="${
      vote_average >= 8 ? "green" : vote_average >= 5 ? "orange" : "red"
    }">${vote_average}</span>
    </div>
    <div class="overview">
    <h3>Overview:</h3>
    ${overview}
    </div>
    `;
    mainEl.appendChild(movieCardEl);
  });
}

// function getClassColor(vote) {
//   if (vote >= 8) {
//     return "green";
//   } else if (vote >= 5) {
//     return "orange";
//   } else {
//     return "red";
//   }
// }

// formEl.addEventListener("submit", (event) => {
//   event.preventDefault();

//   if (searchEl.value) {
//     getMovies(SEARCHAPI + searchEl.value);
//   }

//   searchEl.value = "";
// });

searchEl.addEventListener("keyup", () => {
  getMovies(SEARCHAPI + searchEl.value);
});
