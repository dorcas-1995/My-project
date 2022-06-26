const movieSearchBox = document.getElementById("movie-search-box");
const searchListElement = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

async function loadApiMovies(searchName) {
  const ApiUrl = `https://omdbapi.com/?s=${searchName}&page=1&apikey=febf05d9`;
  const fetchres = await fetch(`${ApiUrl}`);
  const data = await fetchres.json();
  if (data.Response == "True") MovieListDisplayFunc(data.Search);
}
