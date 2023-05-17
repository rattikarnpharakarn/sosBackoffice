import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';
import EditIcon from '@mui/icons-material/Edit';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Button from '@mui/material/Button';
import Dialogs from '../../shared/Dialog/user';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { GetAllUser } from '../../services/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DialogUser from '../../shared/Dialog/user';

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
    col4: '12345678901', col5: 'Image id', col6: 'Female', col7: true, col8: true, col9: true, col10: true,
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
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [rows, setRows] = useState(initialRows);

  const Delete = React.useCallback(
    (id) => () => {
      try {
        const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
        const headers = { 'Authorization': AuthStr };
        const apiUrl = `http://localhost:80/SosApp/accounts/admin/user/${id}`;
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

  const Detail = React.useCallback(
    (id) => () => {
      navigate(`/detail/${id} `)
    },
    [],

  )


  const Edit = (data) => {
    <DialogUser props={data} />
  }


  const columns = [

    { field: 'phoneNumber', headerName: 'Username', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'birthday', headerName: 'Birthday', width: 200, valueFormatter: ({ value }) => moment(value).format('MM/DD/YYYY') },
    { field: 'gender', headerName: 'Gender', width: 120, valueFormatter: ({ value }) => value === 'F' ? 'Female' : 'Male' },
    // { field: 'idCard', headerName: 'ID Card',   width: 120, valueFormatter: ({ value }) => value?.textIDCard } ,
    {
      field: 'idCard', headerName: 'Verify ID Card', width: 120, valueFormatter: ({ value }) => value?.verify === true ? 'Yes' : 'No',

    },
    { field: 'address', headerName: 'Address', width: 120, valueFormatter: ({ value }) => value?.address },

    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <DialogUser data={params} />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={Delete(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<ViewColumnIcon />}
          label="Detail"
          onClick={Detail(params.id)}
          showInMenu
        />,
      ],
      // renderCell: (params) => {
      // return  <DialogUser props={params} />;

      // }
    },

  ]


  useEffect(() => {
    const fetchData = async () => {
      try {
        const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
        const apiUrl = 'http://localhost:80/SosApp/accounts/admin/user';
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

  return (
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
  );
}

export default UserManagement