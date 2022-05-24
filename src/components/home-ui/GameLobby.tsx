import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from '../Header';
import Player from './Player';
import { PlayerColourContext } from '../context/PlayerColourContext';

const GameLobby: React.FC = () => {
  const [players, setPlayers] = useState([]);
  const { updateSelectedColours } = React.useContext(PlayerColourContext);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(
      'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/'
    )
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
        let colours = data.reduce(function (result, player) {
          if (player.colour && player.colour !== "''") {
            result.push(player.colour);
          }
          return result;
        }, []);
        updateSelectedColours(colours);
      });
  }, [updateSelectedColours]);

  const menuItems = players.map((player) => {
    return (
      <Grid key={players.indexOf(player)} item xs={2} sm={4} md={4}>
        <Player playerId={player.uid ? player.uid : ''} />
      </Grid>
    );
  });
  return (
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
