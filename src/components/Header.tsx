import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
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

          {/* {user === null && ( */}
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
          {/* )} */}

          {/* {user !== null && (
            <Button color='inherit' onClick={signOut}>
              {t('signout')}
            </Button>
          )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
