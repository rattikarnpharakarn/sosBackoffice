
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
    Select,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Radio,
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

export default function DialogsSubtype(props) {
    console.log(props);
    const [open, setOpen] = useState(false);
    const [nameSubType, setNameType] = useState(props?.data?.row?.nameSubType);
    const [imageSubType, setImageType] = useState(props?.data?.row?.imageSubType);
    const [type, setType] = useState(props?.data?.row?.type?.id.toString());
    const [image, setImage] = useState();
    const [rows, setRows] = useState();

    const onType = (e) => {
        setType(e)
        console.log(e, 'in');
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onImageProfile = (event) => {
        if (event.target.files && event.target.files[0]) {
            //   setShowProfile(URL.createObjectURL(event.target.files[0]));

            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                //   console.log(reader.result);
                const result = reader.result.replace("data:image/jpeg;base64,", "");
                setImageType(result)
                console.log(result);

            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }

    }


    const onSubmit = () => {
        console.log(type);
        // let result = image.replace("data:image/jpeg;base64,", "");
        // setImageType(result)
        // console.log(imageType)
        const payload = {
            nameSubType: nameSubType ? nameSubType : nameSubType === '' ? '' : props?.data?.row?.nameSubType,
            imageSubType: imageSubType ? imageSubType : imageSubType === '' ? '' : props?.data?.row?.imageSubType,
            typeId: type ? type : type === '' ? '' : props?.data?.row?.type,


        }

        if (props?.data?.id) {
            try {
                const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
                const headers = { 'Authorization': AuthStr };
                const apiUrl = `http://localhost:81/SosApp/emergency/admin/subType/${props?.data?.id}`;
                const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
                // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
                axios.put(apiUrl, payload, { headers })
                    .then(response => {
                        // If request is good...
                        // console.log(response.data.data);
                        // window.location.reload();

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

        } else {
            try {
                const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
                const headers = { 'Authorization': AuthStr };
                const apiUrl = 'http://localhost:81/SosApp/emergency/admin/subType/';
                const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
                // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
                axios.post(apiUrl, payload, { headers })
                    .then(response => {
                        // If request is good...
                        // console.log(response.data.data);
                        // window.location.reload();

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
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
                const apiUrl = 'http://localhost:81/SosApp/emergency/type';
                const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
                // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
                const data = await axios.get(apiUrl, { headers: { Authorization: AuthStr } })
                    .then(response => {
                        // If request is good...
                        console.log(response.data.data);
                        setRows(response.data.data);

                        console.log(data);
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
    console.log(rows?.map((a) => a?.nameType));
    return (
        <div className='text-right mb-5'>
            {props?.data?.id ?

                <EditIcon onClick={handleOpen} className="h-20 mt-4" />

                :
                <Button variant="outlined" onClick={handleOpen}>
                    Add sub type
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
                                <Input label="Sub type name" value={nameSubType} onChange={(e) => setNameType(e.target.value)} />
                            </div>
                            <div className="flex space-x-4" >
                                <Input label="Image sub type" type="file" onChange={(e) => onImageProfile(e)} />
                            </div>
                            <div>
                                <img src={`data:image/jpeg;base64,${props?.data?.row?.imageSubType}`} />
                            </div>
                            <div>

                                <Select
                                    value={type}
                                    onChange={(e) => onType(e)}
                                >
                                    {
                                        rows?.map((item) => (
                                            <Option
                                                key={item.id}
                                                value={item.id}
                                            >
                                               {item.nameType}
                                            </Option>
                                        ))}

                                </Select>
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