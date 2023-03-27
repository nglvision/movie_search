import watchlistHtml from "./utils/watchlistHtml.js";

const listContainer = document.getElementById("list-container");
let storageList = JSON.parse(localStorage.getItem("myList"));

function renderStorageList() {
  if (!storageList || storageList.length === 0) {
    listContainer.innerHTML =
      '<img class="film-image" src="./img/explore.png"/><h3 class="film-list">보고 싶은 영화 목록이 비어있음</h3><a class="search-page" href="./index.html"><img src="./img/plus_icon.svg" />영화 찾아보기</a>';
  } else {
    listContainer.innerHTML = "";
    listContainer.style.height = "auto";
    //rendering storageList
    storageList.map(item => {
      return (listContainer.innerHTML += watchlistHtml(item));
    });
    addMinusEvent();
  }
}

function addMinusEvent() {
  document.querySelectorAll("#minus").forEach(minus => {
    addEventListener("click", e => {
      const targetId = e.target.closest(".sub-info").id;
      removeFromList(targetId);
    });
  });
}

function removeFromList(id) {
  //filtering myList and removing by id
  if (storageList.length > 0) {
    storageList = storageList.filter(movie => movie.id !== id);
  }
  localStorage.setItem("myList", JSON.stringify(storageList));
  //reloads after deleting item
  location.reload();
}
renderStorageList();
