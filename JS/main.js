import { getMovies } from "./movies.js";
import { form, search } from "./search.js";
import config from "./config.js"; // config.js 파일 import

const API_KEY = config.API_KEY; // API_KEY를 config에서 가져오기

const API_URL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=" + API_KEY;

getMovies(API_URL);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (searchTerm) {
    getMovies(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}`);
  } else {
    getMovies(API_URL);
  }
});
