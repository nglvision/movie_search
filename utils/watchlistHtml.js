export default function watchlistHtml(movie) {
  return `
  <div class="search-result">
   <div class="poster"><img src="${movie.poster}" alt="poster-image"/></div>
   <div class="movie-info">
    <h3 class="title">${movie.title}</h3>
    <div class="sub-info" id='${movie.id}'>
      <p id="year">${movie.year}</p>
      <p id="plot">${movie.plot}</p>
      <p id="minus"><img src="./img/minus_icon.svg"/>내 목록에서 지우기</p>
    </div>
   </div>
  </div>
  <hr />
  `;
}
