const movieSearchBox = document.getElementById("movie-search-box");
const searchListElement = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

async function loadApiMovies(searchName) {
  const ApiUrl = `https://omdbapi.com/?s=${searchName}&page=1&apikey=febf05d9`;
  const fetchres = await fetch(`${ApiUrl}`);
  const data = await fetchres.json();
  if (data.Response == "True") MovieListDisplayFunc(data.Search);
}


function findApiMovies() {
  let searchMovie = movieSearchBox.value.trim();
  if (searchMovie.length > 0) {
    searchListElement.classList.remove("hide-search-list");
    loadApiMovies(searchMovie);
  } else {
    searchListElement.classList.add("hide-search-list");
  }
}


function MovieListDisplayFunc(movies) {
  searchListElement.innerHTML = "";
  let movieposter = "";
  for (let movie = 0; movie < movies.length; movie++) {
    let movieListItemElement = document.createElement("div");
    movieListItemElement.dataset.id = movies[movie].imdbID; // setting movie id in  data-id
    movieListItemElement.classList.add("search-list-item");
    if (movies[movie].Poster != "N/A") movieposter = movies[movie].Poster;
    else movieposter = "image_not_found.png";

    movieListItemElement.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${movieposter}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[movie].Title}</h3>
            <p>${movies[movie].Year}</p>
        </div>
        `;
    searchListElement.appendChild(movieListItemElement);
  }
  LoadedMovieDetails();
}

function LoadedMovieDetails() {
  const searchListElementMovies =
    searchListElement.querySelectorAll(".search-list-item");
  searchListElementMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      searchListElement.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`
      );
      const Loadedmovie = await result.json();
      displayLoadedMovieDetails(Loadedmovie);
    });
  });
}