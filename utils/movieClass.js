export default class Movie {
  constructor(options) {
    (this.poster = options.Poster),
      (this.title = options.Title),
      (this.year = options.Year),
      (this.plot = options.Plot),
      (this.id = options.imdbID);
  }
}
