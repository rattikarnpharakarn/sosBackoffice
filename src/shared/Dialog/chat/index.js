
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
import GroupIcon from '@mui/icons-material/Group';
import ThreePIcon from '@mui/icons-material/ThreeP';
import PersonIcon from '@mui/icons-material/Person';

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

export default function DialogsChat(props) {

    const [open, setOpen] = useState(false);
    const [number, setNumber] = useState(props?.data?.row?.number);
    const [description, setDescription] = useState(props?.data?.row?.description);
    const [rows, setRows] = useState();


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const AuthStr = 'Bearer '.concat(token);
                const apiUrl = `http://35.229.220.89:83/SosApp/messenger/admin/getMembersRoomChat/${Number(props?.data)}`;
                const res = await axios.get(apiUrl, { headers: { Authorization: AuthStr } })
            
                setRows(res.data.data)

            } catch (error) {
              
                return error.response;
            }
        }

        fetchData();
    }, []);

    return (
        <div className='text-right mb-5'>

            <GroupIcon onClick={handleOpen} className="h-20 mt-4" />

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <p className=""><span><ThreePIcon /></span>สมาชิก{rows?.roomName}</p>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        className="flex flex-col items-center justify-center w-full min-h-full bg-gray-100 text-gray-800 p-10"
                    >

                        <div class="flex w-full mt-2 space-x-3 max-w-xs">
                            <div>
                                {props?.data === rows?.roomChatID &&
                                    <div className="grid gap-6">
                                        <div className="grid gap-6">

                                            {rows?.memberRoomChat?.map((item) => (
                                                <>
                                                    <div className="flex " key={item.id}>

                                                        <div className="mr-5 ">
                                                            <PersonIcon />

                                                        </div>
                                                        <div class="">
                                                            <p className="text-xl">
                                                                {item.firstname}
                                                                {item.lastname}
                                                            </p>
                                                        </div>
                                                    </div>

                                                </>

                                            ))}

                                        </div>

                                    </div>

                                }


                            </div>
                        </div>


                    </Box>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}