/*<API 키 및 URL 설정>
API 키는 `API_KEY` 변수에 저장
API 요청을 보낼 때 필요한 URL은 `API_URL`
이미지 URL은 `IMG_URL`, 
검색 URL은 `searchURL` 변수에 저장
*/
const API_KEY = 'api_key=865b999ab113c6da995bc30150b19268';
const API_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&'
  + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = 'https://api.themoviedb.org/3/search/movie?' + API_KEY;

/*DOM 요소 가져오기
HTML에서 id가  main, form, search인 요소들 가져 오기
*/
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(API_URL);

/*영화 가져오기 함수 getMoves
주어진 URL에서 영화 데이터를 가져오는 비동기 함수임
fetch API를 사용하여 데이머를 가져오고, then 메서드를 사용하여 응답을 JSON형식으로 변환
가져온 데이터를 showMovies함수로 전달하여 표시
*/
function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showMovies(data.results);

    })
}

/*영화 표시 함수
주어진 데이터를 기반으로 화면에 영화를 표시하는 함수임

 */
function showMovies(data) {
  main.innerHTML = ''; //data를 가져올 때마다 갱신하기 위해 main요소의 내용을 비운다.

  data.forEach(movie => {           //주어진 영화 데이터배열을 순회하면서 각 영화에 대한 HTML요소를 생성하고 화면에 표시한다.
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
   //각 영화 div에는 클릭 이벤트 리스너가 추가되어 해당 영화의 ID를 기반으로 알림창이 표시된다.
    const id = movie.id;
    movieEl.setAttribute('id', id);

    movieEl.addEventListener('click', () => {
      alert(`영화ID: ${id}`);
    });
  });
}

//주어진 평점에 따른 적절한 색상 반환
function getColor(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}


//검색 이벤트 리스너

form.addEventListener('submit', (e) => {
  e.preventDefault(); //새로고침 방지와 자바스크립트로 폼 제어

  const searchTerm = search.value;//검색어 가져오기

  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm) // 검색어가 있는 경우, API에 검색어를 포함한 URL전달하여 검색하도록 요청
  } else {
    getMovies(API_URL); //검색어가 없는 경우 인기 있는 영화목록 가져오기
  }
})

