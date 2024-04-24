//TMBD에서 가져온 코드
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjViOTk5YWIxMTNjNmRhOTk1YmMzMDE1MGIxOTI2OCIsInN1YiI6IjY2Mjg3NjFlMTc2YTk0MDE3ZjgyYmFmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yxLFJ7aLP9B74DfPkW293JFd4PP2xLR9I7ufYHqZOtg'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));