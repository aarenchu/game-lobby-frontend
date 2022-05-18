import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from './Header';
import Player from './Player';
// import { PlayerColourContext } from './context/PlayerColourContext';

const GameLobby = () => {
  return (
    // Want four players, for now
    <Container maxWidth='md'>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
          columns={{ xs: 3, sm: 6, md: 9 }}
          justifyContent='center'
          justifyItems='center'
        >
          <Grid item xs={2} sm={4} md={4}>
            <Player playerName='P1' />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Player playerName='P2' />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Player playerName='P3' />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Player playerName='P4' />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default GameLobby;
