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
import ChatIcon from '@mui/icons-material/Chat';
import DialogsChat from '../../shared/Dialog/chat';
import DialogsMessage from '../../shared/Dialog/chat/message';
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
    roomChatID: 1, col1: 'Avartar', col2: 'World', col3: 'a@email.coms',
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

const Chat = () => {

  const [rows, setRows] = React.useState(initialRows);
  const [loading, setLoading] = useState(false);


  //   const Delete = React.useCallback(
  //     (id) => () => {
  //         try {
  //             const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
  //             const headers = { 'Authorization': AuthStr };
  //             const apiUrl = `http://localhost:82/SosApp/hotline/admin/${id}`;
  //             const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
  //             // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
  //             axios.delete(apiUrl, { headers })
  //                 .then(response => {
  //                     // If request is good...
  //                     console.log(response.data.data);
  //                     window.location.reload();

  //                 })
  //                 .catch((error) => {
  //                     console.log('error ' + error);
  //                 });
  //             // return data;
  //         } catch (error) {
  //             // throw new Error(error);
  //             console.error(error);
  //             return error.response;
  //         }
  //     },
  //     [],
  // );

  const a = (id) => {
    console.log(id)
  }



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

    { field: 'roomName', headerName: 'Name', width: 200 },
    // { field: 'roomName', headerName: 'First Name', width: 200 },
    // { field: 'lastName', headerName: 'Last Name', width: 200 },
    // { field: 'birthday', headerName: 'Birthday', width: 200, valueFormatter: ({ value }) => moment(value).format('MM/DD/YYYY') },
    // { field: 'gender', headerName: 'Gender', width: 120, valueFormatter: ({ value }) => value === 'F' ? 'Female' : 'Male' },
    // {
    //   field: 'idCard', headerName: 'Verify ID Card', width: 120, valueFormatter: ({ value }) => value?.verify === true ? 'Yes' : 'No',

    // },
    // { field: 'address', headerName: 'Address', width: 120, valueFormatter: ({ value }) => value?.address },

    {
      field: 'actions1',
      headerName: 'Member',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        // console.log(params)
        <DialogsChat data={params.id} />,
        // <GridActionsCellItem
        //   icon={<DeleteIcon />}
        //   label="Delete"
        //   onClick={a(params.id)}
        //   showInMenu
        // />,
        // <GridActionsCellItem
        //   icon={<ViewColumnIcon />}
        //   label="Detail"
        //   onClick={Detail(params.id)}
        //   showInMenu
        // />,
      ],
      // renderCell: (params) => {
      // return  <DialogUser props={params} />;

      // }
    },

    {
      field: 'actions2',
      headerName: 'Message',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <DialogsMessage data={params.id} />,

        // <GridActionsCellItem
        //   icon={<DeleteIcon />}
        //   label="Delete"
        //   onClick={Delete(params.id)}
        //   showInMenu
        // />,
        // <GridActionsCellItem
        //   icon={<ViewColumnIcon />}
        //   label="Detail"
        //   onClick={Detail(params.id)}
        //   showInMenu
        // />,
      ],
      // renderCell: (params) => {
      // return  <DialogUser props={params} />;

      // }
    },

  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
        const apiUrl = 'http://localhost:83/SosApp/messenger/admin/getChatList';
        const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
        // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
        await axios.get(apiUrl, { headers: { Authorization: AuthStr } })
          .then(response => {
            // If request is good...
            console.log(response.data.data);
            setRows(response.data.data);
            console.log(rows);
            setLoading(false);

          })
          .catch((error) => {
            console.log('error ' + error);
            setLoading(false);

          });
        // return data;
      } catch (error) {
        // throw new Error(error);
        console.error(error);
        return error.response;
      } finally {
        setLoading(false);

      }
    }

    fetchData();
  }, []);
  console.log(rows);
  return (
    <>

      {loading ?
        <>
          <Loading />
          <div className='opacity-20'>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <p className='text-xl  mb-5'><span><ChatIcon className='mr-5 w-72' /></span>Chat</p>
              </Grid>
              <Grid item xs={6}>
                {/* <DialogsHotline /> */}
              </Grid>
            </Grid>
            <div style={{ height: 400, width: 'auto' }}>
              <DataGrid rows={rows} columns={columns} getRowId={(row) => row.roomChatID} />
            </div>
          </div>
        </>
        :

        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <p className='text-xl  mb-5'><span><ChatIcon className='mr-5 w-72' /></span>Chat</p>
            </Grid>
            <Grid item xs={6}>
              {/* <DialogsHotline /> */}
            </Grid>
          </Grid>
          <div style={{ height: 400, width: 'auto' }}>
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row.roomChatID} />
          </div>
        </>

      }
    </>

  );
}

export default Chat