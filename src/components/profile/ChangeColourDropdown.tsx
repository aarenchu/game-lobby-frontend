import React, { useEffect, useState } from 'react';
import Error from '../Error';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { PlayerColourContext } from '../../context/PlayerColourContext';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChangeColourDropdown = () => {
  const [user] = useAuthState(auth);
  const [isErrorPanelOpen, toggleErrorPanel] = useState<boolean>(false);
  const [err, setErr] = useState('');
  const [colour, setColour] = useState('');
  const { selectedColours } = React.useContext(PlayerColourContext);
  const changeColour = async (event) => {
    const newColour: string = event.target.value as string;
    if (user && user.uid && newColour !== colour) {
      if (selectedColours.includes(newColour)) {
        setErr('Colour is taken. Please choose another one.');
        toggleErrorPanel(true);
      } else {
        // Close in case it's open
        toggleErrorPanel(false);

        try {
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ colour: newColour }),
          };

          const response = await fetch(
            'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/' +
              user.uid,
            requestOptions
          );

          // if (!response.ok) {
          //   throw new Error(`Error! status: ${response.status}`);
          // }

          await response.json();

          setColour(newColour);
        } catch (err) {
          setErr(err.message);
        }
      }
    }
  };

  useEffect(() => {
    const getColour = async () => {
      // GET colour of current user
      if (user && user.uid) {
        try {
          const response = await fetch(
            'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/' +
              user.uid
          );
          const data = await response.json();
          setColour(data.colour);
        } catch (err) {}
      }
    };
    getColour();
  }, [setColour, user]);
  return (
    <>
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
        <InputLabel id='colour-select-label'>Choose player colour</InputLabel>
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
    </>
  );
};

export default ChangeColourDropdown;
