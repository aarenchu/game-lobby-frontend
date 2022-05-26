import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from '../Header';
import Player from './Player';
import { PlayerColourContext } from '../../context/PlayerColourContext';

const GameLobby: React.FC = () => {
  const [players, setPlayers] = useState([]);
  const { updateSelectedColours } = React.useContext(PlayerColourContext);

  useEffect(() => {
    const fetchColours = async () => {
      try {
        const response: Response = await fetch(
          'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/'
        );
        const data = await response.json();
        setPlayers(data);
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
