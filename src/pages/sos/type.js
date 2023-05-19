import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridToolbar, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';
import EditIcon from '@mui/icons-material/Edit';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Button from '@mui/material/Button';
import DialogsSos from '../../shared/Dialog/sos/index';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import moment from 'moment';
import SosIcon from '@mui/icons-material/Sos';
import Grid from '@mui/material/Grid';
import DialogsSubtype from '../../shared/Dialog/sos/subtype';
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
        id: 1, col1: 'เหตุด่วนเหตุร้าย', col2: 'สถานีตำรวจ', col3: 'อื่นๆ'
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

const Type = () => {
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
                        const apiUrl = `http://localhost:81/SosApp/emergency/admin/type/${id}`;
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

        { field: 'nameType', headerName: 'Type name', width: 300 },
        {
            field: 'imageType', headerName: 'Image type', width: 300,
            renderCell: (params) => {
              
                return (
                    <>
                        <img src={`data:image/jpeg;base64,${params.row.imageType}`} className='w-20 h-20 p-2' />
                    </>
                );
            }
        },

        {
            field: 'actions',
            headerName: 'Action',
            type: 'actions',
            getActions: (params) => [
                <DialogsSos data={params} />,
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
                const apiUrl = 'http://localhost:81/SosApp/emergency/type';

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
                                <p className='text-xl'><span><SosIcon className='mr-5' /></span></p>
                            </Grid>
                            <Grid item xs={6}>
                                <DialogsSos />
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
                            <p className='text-xl'><span><SosIcon className='mr-5' /></span>Type Management</p>
                        </Grid>
                        <Grid item xs={6}>
                            <DialogsSos />
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



export default Type