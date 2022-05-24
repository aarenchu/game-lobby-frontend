import React from 'react';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { auth, logout } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box
      sx={{
        paddingBottom: 10,
      }}
    >
      <AppBar position='relative'>
        <Toolbar>
          <Typography align='center' variant='h2'>
            Game Lobby
          </Typography>
          <Typography component='div' sx={{ flexGrow: 1 }}></Typography>

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* TODO: Get avatar */}
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={'Profile'} component={<RouterLink to='/' />}>
                  <Typography textAlign='center'>Profile</Typography>
                </MenuItem>
                <MenuItem key={'Logout'} onClick={logout}>
                  <Typography textAlign='center'> Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Stack direction='row' alignItems='center' spacing={2}>
              <Button
                component={RouterLink}
                to='/signin'
                color='inherit'
                variant='contained'
              >
                Sign In
              </Button>
              <Button
                component={RouterLink}
                to='/signup'
                color='secondary'
                variant='contained'
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
