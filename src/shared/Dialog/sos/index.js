
import React, { useState } from "react";
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

export default function DialogsSos(props) {

    const [open, setOpen] = useState(false);
    const [nameType, setNameType] = useState(props.data?.row?.nameType);
    const [imageType, setImageType] = useState(props.data?.row?.imageType);
    const Swal = require('sweetalert2')



    const handleOpen = () => {
        setOpen(true);
       

    };
    const handleClose = () => {
        setOpen(false);
        if (!props.data) {
            setNameType('');
            setImageType('');
          }
    };

    const onImageType = (event) => {
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
                  
                } else {
                    const result = reader.result.replace("data:image/png;base64,", "");
                    setImageType(result)
                   
                }



            };
        }

    }


    const onSubmit = () => {
        const payload = {
            nameType: nameType ? nameType : nameType === '' ? '' : props.data?.row?.nameType,
            imageType: imageType ? imageType : imageType === '' ? '' : props.data?.row?.imageType,

        }

        if (props.data?.id) {
            try {
                const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
                const headers = { 'Authorization': AuthStr };
                const apiUrl = `http://35.229.220.89:81/SosApp/emergency/admin/type/${props.data?.id}`;
                const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
                // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
                axios.put(apiUrl, payload, { headers })
                    .then(response => {
                        // If request is good...
                        // console.log(response.data.data);
                        window.location.reload();

                    })
                    .catch((error) => {
                        console.log('error ' + error);
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
            }

        } else {
            try {
                const token = localStorage.getItem('token');
                const AuthStr = 'Bearer '.concat(token);
                const headers = { 'Authorization': AuthStr };
                const apiUrl = 'http://35.229.220.89:81/SosApp/emergency/admin/type/';
              
                axios.post(apiUrl, payload, { headers })
                    .then(response => {
                      
                        window.location.reload();

                    })
                    .catch((error) => {
                        console.log('error ' + error);
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
            }
        }
    }

    return (
        <div className='text-right mb-5'>
            {props?.data?.id ?

                <EditIcon onClick={handleOpen} className="h-20 mt-4" />

                :
                <Button variant="outlined" onClick={handleOpen}>
                    Add type
                </Button>
            }

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {/* {props.data?.id ? 'Update User' : 'Create User'} */}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="grid gap-6">
                            <div className="flex space-x-4">
                                <Input label="Type name" value={nameType} onChange={(e) => setNameType(e.target.value)} />
                            </div>
                            <div className="flex space-x-4" >
                                <Input label="Image type" type="file" onChange={(e) => onImageType(e)} />
                            </div>
                            <div>
                            {imageType &&
                                <div className="flex justify-center">
                                    <img src={`data:image/jpeg;base64,${imageType}`} className="w-28 h-28 " />
                                </div>
                            }
                            {
                                props.data?.id && (!imageType) && <div className="flex justify-center">
                                    <img src={`data:image/jpeg;base64,${props?.data?.row?.imageType}`} className="w-28 h-28 " />

                                </div>
                            }
                               
                            </div>
                        </div>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onSubmit}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}