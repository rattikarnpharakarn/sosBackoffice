
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '@mui/material/Button';



import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}



BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DialogDetail(props) {

    const [open, setOpen] = useState(false);
    const [nameType, setNameType] = useState(props.data?.row?.nameType);
    const [imageType, setImageType] = useState(props.data?.row?.imageType);
    const [data, setData] = useState();
    const [detail, setDetail] = useState(false);
    const [description, setDescription] = useState();




    const handleOpen = () => {
        setOpen(true);
        fetchData()
    };
    const handleClose = () => {
        if (!props.data) {
            setNameType('');
        setImageType('');
        setDetail(false);
        setDescription('');
          }
       

        setOpen(false);
    };




    const handleVerify = async (verify) => {
        try {
            const payload = {
                description: description ? description : '',
                verify: verify
            }
            const token = localStorage.getItem('token');
            const AuthStr = 'Bearer '.concat(token);
            const headers = { 'Authorization': AuthStr };
            const apiUrl = `http://35.229.220.89:80/SosApp/accounts/admin/user/verifyIDCard/${props?.id}`;
            await axios.put(apiUrl, payload, { headers })
                .then(response => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log('error ' + error);
                });

        } catch (error) {

            console.error(error);
            return error.response;
        }
    }



    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token')
            const AuthStr = 'Bearer '.concat(token);
            const apiUrl = `http://35.229.220.89:80/SosApp/accounts/admin/user/${props.id}`;
            const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';

            axios.get(apiUrl, { headers: { Authorization: AuthStr } })
                .then(response => {

                    setData(response.data.data);

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


    // const image = data?.imageProfile
    const image = data?.imageProfile.replace("data:image/png;base64,", "");
    const image2 = data?.idCard?.pathImage.replace("data:image/png;base64,", "");


    return (
        <div className='text-right mb-5'>

            <RemoveRedEyeIcon onClick={handleOpen} className="h-20 mt-4" />

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {/* {props.data?.id ? 'Update User' : 'Create User'} */}
                </BootstrapDialogTitle>
                <DialogContent dividers className="w-58">
                    <Box
                        component="form"
                        sx={{
                            width: 500
                        }}
                        noValidate
                        autoComplete="off"
                    >


                        <div class='w-full rounded-lg overflow-hidden mx-auto'>
                            <div
                                class="min-w-sm border border-gray-100 bg-purple-100   transition-shadow shadow-xl hover:shadow-xl min-w-max">
                                <div class="flex items-center p-4">
                                    <div class="relative flex flex-col items-center w-full">
                                        <div
                                            class="h-24 w-24 md rounded-full relative avatar flex items-end justify-end text-purple-600 min-w-max absolute top-0 flex bg-purple-200 text-purple-100 row-start-1 row-end-3 text-purple-650 ring-1 ring-white">

                                            <img class="h-28 w-28 md rounded-full relative" src={`data:image/jpeg;base64,${image}`} alt="" />

                                            <div class="absolute"></div>
                                        </div>

                                        <div class="flex flex-col space-y-1 justify-center items-center -mt-12 w-full">
                                            <span class="text-md whitespace-nowrap text-gray-800 font-semibold  mb-20"></span><span class="text-md whitespace-nowrap text-gray-600 mb-10"></span>

                                            <div class="py-2 flex space-x-2">
                                                <div class="flex justify-center  max-h-max whitespace-nowrap focus:outline-none">
                                                    <span className='mr-2 text-lg'>ชื่อจริง: </span>
                                                    <span class="mr-2 text-xl font-bold"> {data?.firstName} </span>

                                                </div>
                                                <div class="flex justify-center  max-h-max whitespace-nowrap focus:outline-none">
                                                    <span className='mr-2 text-lg'>นามสกุล: </span>
                                                    <span className='mr-2 text-xl font-bold'>{data?.lastName}</span>
                                                </div>

                                            </div>
                                            <div class="py-2 flex space-x-2">
                                                <div class="flex justify-center  max-h-max whitespace-nowrap focus:outline-none">
                                                    <span className='mr-2 text-lg'>ชื่อผู้ใช้: </span>
                                                    <span class="mr-2 text-xl font-bold"> {data?.phoneNumber} </span>

                                                </div>
                                                <div class="flex justify-center  max-h-max whitespace-nowrap focus:outline-none">
                                                    <span className='mr-2 text-lg'>เพศ: </span>
                                                    <span className='mr-2 text-xl font-bold'>{data?.gender === 'F' ? 'Female' : 'Male'}</span>
                                                </div>

                                            </div>
                                            <div class="py-2 flex space-x-2">
                                                <div class="flex justify-center  max-h-max whitespace-nowrap focus:outline-none">
                                                    <span className='mr-2 text-lg'>สถานะ: </span>
                                                    <span class="mr-2 text-xl font-bold"> {data?.userRole.name} </span>

                                                </div>
                                                <div class="flex justify-center  max-h-max whitespace-nowrap focus:outline-none">
                                                    <span className='mr-2 text-lg'>วันเกิด: </span>
                                                    <span className='mr-2 text-xl font-bold'>{moment(data?.birthday).format('MM/DD/YYYY')}</span>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-full lg:w-9/12 px-4">
                                        {data?.idCard?.verify === true ?
                                            <>
                                                <div item xs={6}>
                                                    <img src={`data:image/jpeg;base64,${image2}`} />
                                                
                                                    <div className='text-center mb-5'>
                                                        <span className='mr-5'>รหัสบัตรประชาชน: </span> <span className='text-xl mb-5'>{data?.idCard?.textIDCard}</span>
                                                    </div>
                                                </div>
                                                <Grid container spacing={2} >
                                                    <Grid item xs={10}>
                                                        <p className='mt-5 text-3xl text-[#16a34a]'>ยืนยันตัวตนสำเร็จ </p>
                                                    </Grid>
                                                    <Grid item xs={1} >
                                                        <TaskAltIcon className='text-[#16a34a] mt-5 text-4xl ' sx={{ height: 50 }} />
                                                    </Grid>
                                                </Grid>
                                            </>

                                            :
                                            <div >
                                                <div item xs={6}>
                                                    <img src={`data:image/jpeg;base64,${data?.idCard?.pathImage}`} />

                                                    <div className='text-center mb-5'>
                                                        <span className='mr-5'>รหัสบัตรประชาชน: </span> <span className='text-xl mb-5'>{data?.idCard?.textIDCard}</span>
                                                    </div>
                                                </div>
                                                {!detail && (data?.idCard?.description === '') ?
                                                    <>
                                                        <Grid container spacing={2} className="mb-8">
                                                            <Grid item xs={6}>

                                                                <Button variant="contained" color="success" onClick={() => handleVerify(true)}>
                                                                    Verify
                                                                </Button>
                                                            </Grid>
                                                            <Grid item xs={6} >
                                                                <Button variant="outlined" color="error" onClick={() => setDetail(true)}>
                                                                    Not verify
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                    :
                                                    <div className="mt-2">
                                                        <p className='mt-5 text-3xl text-[#dc2626] text-center'>ยืนยันตัวตนไม่สำเร็จ </p>
                                                        <p className='mt-5 text-xl text-[#dc2626] text-center'>{data?.idCard?.description} </p>

                                                    </div>

                                                }

                                                {detail && (data?.idCard?.description === '') &&
                                                    <>
                                                        <TextField
                                                            id="outlined-multiline-static"
                                                            label="Multiline"
                                                            multiline
                                                            rows={5}
                                                            variant="outlined"
                                                            onChange={(e) => setDescription(e.target.value)}

                                                        />
                                                        <div className="mt-2">
                                                            <Button variant="outlined" color="error" onClick={() => handleVerify(false)}>
                                                                Submit
                                                            </Button>
                                                        </div>

                                                    </>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>


                    </Box>
                </DialogContent>
                <DialogActions>
                    {/* <Button autoFocus>
                        Save changes
                    </Button> */}
                </DialogActions>
            </BootstrapDialog>
        </div>

    );
}