import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
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
            const apiUrl = `http://localhost:83/SosApp/messenger/admin/deleteRoomChat/${id}`;
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

    { field: 'roomName', headerName: 'Name', width: 200 },

    {
      field: 'actions1',
      headerName: 'Member',
      type: 'actions',
      width: 80,
      getActions: (params) => [
    
        <DialogsChat data={params.id} />,
    
      ],

    },

    {
      field: 'actions2',
      headerName: 'Message',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <DialogsMessage data={params} />,
      ],
  
    },

    {
      field: 'actions3',
      headerName: 'Action',
      type: 'actions',
      width: 80,
      getActions: (params) => [
  
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
        const apiUrl = 'http://localhost:83/SosApp/messenger/admin/getChatList';
      
        // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
        await axios.get(apiUrl, { headers: { Authorization: AuthStr } })
          .then(response => {
            // If request is good...
      
            setRows(response.data.data);
     
            setLoading(false);

          })
          .catch((error) => {
         
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
        console.error(error);
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