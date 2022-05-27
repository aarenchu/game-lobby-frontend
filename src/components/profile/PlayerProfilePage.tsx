import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { PlayerColourContext } from '../../context/PlayerColourContext';

import ChangeColourDropdown from './ChangeColourDropdown';
import UploadPlayerPic from './UploadPlayerPic';

const PlayerProfilePage = () => {
  const { updateSelectedColours } = React.useContext(PlayerColourContext);

  useEffect(() => {
    const fetchColours = async () => {
      try {
        const response: Response = await fetch(
          // 'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/'
          'http://localhost:5001/game-lobby-training-db0fb/us-central1/players/'
        );
        const data = await response.json();
        const colours = data.reduce((result, player) => {
          if (player.colour && player.colour !== "''") {
            result.push(player.colour);
          }
          return result;
        }, []);
        updateSelectedColours(colours);
      } catch (err) {
        console.log(err);
      }
    };
    fetchColours();
  }, [updateSelectedColours]);

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
        <Typography component='h1' variant='h5'>
          Profile Settings
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction='column' alignItems='center' spacing={2}>
              <Typography component='h1' variant='subtitle1'>
                Player Profile Picture
              </Typography>
              <UploadPlayerPic />
              <ChangeColourDropdown />
              <Button
                component={RouterLink}
                to='/'
                color='secondary'
                variant='contained'
              >
                Go Home
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PlayerProfilePage;
