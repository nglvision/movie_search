const listContainer = document.getElementById("list-container");
const storageList = JSON.parse(localStorage.getItem("myList"));

if (!storageList.length) {
  listContainer.innerHTML =
    '<img class="film-image" src="./img/explore.png"/><h3 class="film-list">보고 싶은 영화 목록이 비어있음</h3><a class="search-page" href="../index.html"><img src="./img/plus_icon.svg" />영화 찾아보기</a>';
} else {
  listContainer.innerHTML = "";
  listContainer.style.height = "auto";
  //renderitn storageList
  storageList.map(item => {
    return (listContainer.innerHTML += `
        <div class="search-result">
         <div class="poster"><img src="${item.poster}"/></div>
         <div class="movie-info">
          <h3 class="title">${item.title}</h3>
          <div class="sub-info">
            <p id="year">${item.year}</p>
            <button class="minus" onclick='removeFromList("${item.id}")' ><img src="./img/minus_icon.svg"/>내 목록에서 지우기</button>
            <p id="plot">${item.plot}</p>
            </div>
         </div>
        </div>
        <hr />
          `);
  });
}
function removeFromList(id) {
  // deletes from localStorage
  const getItem = storageList.find(item => item.id === id);
  const index = storageList.indexOf(getItem);
  storageList.splice(index, 1);
  localStorage.setItem("myList", JSON.stringify(storageList));
  //reloads after deleting item
  location.reload(false);
}

// localStorage.clear();
