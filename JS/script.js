//TMBD
// const options = {method: 'GET', headers: {accept: 'application/json'}};

// fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=865b999ab113c6da995bc30150b19268', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
// import config from "./config.js";
// const { API_KEY } = config;

const API_KEY = 'api_key=865b999ab113c6da995bc30150b19268';
const API_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&'
  + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = 'https://api.themoviedb.org/3/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(API_URL);


function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showMovies(data.results);

    })
}

function showMovies(data) {


  main.innerHTML = '';

  data.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie; 
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${IMG_URL + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;
    main.appendChild(movieEl);


   //alert창
    const id = movie.id;
    movieEl.setAttribute('id', id);

    movieEl.addEventListener('click', () => {
      alert(`영화ID: ${id}`);
    });
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm)
  } else {
    getMovies(API_URL);
  }
})

