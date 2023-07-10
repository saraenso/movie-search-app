const movieCardNode = document.querySelector(".js-movie-card__wrapper");

const params = new URLSearchParams(window.location.search);
const movieTitle = params.get("title");
const movieYear = params.get("year");
const movieType = params.get("type");
const apiKey = "a33baae9";

fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}&y=${encodeURIComponent(movieYear)}&type=${encodeURIComponent(movieType)}`)
  .then((response) => response.json())
  .then((data) => {
    const moviePoster = data.Poster;
    const movieTitle = data.Title;
    const movieYear = data.Year;
    const movieRating = data.Rated;
    const movieReleaseDate = data.Released;
    const movieRunningTime = data.Runtime;
    const movieGenre = data.Genre;
    const movieDirector = data.Director;
    const movieScreenplayer = data.Writer;
    const movieStarring = data.Actors;
    const moviePlot = data.Plot;

    const fallbackImage = "resourses/undefined-movie.png";

    const movieCardHTML = `
      <div class="movie-card">
        <div class="col">
          <img class="movie-card-img" src="${moviePoster}" alt="${movieTitle}" onerror="this.src='${fallbackImage}'">
        </div>
        <div class="col">
          <h2 class="movie-title">${movieTitle}</h2>
          <div class="movie-desc__wrapper">
            <p class="movie-desc">Year: <span>${movieYear}</span></p>
            <p class="movie-desc">Rating: <span>${movieRating}</span></p>
            <p class="movie-desc">Release date: <span>${movieReleaseDate}</span></p>
            <p class="movie-desc">Running time: <span>${movieRunningTime}</span></p>
            ${movieGenre ? `<p class="movie-desc">Genre: <span>${movieGenre}</span></p>` : ''}
            ${movieDirector ? `<p class="movie-desc">Directed by: <span>${movieDirector}</span></p>` : ''}
            ${movieScreenplayer ? `<p class="movie-desc">Screenplayed by: <span>${movieScreenplayer}</span></p>` : ''}
            ${movieStarring ? `<p class="movie-desc">Starring: <span>${movieStarring}</span></p>` : ''}
          </div>
        </div>
      </div>
      <p class="movie-plot">${moviePlot}</p>
    `;

    movieCardNode.innerHTML = movieCardHTML;
  })
  .catch((error) => {
    console.error(error);
    const errorHTML = `<p class="error">An error occurred. Please try again later.</p>`;
    movieCardNode.innerHTML = errorHTML;
  });
