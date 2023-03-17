const searchBtn = document.querySelector(".search");
const searchInput = document.getElementById("search-input");
const container = document.getElementById("container");
const exploreImage = document.querySelector(".explore-image");
const exploreHeader = document.querySelector(".explore");
const count = document.getElementById("count");
let films = JSON.parse(localStorage.getItem("myList")) || [];
let movieArray = [];

count.textContent = films.length;

function getMovie(title) {
  container.innerHTML = "";
  container.style.height = "auto";
  //fetching data
  fetch(`http://www.omdbapi.com/?s=${title}&type=movie&apikey=a0be60df`)
    .then(res => res.json())
    .then(data => {
      data.Search.map(item => {
        fetch(`http://www.omdbapi.com/?i=${item.imdbID}&apikey=a0be60df`)
          .then(res => res.json())
          .then(data => {
            if (data.Poster === "N/A") {
              data.Poster = "./img/no_image.jpg";
            }
            const poster = data.Poster;
            const title = data.Title;
            const year = data.Year;
            const plot = data.Plot;
            const id = data.imdbID;
            // rendering results of search by imdbID
            container.innerHTML += `
            <div class="search-result">
             <div class="poster"><img src="${poster}" alt="poster-image"/></div>
             <div class="movie-info">
              <h3 class="title">${title}</h3>
              <div class="sub-info">
                <p id="year">${year}</p>
                <p class="plus" onclick='addToList("${id}")'><img src="./img/plus_icon.svg"/>내 목록에 추가하기</p>
                <p id="plot">${plot}</p>
              </div>
             </div>
            </div>
            <hr />
              `;
            //constructing movie object
            const movie = new Movie(
              data.imdbID,
              data.Title,
              data.Poster,
              data.Year,
              data.Plot,
              false
            );
            //building movieArray
            movieArray.push(movie);
          });
      });
    })
    //if there is no result of another error
    .catch(err => {
      container.style.height = "calc(80vh - 38px)";
      container.innerHTML =
        '<img class="explore-image" src="./img/search_icon.svg" alt="explore-image" /><h3 style="color:white" class="explore">검색 결과가 없습니다. 다른 영화 검색해 보세요.</h3>';
    });
}
//button of submit for search
searchBtn.addEventListener("click", e => {
  e.preventDefault();
  getMovie(searchInput.value);
});
// adding to localStorage
function addToList(id) {
  //finding the clicked movie
  const favouriteMovie = movieArray.find(item => item.id === id);
  // check if there is similar saved to localStorage
  const checkId = films.map(item => item.id).some(itemId => itemId === id);
  if (checkId) {
    return localStorage.setItem("myList", JSON.stringify(films));
  } else {
    films.push(favouriteMovie);
    count.textContent = films.length;
    return localStorage.setItem("myList", JSON.stringify(films));
  }
}

//movie object constructor
class Movie {
  constructor(id, title, poster, year, plot, favourite) {
    (this.id = id),
      (this.title = title),
      (this.poster = poster),
      (this.year = year),
      (this.plot = plot);
    this._favourite = favourite;
    // this.movieHtml = this.movieHtml.bind(this);
  }
  get favourite() {
    return this._favourite;
  }
  set favourite(favourite) {
    if (favourite) {
      return true;
    } else {
      return false;
    }
  }
}
