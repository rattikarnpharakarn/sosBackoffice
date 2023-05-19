
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
  Input,
  Radio,
  Select,
  Option
} from "@material-tailwind/react";
import profile from '../../../assets/images/profile.png';

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

const DialogUser = (props) => {
  const Swal = require('sweetalert2')
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(props.data?.row?.phoneNumber);
  const [email, setEmail] = useState(props.data?.row?.email);
  const [fname, setFname] = useState(props.data?.row?.firstName);
  const [lname, setLname] = useState(props.data?.row?.lastName);
  const [password, setPassword] = useState();
  const [cfpassword, setCfPassword] = useState();
  const [birthday, setBirthday] = useState(moment(props.data?.row?.birthday).format('YYYY-MM-DD'));
  const [gender, setGender] = useState(props.data?.row?.gender);
  const [role, setRole] = useState(props.data?.row?.userRole?.id.toString());
  const [idcard, setIdcard] = useState(props.data?.row?.idCard?.textIDCard);
  const [imgCard, setImgCard] = useState();
  const [address, setAddress] = useState(props.data?.row?.address?.address);
  const [subdistrict, setSubdistrict] = useState(props.data?.row?.address?.subDistrict);
  const [district, setDistrict] = useState(props.data?.row?.address?.district);
  const [province, setProvince] = useState(props.data?.row?.address?.province);
  const [postalcode, setPostalCode] = useState(props.data?.row?.address?.postalCode);
  const [country, setCountry] = useState(props.data?.row?.address?.country);
  const [workplace, setWorkplack] = useState(props.data?.row?.workplace);
  const [imgprofile, setImgProfile] = useState(props.data?.row?.imgprofile);
  const [isprofile, setShowProfile] = useState();


  const handleOpen = () => setOpen(!open);
  const handleClose = () => {
    setUsername('')
    setEmail('')
    setAddress('')
    setBirthday('')
    setCfPassword('')
    setPassword('')
    setCountry('')
    setUsername('')
    setDistrict('')
    setFname('')
    setGender('')
    setLname('')
    setIdcard('')
    setImgCard('')
    setImgProfile('')
    setSubdistrict('')
    setProvince('')
    setPostalCode('')
    setCountry('')
    setShowProfile('')
    setRole('')


    setOpen(!open);
  }
  const options = [
    { value: "1", label: "Admin" },
    { value: "2", label: "User" },
    { value: "3", label: "Operator" },

  ];

  const onImageProfile = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShowProfile(URL.createObjectURL(event.target.files[0]));

      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const type = event.target.files[0].type

      reader.onload = function () {
        //   console.log(reader.result);
        if (type === 'image/jpeg') {
          const result = reader.result.replace("data:image/jpeg;base64,", "");
          setImgProfile(result)
         
        } else {
          const result = reader.result.replace("data:image/png;base64,", "");
          setImgProfile(result)
       
        }



      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }

  }


  const onImageCard = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const type = event.target.files[0].type

      if (type === 'image/jpeg') {
        const result = reader.result.replace("data:image/jpeg;base64,", "");
        setImgCard(result)
      
      } else {
        const result = reader.result.replace("data:image/png;base64,", "");
        setImgCard(result)
      
      }

      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }

  }

  const onRole = (e) => {

    setRole(e)
  
  }
  const onGender = (e) => {

    setGender(e)
   
  }


  const onSubmit = async () => {
    const payload = {
      phoneNumber: username ? username : username === '' ? '' : props.data?.row?.phoneNumber,
      password: password,
      confirmPassword: cfpassword,
      firstName: fname ? fname : fname === '' ? '' : props.data?.row?.firstName,
      lastName: lname ? lname : lname === '' ? '' : props.data?.row?.lastName,
      email: email ? email : email === '' ? '' : props.data?.row?.email,
      birthday: birthday ? birthday : birthday === '' ? '' : moment(props.data?.row?.birthday).format('YYYY-MM-DD'),
      gender: gender ? gender : gender === '' ? '' : props.data?.row?.gender,
      imageProfile: imgprofile ? imgprofile : imgprofile === '' ? '' : props.data?.row?.imageProfile,
      workplace: workplace ? workplace : workplace === '' ? '' : props.data?.row?.workplace,
      role: Number(role) ? Number(role) : Number(role) === '' ? '' : props.data?.row?.id.toString(),
      idCard: {
        textIDCard: idcard ? idcard : idcard === '' ? '' : props.data?.row?.textIDCard,
        pathImage: imgCard ? imgCard : imgCard === '' ? '' : props.data?.row?.pathImage
      },
      address: {
        address: address ? address : address === '' ? '' : props.data?.row?.address,
        subDistrict: subdistrict ? subdistrict : subdistrict === '' ? '' : props.data?.row?.subDistrict,
        district: district ? district : district === '' ? '' : props.data?.row?.district,
        province: province ? province : province === '' ? '' : props.data?.row?.province,
        postalCode: postalcode ? postalcode : postalcode === '' ? '' : props.data?.row?.postalCode,
        country: country ? country : country === '' ? '' : props.data?.row?.country
      },
      verify: {
        otp: "0000",
        verifyCode: "0000"
      }
    }
    if (props.data?.id) {
      try {
        const token = localStorage.getItem('token');
        const AuthStr = 'Bearer '.concat(token);
        const headers = { 'Authorization': AuthStr };
        const apiUrl = `http://localhost:80/SosApp/accounts/admin/user/${props.data?.id}`;

        // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
        await axios.put(apiUrl, payload, { headers })
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
        const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg');
        const headers = { 'Authorization': AuthStr };
        const apiUrl = 'http://localhost:80/SosApp/accounts/admin/user';
        const config = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg2Mzg5MDc0fQ.eEkGAKDc2HbUDWrngr4y19LYkyOnfLc10Ihhbh_KTzg';
        // const { data } = await axios.get(apiUrl, { 'headers': { 'Authorization': AuthStr } });
        await axios.post(apiUrl, payload, { headers })
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
      {props.data?.id ?

        <EditIcon onClick={handleOpen} className="h-20 mt-4" />

        :
        <Button variant="outlined" onClick={handleOpen}>
          Add user
        </Button>
      }

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.data?.id ? 'Update User' : 'Create User'}
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
              <div className='flex justify-center'>
                {props.data?.id || isprofile ?
                  <img className='w-28 h-28 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500'
                    src={isprofile} alt="profile photo" />
                  :
                  <img className='w-28 h-28 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500'
                    src={profile} alt="profile photo" />
                }

              </div>
              <div className='flex justify-center'>
                <label className="block">
                  <span className="sr-only">Choose File</span>
                  <input type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm 
                    file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={onImageProfile} />
                </label>
              </div>
              <div className="flex space-x-4">
                <Input label="First Name" value={fname} onChange={(e) => setFname(e.target.value)} />
                <Input label="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
              </div>
              {props.data?.id ?
                <div className="flex space-x-4">
                  <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                :
                <div className="flex space-x-4">
                  <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

              }

              {!props.data?.id &&
                <div className="flex space-x-4">
                  <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <Input label="ConfirmPassword" value={cfpassword} onChange={(e) => setCfPassword(e.target.value)} />
                </div>
              }
              <div className="flex space-x-4">
                <Input label="ID Card" value={idcard} type="number" onChange={(e) => setIdcard(e.target.value)} />
                <Input label="ID Card image" type="file" onChange={onImageCard} />
              </div>
              <div className="flex space-x-4">
                <Input label="Birth day" value={birthday} type="date" onChange={(e) => setBirthday(e.target.value)} />
                <span className="p-3">Gender</span>
                <Radio id="html" name="type" value="M" label="Male" checked={gender === 'M'} onChange={(e) => onGender(e.target.value)} />
                <Radio id="react" name="type" value="F" label="Female" checked={gender === 'F'} onChange={(e) => onGender(e.target.value)} />
              </div>
              <div className="flex space-x-4">
                <Input label="Work place" value={workplace} type="text" onChange={(e) => setWorkplack(e.target.value)} />
              </div>
              <div className="flex space-x-4">
                <Input label="Address" value={address} type="text" onChange={(e) => setAddress(e.target.value)} />
                <Input label="Sub district" value={subdistrict} type="text" onChange={(e) => setSubdistrict(e.target.value)} />
              </div>
              <div className="flex space-x-4">
                <Input label="District" value={district} type="text" onChange={(e) => setDistrict(e.target.value)} />
                <Input label="Province" value={province} type="text" onChange={(e) => setProvince(e.target.value)} />
              </div>
              <div className="flex space-x-4">
                <Input label="Postalcode" value={postalcode} type="number" onChange={(e) => setPostalCode(e.target.value)} />
                <Input label="Country" value={country} type="text" onChange={(e) => setCountry(e.target.value)} />
              </div>
              <div>
                <label>Role</label>
                <Select value={role}
                  onChange={(e) => onRole(e)}>
                  <Option value="1">
                    admin
                  </Option>
                  <Option value="2">
                    user
                  </Option>
                  <Option value="3">
                    operator
                  </Option>

                </Select>
                {/* <Select
                  value={role}
                  onChange={(e) => onRole(e)}
                >
                  {options?.map((name, i) => (
                    <>
                      <Option
                        key={i}
                        value={name.value}
                      >
                        {name.label}
                      </Option>
                    </>

                  ))}

                </Select> */}
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

export default DialogUser