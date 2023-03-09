const searchBtn = document.querySelector(".search");
const searchInput = document.getElementById("search-input");
const container = document.getElementById("container");
const exploreImage = document.querySelector(".explore-image");
const exploreHeader = document.querySelector(".explore");
let films = JSON.parse(localStorage.getItem("myList")) || [];

function getMovie(title) {
  container.innerHTML = "";
  container.style.height = "auto";
  //fetching data
  fetch(`http://www.omdbapi.com/?s=${title}&type=movie&apikey=a0be60df`)
    .then(res => res.json())
    .then(data => {
      data.Search.map(item => {
        if (item.Poster === "N/A") {
          item.Poster = "./img/no_image.jpg";
        }
        const poster = item.Poster;
        const title = item.Title;
        const year = item.Year;
        const id = item.imdbID;
        container.innerHTML += `
        <div class="search-result">
         <div class="poster"><img src="${poster}" alt="poster-image"/></div>
         <div class="movie-info">
          <h3 class="title">${title}</h3>
          <div class="sub-info">
            <p>${year}</p>
            <button title='추가됨' class="plus" onclick='addToList("${poster}", "${title}","${id}",${year})'><img src="./img/plus_icon.svg"/>내 목록에 추가하기</button>
          </div>
         </div>
        </div>
        <hr />
          `;
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
function addToList(poster, title, id, year) {
  const obj = {
    poster,
    title,
    id,
    year,
  };
  // check if there is similar saved to localStorage
  const checkId = films.map(item => item.id).some(itemId => itemId === obj.id);
  if (checkId) {
    return localStorage.setItem("myList", JSON.stringify(films));
  } else {
    films.push(obj);
    return localStorage.setItem("myList", JSON.stringify(films));
  }
}
//   fetch("http://www.omdbapi.com/?apikey=a0be60df")
// localStorage.clear();
