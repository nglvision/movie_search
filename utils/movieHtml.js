export default function movieHtml(movie) {
  return `
  <div class="search-result">
   <div class="poster"><img src="${movie.poster}" alt="poster-image"/></div>
   <div class="movie-info">
    <h3 class="title">${movie.title}</h3>
    <div class="sub-info" id='${movie.id}'>
      <p id="year">${movie.year}</p>
      <p id="plot">${movie.plot}</p>
      <p id="plus"><img src="./img/plus_icon.svg"/>내 목록에 추가하기</p>
    </div>
   </div>
  </div>
  <hr />
  `;
}
