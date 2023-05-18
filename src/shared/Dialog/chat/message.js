
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
    console.log(props.data);
    const [open, setOpen] = useState(false);
    const [number, setNumber] = useState(props.data?.row?.number);
    const [description, setDescription] = useState(props.data?.row?.description);
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
                const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
                const apiUrl = `http://localhost:83/SosApp/messenger/admin/chat/message/${Number(props.data)}`;
                const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
                // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
                const res = await axios.get(apiUrl, { headers: { Authorization: AuthStr } })
                console.log(res.data.data, 'a');
                setRows(res.data.data)
                // .then(response => {
                //     // If request is good...

                //     setRows(response);
                //     console.log(rows,'rows');
                //     console.log(props.data,'id');
                // })
                // .catch((error) => {
                //     console.log('error ' + error);
                // });
                // return data;
            } catch (error) {
                // throw new Error(error);
                console.error(error);
                return error.response;
            }
        }

        fetchData();
    }, []);

    rows?.map((a) => {
        console.log(a.roomChatID)
        console.log(props.data)
    })

    return (
        <div className='text-right mb-5'>

            <ForumIcon onClick={handleOpen} className="h-20 mt-4" />

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
                        {rows?.map((item) => (
                           
                            <>
                                {Number(props.data) === item.roomChatID ?
                                    <div className="grid gap-6" key={item.id}>
                                        <p className=""><span><ThreePIcon/></span>{item.roomName}</p>
                                        <p className="ml-2 mb-10"><span><PersonIcon/></span>user : <span><SpeakerNotesIcon/></span>{item.message}</p>
                                    
                                       
                                    </div>
                                    :
                                    null
                                }
                            </>
                        ))}

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}