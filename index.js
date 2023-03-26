import movieClass from "./utils/movieClass.js";
import movieHtml from "./utils/movieHtml.js";

const searchBtn = document.querySelector(".search");
const searchInput = document.getElementById("search-input");
const container = document.getElementById("container");
const count = document.getElementById("count");
let films = JSON.parse(localStorage.getItem("myList")) || [];
count.innerText = films.length;
let movieArray = [];

//looking for imdbID of movies
async function searchMovieByTitle(title) {
  container.innerHTML = "";
  container.style.height = "auto";
  const responseByTitle = await fetch(
    `http://www.omdbapi.com/?s=${title}&type=movie&apikey=a0be60df`
  );
  const dataByTitle = await responseByTitle.json();
  searchMovieById(dataByTitle);
}

//searching by imdbID to get more data on the movie found by title
function searchMovieById(dataByTitle) {
  dataByTitle.Search.map(async item => {
    const responseById = await fetch(
      `http://www.omdbapi.com/?i=${item.imdbID}&apikey=a0be60df`
    );
    const dataById = await responseById.json();
    if (dataById.Poster === "N/A") {
      dataById.Poster = "./img/no_image.jpg";
    }
    const movie = new movieClass(dataById);
    document.getElementById("container").innerHTML += movieHtml(movie);
    addPlusEvent();
    //building movieArray
    movieArray.push(movie);
  });
}

//adding event to plus element
function addPlusEvent() {
  document.querySelectorAll("#plus").forEach(plus => {
    plus.addEventListener("click", e => {
      const targetId = e.target.closest(".sub-info").id;
      addToList(targetId);
    });
  });
}
//adding to local storage
function addToList(favoriteId) {
  // finding the clicked movie
  const favouriteMovie = movieArray.find(item => item.id === favoriteId);
  if (films.length > 0) {
    films = films.filter(movie => movie.id !== favoriteId);
  }
  films.push(favouriteMovie);
  count.innerText = films.length;
  return localStorage.setItem("myList", JSON.stringify(films));
}

//button of submit for search
searchBtn.addEventListener("click", e => {
  e.preventDefault();
  searchMovieByTitle(searchInput.value).catch(err => {
    container.style.height = "calc(80vh - 38px)";
    container.innerHTML =
      '<img class="explore-image" src="./img/search_icon.svg" alt="explore-image" /><h3 style="color:white" class="explore">검색 결과가 없습니다. 다른 영화 검색해 보세요.</h3>';
  });
});
