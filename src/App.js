import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AuthenProvider from './AuthProvider';
import Sidebar from './shared/sidebar';
import Login from './pages/login';



const App = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <Sidebar />
    // <Login/>
  );
}

export default App 