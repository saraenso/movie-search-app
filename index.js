const formNode = document.querySelector(".js-form");
const inputNode = document.querySelector(".js-movie-input");
const buttonNode = document.querySelector(".js-search-button");
const moviesListNode = document.querySelector(".js-movies");
const apiKey = "a33baae9";

formNode.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchQuery = inputNode.value;

  if (searchQuery) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        moviesListNode.innerHTML = "";

        if (data.Response === "True") {
          data.Search.forEach((movie) => {
            const moviePoster = movie.Poster;
            const movieTitle = movie.Title;
            const movieYear = movie.Year;
            const movieType = movie.Type;

            const movieHTML = `
              <li class="js-movie movie">
                <div class="col">
                  <img class="movie-img" src="${moviePoster}" alt="${movieTitle}">
                </div>
                <div class="col">
                  <h2 class="movie-title">${movieTitle}</h2>
                  <h3 class="movie-year">${movieYear}</h3>
                  <p class="movie-type">${movieType}</p>
                </div>
              </li>
            `;

            moviesListNode.insertAdjacentHTML("beforeend", movieHTML);
          });
        } else {
          const errorHTML = `
          <li class="error">No results found...</li>
          `;
          moviesListNode.insertAdjacentHTML("beforeend", errorHTML);
        }
      })
      .catch((error) => {
        console.error(error);
        const errorHTML= `
        <li class="error">An error occured. Please try again later.</li>
        `;
        moviesListNode.insertAdjacentHTML("beforeend", errorHTML);
      })
  }
});
