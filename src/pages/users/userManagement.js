import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';


import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DialogUser from '../../shared/Dialog/user/index';
import Loading from '../../shared/Loading/index';

import DialogDetail from '../../shared/Dialog/user/detail';

function RenderDate(props) {
  const { hasFocus, value } = props;
  const buttonElement = React.useRef(null);
  const rippleRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector('input');
      input?.focus();
    } else if (rippleRef.current) {
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop({});
    }
  }, [hasFocus]);

  return (
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
  );
}

const initialRows = [
  {
    id: 1, col1: 'Avartar', col2: 'World', col3: 'a@email.coms',
    col4: '12345678901', col5: 'Image id', col6: 'Female', col7: true,
  },
];

RenderDate.propTypes = {
  /**
   * If true, the cell is the active element.
   */
  hasFocus: PropTypes.bool.isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.instanceOf(Date),
};

const UserManagement = () => {
  const Swal = require('sweetalert2')
  const [rows, setRows] = useState(initialRows);
  const [loading, setLoading] = useState(false);

  const Delete = React.useCallback(
    (id) => () => {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem('token')
            const AuthStr = 'Bearer '.concat(token);
            const headers = { 'Authorization': AuthStr };
            const apiUrl = `http://35.229.220.89:80/SosApp/accounts/admin/user/${id}`;
            axios.delete(apiUrl, { headers })
              .then(response => {
                Swal.fire(
                  {
                    title: 'Deleted',
                    text: "Your file has been deleted.",
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                  }
                ).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                })
              })
              .catch((error) => {
                console.log('error ' + error);
              });
          } catch (error) {
            console.error(error);
            return error.response;
          }

        }
      })
    },
    [],
  );


 


  const columns = [

    { field: 'phoneNumber', headerName: 'Username', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'birthday', headerName: 'Birthday', width: 200, valueFormatter: ({ value }) => moment(value).format('MM/DD/YYYY') },
    { field: 'gender', headerName: 'Gender', width: 120, valueFormatter: ({ value }) => value === 'F' ? 'Female' : 'Male' },
 
    {
      field: 'idCard', headerName: 'Verify ID Card', width: 120, valueFormatter: ({ value }) => value?.verify === true ? 'Yes' : 'No',

    },
    { field: 'address', headerName: 'Address', width: 120, valueFormatter: ({ value }) => value?.address },

    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <DialogUser data={params} />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={Delete(params.id)}
          showInMenu
        />,
        <DialogDetail id={params.id} />
      ],
   
    },

  ]


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token')
        const AuthStr = 'Bearer '.concat(token);
        const apiUrl = 'http://35.229.220.89:80/SosApp/accounts/admin/user';

        await axios.get(apiUrl, { headers: { Authorization: AuthStr } })
          .then(response => {
           
         
            setRows(response.data.data);
           
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);

            console.log('error ' + error);
          });
    
      } catch (error) {
    
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Close'
        })
        return error.response;
      } finally {
        setLoading(false);

      }
    }

    fetchData();
  }, []);

  return (
    <>
      {loading ?
        <>
          <Loading />
          <div className='opacity-20'>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <p className='text-xl'><span><AccountCircleIcon className='mr-5' /></span>UserManagement</p>
              </Grid>
              <Grid item xs={6}>
                <DialogUser />
              </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} />
            </div>
          </div>
        </>
        :
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <p className='text-xl'><span><AccountCircleIcon className='mr-5' /></span>UserManagement</p>
            </Grid>
            <Grid item xs={6}>
              <DialogUser />
            </Grid>
          </Grid>

          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </>

      }

    </>
  );
}

export default UserManagement