import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar className="flex">
        <Typography variant="h5">MERN Filtering</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
