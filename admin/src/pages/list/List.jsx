import { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { updateList } from '../../context/listContext/apiCalls';
import { ListContext } from '../../context/listContext/ListContext';
import './list.css';
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function List() {
  const location = useLocation();
  const list = location.list;
  const [listUpdate, setListUpdate] = useState({});
  const history = useHistory();
  console.log(list);

  const { dispatch } = useContext(ListContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setListUpdate({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDfault();
    updateList(listUpdate, dispatch);
    history.push('/lists');
  };

  console.log(listUpdate);
  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>List</h1>
        <Link to='/newlist'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <div className='productTop'>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <span className='productName'>{list.title}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Id:</span>
              <span className='productInfoValue'>{list._id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Genre:</span>
              <span className='productInfoValue'>
                {capitalizeFirstLetter(list.genre)}
              </span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Type:</span>
              <span className='productInfoValue'>{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>List Title</label>
            <input
              type='text'
              placeholder={list.title}
              name='title'
              onChange={handleChange}
            />
            <label>Type</label>
            <input
              type='text'
              placeholder={list.type}
              name='year'
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type='text'
              placeholder={list.genre}
              name='genre'
              onChange={handleChange}
            />
          </div>
          <div className='productFormRight'>
            <button className='productButton' onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
