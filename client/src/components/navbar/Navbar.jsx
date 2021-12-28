import { ArrowDropDown, Search } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../authContext/authActions';
import { AuthContext } from '../../authContext/authContext';
import './navbar.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const user = localStorage.getItem('user');

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className='container'>
        <div className='left'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
            alt=''
          />
          <Link to='/' className='link'>
            <span>Homepage</span>
          </Link>
          <Link to='/series' className='link'>
            <span className='navbarmainLinks'>Series</span>
          </Link>
          <Link to='/movies' className='link'>
            <span className='navbarmainLinks'>Movies</span>
          </Link>
        </div>
        <div className='right'>
          <Search className='icon' />
          <img
            src={
              user.profilePic ||
              'https://www.pngitem.com/pimgs/m/421-4213053_default-avatar-icon-hd-png-download.png'
            }
            alt=''
            className='imgRight'
          />
          <div className='profile'>
            <ArrowDropDown className='icon' />
            <div className='options'>
              <Link to='/profile' className='link'>
                <span>Settings</span>
              </Link>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
