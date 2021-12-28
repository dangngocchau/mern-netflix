import { PlayArrow } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

import './MovieDetail.scss';

const MovieDetail = () => {
  const location = useLocation();
  const movie = location.movie;
  return (
    <>
      <Navbar />
      <div className='movie-section'>
        <div className='section-left'>
          <div className='img-wrap'>
            <img src={movie.img} />
          </div>
        </div>
        <div className='section-right'>
          <div className='movie-title'>{movie.title}</div>
          <div className='movie-desc'>{movie.desc}</div>
          <div className='movie-year'> Year : {movie.year}</div>
          <div className='movie-genre'> Genre: {movie.genre}</div>
          <div className='movie-type'>
            {' '}
            Type: {movie.isSeries ? 'Series' : 'Movie'}
          </div>
          <div className='buttons'>
            <Link to={{ pathname: '/watch', movie }}>
              <button className='play'>
                <PlayArrow />
                <span>Play</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
