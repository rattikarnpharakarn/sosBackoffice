
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
import ForumIcon from '@mui/icons-material/Forum';
import ThreePIcon from '@mui/icons-material/ThreeP';
import PersonIcon from '@mui/icons-material/Person';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';


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

export default function DialogsMessage(props) {

    const [open, setOpen] = useState(false);
    const [number, setNumber] = useState(props.data?.row?.number);
    const [description, setDescription] = useState(props.data?.row?.description);
    const [rows, setRows] = useState();
    const [name, setName] = useState();



    const handleOpen = () => {
        setOpen(true);
        setName('')
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const AuthStr = 'Bearer '.concat(token);
                const apiUrl = `http://localhost:83/SosApp/messenger/admin/chat/message/${Number(props.data?.row?.roomChatID)}`;
                const res = await axios.get(apiUrl, { headers: { Authorization: AuthStr } })

                setRows(res.data.data)
                res.data?.dat?.map((a) => {
                    setName(a?.roomName)
                })
            } catch (error) {
                return error.response;
            }
        }

        fetchData();
    }, []);



    return (
        <div className='text-right mb-5'>

            <ForumIcon onClick={handleOpen} className="h-20 mt-4" />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <p className=""><span><ThreePIcon /></span>สมาชิก{props.data?.row?.roomName}</p>

                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 500 },
                        }}
                        noValidate
                        autoComplete="off"
                        className="flex flex-col items-center justify-center w-full min-h-full bg-gray-100 text-gray-800 p-10"
                    >

                        <div class="flex w-full mt-2 space-x-3 max-w-xs">
                            {/* <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div> */}
                            <div>
                                {rows?.map((item) => (

                                    <>
                                        {Number(props.data?.row?.roomChatID) === item.roomChatID ?

                                            <>
                                                <p>user: {item.senderUsername}</p>
                                                <div className="flex " key={item.id}>

                                                    <div className="mr-5 ">
                                                        <PersonIcon />

                                                    </div>
                                                    <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg mb-5">
                                                        <p className="">
                                                            {item.message}
                                                        </p>
                                                    </div>

                                                </div>

                                            </>

                                            : null



                                        }
                                    </>
                                ))}


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