import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './app.scss';
import { AuthContext } from './authContext/authContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import MovieDetail from './pages/MovieDetails/MovieDetail';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          {user ? <Home /> : <Redirect to='/register' />}
        </Route>
        <Route path='/register' exact>
          {!user ? <Register /> : <Redirect to='/' />}
        </Route>
        <Route path='/login' exact>
          {!user ? <Login /> : <Redirect to='/' />}
        </Route>
        {user && (
          <>
            <Route path='/movies'>
              <Home type='movie' />
            </Route>
            <Route path='/series'>
              <Home type='series' />
            </Route>
            <Route path='/watch'>
              <Watch />
            </Route>
            <Route path='/detail'>
              <MovieDetail />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
