import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  playerId: string;
}

const Player: React.FC<Props> = ({ playerId }) => {
  const [colour, setColour] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(
      'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/' +
        playerId
    )
      .then((response) => response.json())
      .then((data) => {
        setColour(data.colour);
        setUsername(data.username);
      });
  }, [playerId]);

  return (
    <Box
      alignContent='center'
      alignItems='center'
      sx={{
        height: '100%',
        backgroundColor: colour !== '' ? colour : 'primary',
        border: 'black 1px solid',
        padding: 2,
      }}
    >
      <Typography align='center' variant='h4'>
        {username}
      </Typography>
    </Box>
  );
};

export default Player;
