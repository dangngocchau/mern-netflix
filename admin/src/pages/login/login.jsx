import React, { useContext, useState } from 'react';
import { login } from '../../context/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <div>
      <div className='login'>
        <form className='loginForm'>
          <input
            type='text'
            placeholder='email'
            className='loginInput'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            className='loginInput'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='loginButton'
            type='submit'
            onClick={handleLogin}
            disabled={isFetching}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
