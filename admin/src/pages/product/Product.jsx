import { Publish } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { updateMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import storage from '../../firebase';
import './product.css';
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Product() {
  const history = useHistory();
  const location = useLocation();
  const movie = location.movie;
  const [movieUpdated, setMovieUpdated] = useState(movie);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);

  const { dispatch } = useContext(MovieContext);

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setMovieUpdated({ ...movie, title: title });
  //   console.log(movieUpdated);
  // };
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
            setMovieUpdated((prev) => {
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
    upload([
      { file: img, label: 'img' },
      { file: trailer, label: 'trailer' },
      { file: video, label: 'video' },
    ]);
    console.log(updateMovie);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movieUpdated, dispatch);
    history.push('/movies');
  };
  console.log(movieUpdated);
  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Movie</h1>
        <Link to='/newproduct'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <div className='productTop'>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={movie.img} alt='' className='productInfoImg' />
            <span className='productName'>{movie.title}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Id:</span>
              <span className='productInfoValue'>{movie._id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Genre:</span>
              <span className='productInfoValue'>
                {capitalizeFirstLetter(movie.genre)}
              </span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Year:</span>
              <span className='productInfoValue'>{movie.year}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Limit:</span>
              <span className='productInfoValue'>{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Movie Title</label>
            <input
              type='text'
              placeholder={movie.title}
              name='title'
              onChange={(e) =>
                setMovieUpdated((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
            />
            <label>Year</label>
            <input
              type='text'
              placeholder={movie.title}
              name='year'
              onChange={(e) =>
                setMovieUpdated((prev) => {
                  return { ...prev, year: e.target.value };
                })
              }
            />
            <label>Genre</label>
            <input
              type='text'
              placeholder={movie.genre}
              name='genre'
              onChange={(e) =>
                setMovieUpdated((prev) => {
                  return { ...prev, genre: e.target.value };
                })
              }
            />
            <label>Limit</label>
            <input
              type='text'
              placeholder={movie.limit}
              name='limit'
              onChange={(e) =>
                setMovieUpdated((prev) => {
                  return { ...prev, limit: e.target.value };
                })
              }
            />
            <label>Trailer</label>
            <input
              type='file'
              placeholder={movie.trailer}
              onChange={(e) => setTrailer(e.target.files[0])}
            />
            <label>Video</label>
            <input
              type='file'
              placeholder={movie.video}
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className='productFormRight'>
            <div className='productUpload'>
              <img src={movie.img} alt='' className='productUploadImg' />
              <label for='file'>
                <Publish />
              </label>
              <input
                type='file'
                id='file'
                style={{ display: 'none' }}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            {uploaded === 3 ? (
              <button className='productButton' onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button className='productButton' onClick={handleUploaded}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
