import { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';

import YouTube from 'react-youtube';

import classes from './MovieDetail.module.css';

const MovieDetail = (props) => {
  const {
    id,
    title,
    name,
    release_date: rDate,
    first_air_date: faDate,
    vote_average: vote,
    overview,
    apiKey,
  } = props;
  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  // State media chứa video miêu tả nêu có, không thì backdrop_path Img của Movie
  const [media, setMedia] = useState(null);
  const { isLoading, error, sendRequest } = useHttp();
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

  useEffect(() => {
    // Fnc getMedia để xử lý dữ liệu trả về sau khi fetch
    const getMedia = (data) => {
      const results = data.results;
      // properMedia là mảng chứa các kết quả có site là 'YouTube' và type là 'Trailer' hoặc 'Teaser'
      // Lọc kết quả và push vào properMedia
      const properMedia = [];
      results.forEach((result) => {
        if (
          result.site === 'YouTube' &&
          (result.type === 'Trailer' || result.type === 'Teaser')
        ) {
          properMedia.push(result);
        }
      });
      // Nếu properMedia không có property thì throwError cho useHttp
      // Sort properMedia, đưa kết quả có type 'Trailer' lên đầu
      if (properMedia.length === 0) throw new Error('No properMedia');
      if (properMedia.length > 0) {
        properMedia.sort((a) => {
          if (a.type === 'Trailer') return -1;
          if (a.type === 'Teaser') return 1;
        });
        // Truyền videoId từ key của properMedia ở vị trí đầu tiên cùng opts
        setMedia(<YouTube videoId={properMedia[0].key} opts={opts} />);
      }
    };
    // Gọi send request để fetch url và xử lý data bằng getMedia function
    sendRequest(url, getMedia);
  }, []);

  useEffect(() => {
    // Kiểm tra error state trả về từ useHttp, nếu true thì setMedia bằng backdrop img
    if (error) {
      setMedia(
        <div>
          <img
            className="object-fit-cover w-100"
            src={`${props.imgSrc}${props.backdrop_path}`}
          ></img>

        </div>
      );
    }
  }, [error]);
  // Hiển thị các data đã được xử lý, category NetFlixOriginal có các properties khác các phần còn lại các categories nên cần kiểm tra sự tồn tại của các key trước
  return (
    <div className={classes['detail-container']}>
      <div className={classes['info']}>
        <h4 className="fw-bold">{title ?? name}</h4>
        <div className="fw-bold">
          <p>
            {rDate ? `Release Date: ${rDate}` : `First Air Date: ${faDate}`}
          </p>
          <p>{`Vote: ${vote}/10`}</p>
        </div>
        <div className="overview">{overview}</div>
      </div>
      {media}
    </div>
  );
};
export default MovieDetail;
