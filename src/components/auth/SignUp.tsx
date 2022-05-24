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
import { useAuthState } from 'react-firebase-hooks/auth';
import Error from '../Error';
import { auth, registerWithEmailAndPassword } from '../../firebase';

const SignUp: React.FC = () => {
  const [errorPanel, setErrorPanel] = React.useState<string | null>(null);
  const [isErrorPanelOpen, toggleErrorPanel] = React.useState<boolean>(false);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const username = data.get('username');
    const password = data.get('password');

    if (!email || !username || !password) {
      setErrorPanel('Email/Username/Password required.');
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
      registerWithEmailAndPassword(username, email, password);
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
          Sign Up
        </Typography>
        <Box
          component='form'
          noValidate={true}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          {errorPanel && (
            <Error
              isOpen={isErrorPanelOpen}
              message={errorPanel}
              closeMsg={toggleErrorPanel}
            />
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                type='email'
                color='secondary'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                type='username'
                color='secondary'
                autoComplete='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                color='secondary'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link
                component={RouterLink}
                to='/signin'
                color='secondary'
                variant='body2'
              >
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
