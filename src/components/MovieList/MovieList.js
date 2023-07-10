import { useState, useContext, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';

import classes from './MovieList.module.css';
import Movie from './Movie';

import RequestCtx from '../../context/request-ctx';

const MovieList = ({ id, selectedCategory, handleClick, searchTerm }) => {
  const [category, vietSub] = selectedCategory;
  const [movies, setMovies] = useState([]);
  const [options, imgSrc, apiKey] = useContext(RequestCtx);
  // Nếu selectedCategory là Search thì thêm searchTerm vào sau Url lấy từ fetchSearch
  const url = `${options[`fetch${category}`]}${
    category === 'Search' ? searchTerm : ''
  }`;
  const { sendRequest } = useHttp();

  useEffect(() => {
    // Fetch dữ liệu từ url xong setMovies để đưa vào component
    // nếu Category là Search thì Url sẽ thay đổi nên thêm Url list denpendencies, đồng thời cũng là rỗng State movies mỗi lần useEffect chạy lại
    setMovies([]);
    const getMoviesList = (data) => {
      data.results.forEach((movie) => {
        if (movie.poster_path && movie.backdrop_path) {
          setMovies((prevMovies) => [...prevMovies, movie]);
        }
      });
    };
    sendRequest(url, getMoviesList);
  }, [url, sendRequest]);
  // Category là NetflixOriginals hay Search thì sẽ render Img dựa trên poster_path
  // Category là NetflixOriginals thì chỉ render ra 10 movie
  // Truyên handleClick và bind movie + listId
  if (category === 'NetflixOriginals' || category === 'Search') {
    return (
      <>
        <div className={classes['movies-list__original']}>
          {movies.map((movie, i) => {
            if (i <= 9 || category === 'Search') {
              return (
                <Movie
                  key={movie.id + i}
                  imgSrc={imgSrc}
                  movie={movie}
                  display={'poster'}
                  handleClick={handleClick.bind(null, {...movie, apiKey: apiKey, imgSrc: imgSrc}, id && id)}
                />
              );
            }
            return null;
          })}
        </div>
      </>
    );
  }
  // Các categories khác thì render Img dựa trên poster_path (măc định), cũng truyền handleClick tương tự trên
  return (
    <div className="position-relative">
      <h5 className="text-white">{vietSub}</h5>
      <div className={classes['movies-list']}>
        {movies.map((movie, i) => {
          return (
            <Movie
              key={movie.id + i}
              imgSrc={imgSrc}
              movie={movie}
              handleClick={handleClick.bind(null, {...movie, apiKey: apiKey, imgSrc: imgSrc}, id && id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
