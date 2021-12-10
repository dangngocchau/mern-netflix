import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from './authActions';

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
