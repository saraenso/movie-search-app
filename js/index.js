let searchResults = [];

const formNode = document.querySelector(".js-form");
const inputNode = document.querySelector(".js-movie-input");
const buttonNode = document.querySelector(".js-search-button");
const moviesListNode = document.querySelector(".js-movies");
const apiKey = "a33baae9";

inputNode.addEventListener("input", function (event) {
  const inputValue = event.target.value;
  const trimmedValue = inputValue.trimStart();

  if (trimmedValue !== inputValue) {
    event.target.value = trimmedValue;
  }
});

formNode.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchQuery = inputNode.value.trim();

  if (searchQuery) {
    moviesListNode.innerHTML = "";

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        searchResults = data.Search;
        moviesListNode.innerHTML = "";

        if (data.Response === "True") {
          data.Search.forEach((movie) => {
            const moviePoster = movie.Poster;
            const movieTitle = movie.Title;
            const movieYear = movie.Year;
            const movieType = movie.Type;

            const fallbackImage = "resourses/undefined-movie.png";

            const movieHTML = `
              <li class="js-movie movie">
                <div class="col">
                  <img class="movie-img" src="${moviePoster}" alt="${movieTitle}" onerror="this.src='${fallbackImage}'">
                </div>
                <div class="col">
                  <h2 class="movie-title">${movieTitle}</h2>
                  <p class="movie-year">${movieYear}</p>
                  <p class="movie-type">${movieType}</p>
                </div>
              </li>
            `;

            moviesListNode.insertAdjacentHTML("beforeend", movieHTML);
          });

          moviesListNode.addEventListener("click", function (event) {
            const clickedElement = event.target.closest(".js-movie");
            if (clickedElement) {
              const movieTitle =
                clickedElement.querySelector(".movie-title").textContent;
              const movieYear =
                clickedElement.querySelector(".movie-year").textContent;
              const movieType =
                clickedElement.querySelector(".movie-type").textContent;

              const params = new URLSearchParams();
              params.set("title", movieTitle);
              params.set("year", movieYear);
              params.set("type", movieType);

              sessionStorage.setItem("searchResults", JSON.stringify(searchResults));
              window.location.href = `movie.html?${params.toString()}`;
            }
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
        const errorHTML = `
        <li class="error">An error occurred. Please try again later.</li>
        `;
        moviesListNode.insertAdjacentHTML("beforeend", errorHTML);
      });
  }
});

window.addEventListener("load", function () {
  const storedResults = sessionStorage.getItem("searchResults");
  if (storedResults) {
    searchResults = JSON.parse(storedResults);
    moviesListNode.innerHTML = "";

    searchResults.forEach((movie) => {
      const moviePoster = movie.Poster;
      const movieTitle = movie.Title;
      const movieYear = movie.Year;
      const movieType = movie.Type;

      const fallbackImage = "resourses/undefined-movie.png";

      const movieHTML = `
        <li class="js-movie movie">
          <div class="col">
          <img class="movie-img" src="${moviePoster}" alt="${movieTitle}" onerror="this.src='${fallbackImage}'">
          </div>
          <div class="col">
            <h2 class="movie-title">${movieTitle}</h2>
            <p class="movie-year">${movieYear}</p>
            <p class="movie-type">${movieType}</p>
          </div>
        </li>
      `;

      moviesListNode.insertAdjacentHTML("beforeend", movieHTML);
    });

    moviesListNode.addEventListener("click", function (event) {
      const clickedElement = event.target.closest(".js-movie");
      if (clickedElement) {
        const movieTitle =
          clickedElement.querySelector(".movie-title").textContent;
        const movieYear =
          clickedElement.querySelector(".movie-year").textContent;
        const movieType =
          clickedElement.querySelector(".movie-type").textContent;

        const params = new URLSearchParams();
        params.set("title", movieTitle);
        params.set("year", movieYear);
        params.set("type", movieType);

        sessionStorage.setItem("searchResults", JSON.stringify(searchResults));
        window.location.href = `movie.html?${params.toString()}`;
      }
    });

    sessionStorage.removeItem("searchResults");
  }
});
