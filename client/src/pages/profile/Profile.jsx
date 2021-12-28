import React, { useContext } from 'react';
import { AuthContext } from '../../authContext/authContext';
import Navbar from '../../components/navbar/Navbar';
import './profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className='profileScreen'>
      <Navbar />
      <div className='profileScreen_body'>
        <h1>Profile</h1>
        <div className='profileScreen_info'>
          <img
            src={
              user.profilePic ||
              'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            }
            alt=''
          />
          <div className='profileScreen_detais'>
            <div className='profileScreen_detail'>
              <h2>Email : {user.email}</h2>
            </div>
            <div className='profileScreen_detail'>
              <h2>Username : {user.username}</h2>
            </div>
            <div className='profileScreen_detail'>
              <h2>Contact: +1 123 456 67</h2>
            </div>
            <div className='profileScreen_detail'>
              <h2>Date of birth: 23/10/2000</h2>
            </div>
            <div className='profileScreen_detail'>
              <h2>Adress: New York | USA</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
