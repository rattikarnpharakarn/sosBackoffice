import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import swal from '@sweetalert/with-react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


type UserSubmitForm = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorusername, setErrorU] = useState(false);
  const [errorpassword, setErrorP] = useState(false);




  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')

  });


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = async () => {

    const payload = {
      username: username,
      password: password
    }


    try {
      const apiUrl = 'http://35.229.220.89:80/SosApp/accounts/signIn';
      const res = await axios.post(apiUrl, payload)
      localStorage.setItem('token', res.data.token)
      console.log(res);
      navigate('/')
    } catch (error) {
      console.log(error, 'aaaa');

      swal(

        {
          title: 'Error',
          text: `${error?.response?.data?.message}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        }

      )
      return error.response;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <form >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                autoComplete="username"
                autoFocus
                sx={{ width: 400 }}
                {...register('username')}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                className={` shadow appearance-none border w-96 ${errors.username ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.username?.message}</div>

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                sx={{ width: 400 }}
                autoComplete="current-password"
                {...register('password')}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                className={` shadow appearance-none border w-96 ${errors.password ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.password?.message}</div>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit(onSubmit)}>
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
}