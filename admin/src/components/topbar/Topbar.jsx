import React, { useContext } from 'react';
import { logout } from '../../context/authContext/AuthAction';
import { AuthContext } from '../../context/authContext/AuthContext';
import './topbar.css';

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <span className='logo'>Administrator</span>
        </div>
        <div className='topRight'>
          <div class='avatar'>
            <img
              src={
                user.profilePic ||
                'https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=612x612&w=0&h=8J3VgOZab_OiYoIuZfiMIvucFYB8vWYlKnSjKuKeYQM='
              }
              alt=''
              className='topAvatar'
            />
            <button onClick={handleLogout} className='botAvatar'>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
