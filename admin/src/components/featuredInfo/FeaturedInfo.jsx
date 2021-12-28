import { ArrowDownward } from '@material-ui/icons';
import './featuredInfo.css';

export default function FeaturedInfo({ users, movies }) {
  return (
    <div className='featured'>
      <div className='featuredItem'>
        <span className='featuredTitle'>Users</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>{users.length} users</span>
        </div>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Movies</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>{movies.length} movies</span>
        </div>
      </div>
    </div>
  );
}
