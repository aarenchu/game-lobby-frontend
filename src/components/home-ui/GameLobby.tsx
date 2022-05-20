import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from '../Header';
import Player from './Player';

const GameLobby: React.FC = () => {
  const players = [
    { userName: 'P1' },
    { userName: 'P2' },
    { userName: 'P3' },
    { userName: 'P4' },
  ];

  const menuItems = players.map((player) => {
    return (
      <Grid key={players.indexOf(player)} item xs={2} sm={4} md={4}>
        <Player playerName={player.userName} />
      </Grid>
    );
  });
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
          {menuItems}
        </Grid>
      </Box>
    </Container>
  );
};

export default GameLobby;
