import axios from 'axios';
import { useContext, useEffect, useMemo, useState } from 'react';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetSmMovies from '../../components/widgetSmMovies/WidgetSmMovies';
import { getMovies } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { getUsers } from '../../context/userContext/apiCalls';
import { UserContext } from '../../context/userContext/UserContext';
import './home.css';

export default function Home() {
  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);
  const { users, dispatch: dispatchUser } = useContext(UserContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get('/users/stats', {
          headers: {
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWU3YTA1ZjJmOGRiZTMyMDY1OTY3ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODE2OTg3MSwiZXhwIjoxNjM4NjAxODcxfQ.Yeyd8l5eKgmUPk3Es0z2E2pNP14_2239O4Qh0IQPKv4',
          },
        });
        const statsList = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'New User': item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
    getUsers(dispatchUser);
    getMovies(dispatchMovie);
  }, [MONTHS, dispatchUser, dispatchMovie]);
  return (
    <div className='home'>
      <FeaturedInfo users={users} movies={movies} />
      <Chart data={userStats} title='User Analytics' grid dataKey='New User' />
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetSmMovies />
      </div>
    </div>
  );
}
