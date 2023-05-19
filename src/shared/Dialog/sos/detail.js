
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

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';

import {
    Button,
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
import Grid from '@mui/material/Grid';


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

export default function DetailDialogs(props) {

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
            const type = event.target.files[0].type
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                //   console.log(reader.result);
                if (type === 'image/jpeg') {
                    const result = reader.result.replace("data:image/jpeg;base64,", "");
                    setImageType(result)
                    
                } else {
                    const result = reader.result.replace("data:image/png;base64,", "");
                    setImageType(result)
                   
                }



            };
        }

    }



    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const AuthStr = 'Bearer '.concat(token);
            const apiUrl = `http://localhost:81/SosApp/emergency/admin/${props.id}`;
            // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
            await axios.get(apiUrl, { headers: { Authorization: AuthStr } })
                .then(response => {
                    setData(response.data.data);
                })
                .catch((error) => {
                    console.log('error ' + error);
                });
        } catch (error) {
            console.error(error);
            return error.response;
        }
    }

 

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
                        <div className="grid gap-6">
                            <div className="grid gap-6" >
                                <p className="text-xl font-bold"><span className="mr-4">รายละเอียดการแจ้งเหตุ: </span>{data?.description}</p>
                                <p className="txet-lg ml-2 mb-2"><span><ArticleIcon className="mr-4" />{data?.subTypeName}</span></p>
                                <p className="txet-lg ml-2 mb-2"><span><LocalPhoneIcon className="mr-4" />{data?.phoneNumberCallBack}</span></p>
                                <p className="txet-lg ml-2 mb-2"><span><CalendarMonthIcon className="mr-4" />{moment(data?.date).format('MM/DD/YYYY')}</span></p>
                                <p className="txet-lg ml-2 mb-2"><span><span className="mr-4 font-bold">Status</span>{data?.status}</span></p>
                                <Grid container spacing={2}>
                                    {data?.image.map((img, i) => (
                                        <Grid item xs={4}>

                                            <img src={img.Image} />

                                        </Grid>
                                    ))
                                    }
                                </Grid>

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