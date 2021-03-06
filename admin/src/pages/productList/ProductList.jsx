import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { deleteMovie, getMovies } from '../../context/movieContext/apiCalls';

export default function MovieList() {
  const { movies, dispatch } = useContext(MovieContext);

  console.log(movies);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    {
      field: 'movie',
      headerName: 'Movie',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='productListItem'>
            <img className='productListImg' src={params.row.img} alt='' />
            {params.row.title}
          </div>
        );
      },
    },
    { field: 'genre', headerName: 'Genre', width: 250 },
    { field: 'year', headerName: 'year', width: 150 },
    { field: 'limit', headerName: 'limit', width: 150 },
    { field: 'isSeries', headerName: 'isSeries', width: 100 },

    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: '/movie/' + params.row._id, movie: params.row }}
            >
              <button className='productListEdit'>Edit</button>
            </Link>
            <DeleteOutline
              className='productListDelete'
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='productList'>
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
