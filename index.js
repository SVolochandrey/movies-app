const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=f142a78acdaeb700a5127e9c79c73889";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const searchAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=f142a78acdaeb700a5127e9c79c73889&query=";

const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchAPI + searchTerm);
    search.value = "";
  }
});

getMovies(API_URL);
async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
        <img 
        src = '${IMG_PATH + poster_path}'
        alt = '${title}'
        />
        <div class='movie-info'>
        <h3>${title}</h3>
        <span class='${getClassByRate(vote_average)}'>${vote_average}</span>
        </div>
        <div class='overview'>
        <h3>Overview:</h3>
        ${overview}
        </div>
        `;

    main.appendChild(movieEl);
  });
}
