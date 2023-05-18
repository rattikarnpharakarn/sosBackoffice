
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



    const fetchData = async () => {
        try {
            const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
            const apiUrl = `http://localhost:81/SosApp/emergency/admin/${props.id}`;
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
                                <p className="text-xl font-bold">{data?.description}</p>
                                <p className="txet-lg ml-2 mb-2"><span><ArticleIcon className="mr-4" />{data?.subTypeName}</span></p>
                                <p className="txet-lg ml-2 mb-2"><span><LocalPhoneIcon className="mr-4" />{data?.phoneNumberCallBack}</span></p>
                                <p className="txet-lg ml-2 mb-2"><span><CalendarMonthIcon className="mr-4" />{moment(data?.date).format('MM/DD/YYYY')}</span></p>
                                <p className="txet-lg ml-2 mb-2"><span><span className="mr-4 font-bold">Status</span>{data?.status}</span></p>
                                {data?.image.map((img,i) => (
                                    <p className="txet-lg ml-2 mb-2" key={i}>   <img src={img.Image} /></p>
                                   
                                    ))
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