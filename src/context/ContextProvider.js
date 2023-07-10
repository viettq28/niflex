import RequestCtx from './request-ctx';
// Component có tác dụng provide context cho các children, nó cung cấp các tùy chọn fetch, IMG_BASE_URL và API_KEY để người dùng lấy các nội dung khác
const ContextProvider = ({ children }) => {
  const API_KEY = 'd2a068d7a5a0609d0c082e67b28bdbdc';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original'

  const fetchType = {
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=`,
  };
 
  return (
    <RequestCtx.Provider value={[fetchType, IMG_BASE_URL, API_KEY]}>{children}</RequestCtx.Provider>
  );
};

export default ContextProvider;
