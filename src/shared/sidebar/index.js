import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AuthenProvider from '../../AuthProvider';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import HomeIcon from '@mui/icons-material/Home';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ChatIcon from '@mui/icons-material/Chat';
import Collapse from '@mui/material/Collapse';
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Grid';
import Login from '../../pages/login';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openCollapseSos, setopenCollapseSos] = useState(false);
  const login = localStorage.getItem('token')


  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }

  function handleOpenSOS() {
    setopenCollapseSos(!openCollapseSos);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}

      {login ?
        <>
          <AppBar position="fixed" open={open} >
            <Toolbar className='bg-black'>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" noWrap component="div">
                    SOS Backoffice
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" noWrap component="div" className='text-right'>
                    <Button className='text-xs mr-2' onClick={Logout}> Logout </Button> <LoginIcon />
                  </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} >
            <DrawerHeader className='bg-black'>
              <IconButton onClick={handleDrawerClose} >
                {theme.direction === 'rtl' ? <ChevronRightIcon className='text-white' /> : <ChevronLeftIcon className='text-white' />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >

                    {<a href='/'><HomeIcon /></a>}
                  </ListItemIcon>

                  <ListItemText primary='Home' sx={{ opacity: open ? 1 : 0 }} />

                </ListItemButton>
              </ListItem>

              <ListItem disablePadding sx={{ display: 'block' }} onClick={handleOpenSettings}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >

                    {<a href='/user'>
                      <SupervisedUserCircleIcon />
                    </a>}
                  </ListItemIcon>

                  <ListItemText primary='Users' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText inset>
                      {
                        <a href='/user'>
                          UserManagement
                        </a>
                      }
                    </ListItemText>
                  </ListItem>
                </List>
              </Collapse>
              <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText inset>
                      {
                        <a href='/role'>
                          RoleManagement
                        </a>
                      }
                    </ListItemText>
                  </ListItem>
                </List>
              </Collapse>
            </List>
            {/* <Divider /> */}
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >

                  {<a href='/hotline'>
                    <ContactEmergencyIcon />
                  </a>}
                </ListItemIcon>
                <ListItemText primary='Hotline' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={handleOpenSOS}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >

                  {<a href='/sos'>
                    <CrisisAlertIcon />
                  </a>}
                </ListItemIcon>

                <ListItemText primary='SOS' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <Collapse in={openCollapseSos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemIcon>

                  </ListItemIcon>
                  <ListItemText inset>
                    {
                      <a href='/type'>
                        Type Management
                      </a>
                    }
                  </ListItemText>
                </ListItem>
              </List>
            </Collapse>
            <Collapse in={openCollapseSos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemIcon>

                  </ListItemIcon>
                  <ListItemText inset>
                    {
                      <a href='/subtype'>
                        Subtype Management
                      </a>
                    }
                  </ListItemText>
                </ListItem>
              </List>
            </Collapse>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >

                  {<a href='/chat'>
                    <ChatIcon />
                  </a>}
                </ListItemIcon>

                <ListItemText primary='Chat' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <AuthenProvider />
          </Box>
        </>
        :
        <>
          <AppBar position="fixed" open={open} >
            <Toolbar className='bg-black'>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" noWrap component="div">
                    SOS Backoffice
                  </Typography>
                </Grid>
                <Grid item xs={6}>

                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Login />
          </Box>
        </>
      }
    </Box>
  );
}

export default Sidebar 