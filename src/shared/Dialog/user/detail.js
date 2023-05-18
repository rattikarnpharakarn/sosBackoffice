
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
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '@mui/material/Button';

import {
    // Button,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Radio,
    Select,
    Option
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ForumIcon from '@mui/icons-material/Forum';
import ThreePIcon from '@mui/icons-material/ThreeP';
import PersonIcon from '@mui/icons-material/Person';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import ArticleIcon from '@mui/icons-material/Article';
import SosIcon from '@mui/icons-material/Sos';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


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
    console.log(props);
    const [open, setOpen] = useState(false);
    const [nameType, setNameType] = useState(props.data?.row?.nameType);
    const [imageType, setImageType] = useState(props.data?.row?.imageType);
    const [data, setData] = useState();


    const handleOpen = () => {
        setOpen(true);
        fetchData()
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onImageProfile = (event) => {
        if (event.target.files && event.target.files[0]) {
            //   setShowProfile(URL.createObjectURL(event.target.files[0]));

            const type = event.target.files[0].type
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                //   console.log(reader.result);
                if (type === 'image/jpeg') {
                    const result = reader.result.replace("data:image/jpeg;base64,", "");
                    setImageType(result)
                    console.log(result);
                } else {
                    const result = reader.result.replace("data:image/png;base64,", "");
                    setImageType(result)
                    console.log(result);
                }



            };
        }

    }

    const handleVerify = async () => {
        try {
            const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
            const headers = { 'Authorization': AuthStr };
            const apiUrl = `http://localhost:80/SosApp/accounts/admin/user/verifyIDCard/${props?.id}`;
            const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
            // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
            await axios.put(apiUrl, '', { headers })
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
    }



    const fetchData = async () => {
        try {
            const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
            const apiUrl = `http://localhost:80/SosApp/accounts/admin/user/${props.id}`;
            const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
            // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
            axios.get(apiUrl, { headers: { Authorization: AuthStr } })
                .then(response => {
                    // If request is good...
                    console.log(response.data.data);
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

    console.log(data);
    const image = data?.imageProfile
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
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <p className="text-3xl text-center mb-12">Detail</p>
                            <Grid container spacing={2} className='mb-10'>
                                <Grid item xs={3}>
                                    <img src={`data:image/jpeg;base64,${image}`} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid container spacing={2} className='mb-10'>
                                        <Grid item xs={4}>
                                            <span className='mr-5'>ชื่อจริง: </span><span className='text-2xl'>{data?.firstName}</span>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <span className='mr-5'>นามสกุล: </span><span className='text-2xl'>{data?.lastName}</span>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <span className='mr-5'>วันเกิด: </span><span className='text-2xl'>{moment(data?.birthday).format('MM/DD/YYYY')}</span>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} >
                                        <Grid item xs={4}>
                                            <span className='mr-5'>เบอร์โทรศัพท์: </span><span className='text-2xl'>{data?.phoneNumber}</span>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <span className='mr-5'>เพศ: </span><span className='text-2xl'>{data?.gender === 'F' ? 'Female' : 'Male'}</span>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <span className='mr-5'>สถานะ: </span><span className='text-2xl'>{data?.userRole.name}</span>
                                        </Grid>
                                    </Grid>



                                </Grid>

                            </Grid>
                            <hr></hr>
                            <p className='mt-2 mb-10 text-center text-xl'>Verify ID Card</p>
                            <div className='w-3/6 m-auto'>
                                {data?.idCard?.verify === true ?
                                    <Grid container spacing={2} >
                                        <Grid item xs={6}>
                                            <img src={`data:image/jpeg;base64,${data?.idCard?.pathImage}`} />
                                            <div className='text-center mb-5'>
                                                <span className='mr-5'>รหัสบัตรประชาชน: </span> <span className='text-xl mb-5'>{data?.idCard?.textIDCard}</span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4.4}>
                                            <p className='mt-20 text-3xl text-[#16a34a]'>ยืนยันตัวตนสำเร็จ </p>
                                        </Grid>
                                        <Grid item xs={1} >
                                            <TaskAltIcon className='text-[#16a34a] mt-20 text-4xl ' sx={{ height: 50 }} />
                                        </Grid>
                                    </Grid>
                                    :
                                    <div >
                                        <div item xs={6}>
                                            <img src={`data:image/jpeg;base64,${data?.idCard?.pathImage}`} />
                                            <div className='text-center mb-5'>
                                                <span className='mr-5'>รหัสบัตรประชาชน: </span> <span className='text-xl mb-5'>{data?.idCard?.textIDCard}</span>
                                            </div>
                                        </div>
                                        <Grid container spacing={2} >
                                            <Grid item xs={6}>
                                                <Button variant="contained" color="success" onClick={handleVerify}>
                                                    Verify
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button variant="outlined" color="error">
                                                    Not verify
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </div>
                                }

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