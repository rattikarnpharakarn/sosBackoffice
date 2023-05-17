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

  const Delete = React.useCallback(
    (id) => () => {
        try {
            const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
            const headers = { 'Authorization': AuthStr };
            const apiUrl = `http://localhost:82/SosApp/hotline/admin/${id}`;
            const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
            // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
            axios.delete(apiUrl, { headers })
                .then(response => {
                    // If request is good...
                    console.log(response.data.data);
                    window.location.reload();

                })
                .catch((error) => {
                    console.log('error ' + error);
                });
            // return data;
        } catch (error) {
            // throw new Error(error);
            console.error(error);
            return error.response;
        }
    },
    [],
);

  const toggleAdmin = React.useCallback(
    (id) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
        ),
      );
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
        <DialogsHotline data={params} />,,
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
      try {
        const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
        const apiUrl = 'http://localhost:82/SosApp/hotline/';
        const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
        // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
        axios.get(apiUrl, { headers: { Authorization: AuthStr } })
          .then(response => {
            // If request is good...
            console.log(response.data.data);
            setRows(response.data.data);
            console.log(rows);
          })
          .catch((error) => {
            console.log('error ' + error);
          });
        // return data;
      } catch (error) {
        // throw new Error(error);
        console.error(error);
        return error.response;
      }
    }

    fetchData();
  }, []);
console.log(rows);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <p className='text-xl'><span><ContactPhoneIcon className='mr-5 w-72' /></span>Hotline</p>
        </Grid>
        <Grid item xs={6}>
          <DialogsHotline />
        </Grid>
      </Grid>
      <div style={{ height: 400, width: 'auto' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
}

export default Hotline