import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from '@material-ui/icons';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { updateUser } from '../../context/userContext/apiCalls';
import { UserContext } from '../../context/userContext/UserContext';
import storage from '../../firebase';
import './user.css';

export default function User() {
  const location = useLocation();
  const { user } = location;
  const [userUpdate, setUserUpdate] = useState(user);
  const [userFetch, setUserFetch] = useState({});
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { userId } = useParams();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const getUser = async (id) => {
      try {
        console.log(1);
        const res = await axios.get('/users/find/' + id, {
          headers: {
            token:
              'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
          },
        });
        setUserFetch(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser(userId);
  }, [userId]);

  const history = useHistory();

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (err) => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUserUpdate((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleInput = (e) => {
    setUserUpdate((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUploaded = (e) => {
    e.preventDefault();
    upload([{ file: img, label: 'profilePic' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userUpdate, dispatch);
    setTimeout(() => {
      history.push('/users');
    }, 1000);
  };

  return (
    <div className='user'>
      <div className='userTitleContainer'>
        <h1 className='userTitle'>Edit User</h1>
        <Link to='/newUser'>
          <button className='userAddButton'>Create</button>
        </Link>
      </div>
      <div className='userContainer'>
        <div className='userShow'>
          <div className='userShowTop'>
            <img
              src={
                userFetch.profilePic ||
                'https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg'
              }
              alt=''
              className='userShowImg'
            />
            <div className='userShowTopTitle'>
              <span className='userShowUsername'>Anna Becker</span>
              <span className='userShowUserTitle'>Software Engineer</span>
            </div>
          </div>
          <div className='userShowBottom'>
            <span className='userShowTitle'>Account Details</span>
            <div className='userShowInfo'>
              <PermIdentity className='userShowIcon' />
              <span className='userShowInfoTitle'>annabeck99</span>
            </div>
            <div className='userShowInfo'>
              <CalendarToday className='userShowIcon' />
              <span className='userShowInfoTitle'>10.12.1999</span>
            </div>
            <span className='userShowTitle'>Contact Details</span>
            <div className='userShowInfo'>
              <PhoneAndroid className='userShowIcon' />
              <span className='userShowInfoTitle'>+1 123 456 67</span>
            </div>
            <div className='userShowInfo'>
              <MailOutline className='userShowIcon' />
              <span className='userShowInfoTitle'>annabeck99@gmail.com</span>
            </div>
            <div className='userShowInfo'>
              <LocationSearching className='userShowIcon' />
              <span className='userShowInfoTitle'>New York | USA</span>
            </div>
          </div>
        </div>
        <div className='userUpdate'>
          <span className='userUpdateTitle'>Edit</span>
          <form className='userUpdateForm'>
            <div className='userUpdateLeft'>
              <div className='userUpdateItem'>
                <label>Username</label>
                <input
                  type='text'
                  name='username'
                  placeholder={userFetch.username}
                  onChange={handleInput}
                  className='userUpdateInput'
                />
              </div>
              <div className='userUpdateItem'>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  placeholder={userFetch.email}
                  onChange={handleInput}
                  className='userUpdateInput'
                />
              </div>
              <div className='userUpdateItem'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  onChange={handleInput}
                  className='userUpdateInput'
                  placeholder='New password'
                />
              </div>
            </div>
            <div className='userUpdateRight'>
              <div className='userUpdateUpload'>
                <img
                  className='userUpdateImg'
                  src={
                    userFetch.profilePic ||
                    'https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg'
                  }
                  alt=''
                />
                <label htmlFor='file'>
                  <Publish className='userUpdateIcon' />
                </label>
                <input
                  type='file'
                  id='file'
                  onChange={(e) => setImg(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>

              {uploaded === 1 ? (
                <button className='userUpdateButton' onClick={handleSubmit}>
                  Create
                </button>
              ) : (
                <button className='userUpdateButton' onClick={handleUploaded}>
                  Upload
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
