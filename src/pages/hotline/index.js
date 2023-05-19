import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';
import EditIcon from '@mui/icons-material/Edit';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Button from '@mui/material/Button';
import DialogsHotline from '../../shared/Dialog/hotline/index';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Loading from '../../shared/Loading/index';

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
    id: 1, col1: 'เหตุด่วนเหตุร้าย', col2: '191'
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

const Hotline = () => {
  const [rows, setRows] = React.useState(initialRows);
  const [loading, setLoading] = useState(false);
  const Swal = require('sweetalert2')


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
            const apiUrl = `http://35.229.220.89:82/SosApp/hotline/admin/${id}`;
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

    { field: 'description', headerName: 'Name', width: 500 },
    { field: 'number', headerName: 'Phone number', width: 500 },
    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      getActions: (params) => [
        <DialogsHotline data={params} />, ,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={Delete(params.id)}
        />,
      ],
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem('token')
        const AuthStr = 'Bearer '.concat(token);
        const apiUrl = 'http://35.229.220.89:82/SosApp/hotline/';

        // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
        await axios.get(apiUrl, { headers: { Authorization: AuthStr } })
          .then(response => {
            // If request is good...
      
            setRows(response.data.data);
      
            setLoading(false);

          })
          .catch((error) => {
            console.log('error ' + error);
            setLoading(false);

          });
        // return data;
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
                <p className='text-xl'><span><ContactPhoneIcon className='mr-5 w-72' /></span>Hotline Management</p>
              </Grid>
              <Grid item xs={6}>
                <DialogsHotline />
              </Grid>
            </Grid>
            <div style={{ height: 400, width: 'auto' }}>
              <DataGrid rows={rows} columns={columns} />
            </div>
          </div>
        </>
        :
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <p className='text-xl'><span><ContactPhoneIcon className='mr-5 w-72' /></span>Hotline Management</p>
            </Grid>
            <Grid item xs={6}>
              <DialogsHotline />
            </Grid>
          </Grid>
          <div style={{ height: 400, width: 'auto' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </>
      }
    </>
  );
}

export default Hotline