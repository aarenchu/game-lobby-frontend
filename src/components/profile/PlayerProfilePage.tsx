import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { PlayerColourContext } from '../context/PlayerColourContext';
import Error from '../Error';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const PlayerProfilePage = () => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [colour, setColour] = useState('');
  const [isErrorPanelOpen, toggleErrorPanel] = useState<boolean>(false);
  const { selectedColours, updateSelectedColours } =
    React.useContext(PlayerColourContext);

  const Input = styled('input')({
    display: 'none',
  });

  useEffect(() => {
    console.log(user);
    // GET colour of current user
    fetch(
      'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/3Ok4kvTnWmlHvOVY0wBn'
    )
      .then((response) => response.json())
      .then((data) => {
        setColour(data.colour);
      });
    // GET request using fetch inside useEffect React hook
    fetch(
      'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/'
    )
      .then((response) => response.json())
      .then((data) => {
        let colours = data.reduce(function (result, player) {
          if (player.colour !== "''") {
            result.push(player.colour);
          }
          return result;
        }, []);
        updateSelectedColours(colours);
      });
  }, [selectedColours, updateSelectedColours]);

  const changeColour = async (event) => {
    let newColour: string = event.target.value as string;
    if (newColour !== colour) {
      if (selectedColours.includes(newColour)) {
        setErr('Colour is taken. Please choose another one.');
        toggleErrorPanel(true);
      } else {
        // Close in case it's open
        toggleErrorPanel(false);
        setIsLoading(true);

        try {
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ colour: newColour }),
          };

          const response = await fetch(
            'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/3Ok4kvTnWmlHvOVY0wBn',
            requestOptions
          );

          // if (!response.ok) {
          //   throw new Error(`Error! status: ${response.status}`);
          // }

          await response.json();

          setColour(newColour);
        } catch (err) {
          setErr(err.message);
        } finally {
          setIsLoading(false);
        }
      }
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
        <Typography component='h1' variant='h5'>
          Profile Settings
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction='column' alignItems='center' spacing={2}>
              <Typography component='h1' variant='subtitle1'>
                Player Profile Picture
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
              {isErrorPanelOpen && (
                <Error
                  isOpen={isErrorPanelOpen}
                  message={err}
                  closeMsg={toggleErrorPanel}
                />
              )}
              <Typography component='h1' variant='subtitle1'>
                Player Colour
              </Typography>
              <FormControl sx={{ m: 2, width: '75%' }} size='small'>
                <InputLabel id='colour-select-label'>
                  Choose player colour
                </InputLabel>
                <Select
                  labelId='colour-select-label'
                  value={colour ? colour : ''}
                  color='secondary'
                  label='Choose player colour'
                  onChange={changeColour}
                >
                  <MenuItem value=''>None</MenuItem>
                  <MenuItem value='red'>red</MenuItem>
                  <MenuItem value='blue'>blue</MenuItem>
                  <MenuItem value='green'>green</MenuItem>
                  <MenuItem value='yellow'>yellow</MenuItem>
                  <MenuItem value='pink'>pink</MenuItem>
                  <MenuItem value='purple'>purple</MenuItem>
                  <MenuItem value='orange'>orange</MenuItem>
                  <MenuItem value='navy'>navy</MenuItem>
                  <MenuItem value='teal'>teal</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PlayerProfilePage;
