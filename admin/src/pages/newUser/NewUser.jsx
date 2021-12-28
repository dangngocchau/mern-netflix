import { useContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createUser } from '../../context/userContext/apiCalls';
import { UserContext } from '../../context/userContext/UserContext';
import storage from '../../firebase';
import './newUser.css';

export default function NewUser() {
  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const history = useHistory();

  const { dispatch } = useContext(UserContext);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
            setUser((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUploaded = (e) => {
    e.preventDefault();
    upload([{ file: img, label: 'profilePic' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user, dispatch);
    setTimeout(() => {
      history.push('/users');
    }, 1000);
  };

  console.log(user);

  return (
    <div className='newUser'>
      <h1 className='newUserTitle'>New User</h1>
      <form className='newUserForm'>
        <div className='newUserItem'>
          <label>Username</label>
          <input
            type='text'
            placeholder='Chau'
            name='username'
            onChange={handleInput}
          />
        </div>
        {/* <div className='newUserItem'>
          <label>Full Name</label>
          <input type='text' placeholder='John Smith' />
        </div> */}
        <div className='newUserItem'>
          <label>Email</label>
          <input
            type='email'
            placeholder='Chau@gmail.com'
            name='email'
            onChange={handleInput}
          />
        </div>
        <div className='newUserItem'>
          <label>Password</label>
          <input
            type='password'
            placeholder='password'
            name='password'
            onChange={handleInput}
          />
        </div>
        <div className='newUserItemVideo'>
          <label>Profile Picture</label>
          <input
            type='file'
            name='profilePic'
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        {/* <div className='newUserItem'>
          <label>Address</label>
          <input type='text' placeholder='New York | USA' />
        </div>
        <div className='newUserItem'>
          <label>Gender</label>
          <div className='newUserGender'>
            <input type='radio' name='gender' id='male' value='male' />
            <label for='male'>Male</label>
            <input type='radio' name='gender' id='female' value='female' />
            <label for='female'>Female</label>
            <input type='radio' name='gender' id='other' value='other' />
            <label for='other'>Other</label>
          </div>
        </div>
        <div className='newUserItem'>
          <label>Active</label>
          <select className='newUserSelect' name='active' id='active'>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>
        </div> */}
        {uploaded === 1 ? (
          <button className='newUserButton' onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className='newUserButton' onClick={handleUploaded}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
