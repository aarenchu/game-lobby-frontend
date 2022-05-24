import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { PlayerContext } from '../context/PlayerContext';
import Error from '../Error';

const SignIn: React.FC = () => {
  const [errorPanel, setErrorPanel] = React.useState<string>('');
  const [user, loading, error] = useAuthState(auth);
  const [isErrorPanelOpen, toggleErrorPanel] = React.useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
  }, [user, loading, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      setErrorPanel('Email/Password required.');
      toggleErrorPanel(true);
      return;
    }

    if (error) {
      setErrorPanel(error.message);
      toggleErrorPanel(true);
      return;
    }

    try {
      toggleErrorPanel(false);
      logInWithEmailAndPassword(email, password);
    } catch (err) {
      setErrorPanel(err);
      toggleErrorPanel(true);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {isErrorPanelOpen && (
            <Error
              isOpen={isErrorPanelOpen}
              message={errorPanel}
              closeMsg={toggleErrorPanel}
            />
          )}
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            color='secondary'
            autoComplete='email'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            color='secondary'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link
                component={RouterLink}
                to='/signup'
                color='secondary'
                variant='body2'
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
