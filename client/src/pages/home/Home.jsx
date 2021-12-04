import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import './home.scss';
import List from '../../components/list/List';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? '?type=' + type : ''}${
            genre ? '&genre=' + genre : ''
          }`,
          {
            headers: {
              token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWU3YTA1ZjJmOGRiZTMyMDY1OTY3ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODExNDMzMiwiZXhwIjoxNjM4NTQ2MzMyfQ.EMQ4SrfGK4DbkZm19PEIZKJY9oFakGcW3234UvVBk7w',
            },
          }
        );
        console.log(res.data);
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [genre, type]);

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} />
      {lists.map((list, i) => (
        <List list={list} key={i} />
      ))}
    </div>
  );
};

export default Home;
