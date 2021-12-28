import './listItem.scss';
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  console.log(item);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get('/movies/find/' + item, {
          headers: {
            token:
              'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
          },
        });
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to={{ pathname: '/watch', movie }}>
      <div
        className='listItem'
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          // src='https://images.pexels.com/photos/10305718/pexels-photo-10305718.jpeg?cs=srgb&dl=pexels-sof%C3%ADa-rabassa-10305718.jpg&fm=jpg'
          src={movie.img}
          alt=''
        />
        {isHovered && (
          <>
            <video
              src={movie.trailer || '../../assets/Loading3.mov'}
              autoPlay={true}
              loop
            />
            <div className='itemInfo'>
              <div className='icons'>
                <PlayArrow className='icon' />
                <Link to={{ pathname: '/detail', movie }}>
                  <Add className='icon' />
                </Link>
                <ThumbUpAltOutlined className='icon' />
                <ThumbDownOutlined className='icon' />
              </div>
              <div className='itemInfoTop'>
                <span>{movie.duration}</span>
                <span className='limit'>{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className='desc'>{movie.desc}</div>
              <div className='genre'>{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
