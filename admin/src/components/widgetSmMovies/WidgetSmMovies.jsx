import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function WidgetSmMovies() {
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    const getNewMovies = async () => {
      try {
        const res = await axios.get('/movies?new=true', {
          headers: {
            token:
              'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
          },
        });
        setNewMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewMovies();
  }, []);
  return (
    <div className='widgetSm'>
      <span className='widgetSmTitle'>New Movies</span>
      <ul className='widgetSmList'>
        {newMovies.map((movie, i) => (
          <li key={i} className='widgetSmListItem'>
            <img
              src={
                movie.img || 'https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg'
              }
              alt=''
              className='widgetSmImg'
            />
            <div className='widgetSmUser'>
              <span className='widgetSmUsername'>{movie.title}</span>
            </div>
            <Link to={{ pathname: '/movie/' + movie._id, movie: movie }}>
              <button className='widgetSmButton'>
                <Visibility className='widgetSmIcon' />
                Display
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
