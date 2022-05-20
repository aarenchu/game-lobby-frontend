import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Error from '../Error';

const SignUp: React.FC = () => {
  const [errorPanel, setErrorPanel] = React.useState<string | null>(null);
  const [isErrorPanelOpen, toggleErrorPanel] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const Input = styled('input')({
    display: 'none',
  });

  //   const [signUp] = useMutation(SIGN_UP, {
  //     onCompleted: () => {
  //       navigate('/signin');
  //     },
  //     onError: (error) => {
  //       setErrorPanel(error.message);
  //     },
  //   });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password) {
      setErrorPanel('Username/Password required.');
      toggleErrorPanel(true);
      return;
    }

    toggleErrorPanel(false);

    console.log('Clicked submit');
    // signUp({
    //   variables: {
    //     username: username,
    //     password,
    //   },
    // });
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
            <Grid item xs={12}>
              <Stack direction='column' alignItems='center' spacing={2}>
                <Typography component='h5' variant='subtitle1' align='center'>
                  Upload profile picture
                </Typography>
                {/* TODO: Change avatar when profile uploads */}
                <Avatar component='span' sx={{ width: 100, height: 100 }}>
                  <AccountCircleIcon sx={{ fontSize: 60 }} />
                </Avatar>
                <label htmlFor='contained-button-file'>
                  <Input
                    accept='image/*'
                    id='contained-button-file'
                    multiple
                    type='file'
                  />
                  <Button variant='contained' component='span'>
                    Upload
                  </Button>
                </label>
              </Stack>
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
