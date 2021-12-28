import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../../context/userContext/apiCalls';
import { UserContext } from '../../context/userContext/UserContext';
import './userList.css';

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'username',
      headerName: 'User',
      width: 300,
      renderCell: (params) => {
        return (
          <div className='userListUser'>
            <img
              className='userListImg'
              src={
                params.row.profilePic ||
                'https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg'
              }
              alt=''
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 300 },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: '/user/' + params.row._id, user: params.row }}
            >
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutline
              className='userListDelete'
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='userList'>
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
