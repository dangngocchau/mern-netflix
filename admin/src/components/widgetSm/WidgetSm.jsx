import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get('/users?new=true', {
          headers: {
            token:
              'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, []);
  return (
    <div className='widgetSm'>
      <span className='widgetSmTitle'>New Join Members</span>
      <ul className='widgetSmList'>
        {newUsers.map((user, i) => (
          <li key={i} className='widgetSmListItem'>
            <img
              src={
                user.profilePic ||
                'https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg'
              }
              alt=''
              className='widgetSmImg'
            />
            <div className='widgetSmUser'>
              <span className='widgetSmUsername'>{user.username}</span>
            </div>
            <Link to={{ pathname: '/user/' + user._id, movie: user }}>
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
