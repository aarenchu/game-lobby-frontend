import React from 'react';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { PlayerColourContext } from './context/PlayerColourContext';

interface Props {
  playerName: string;
}

const Player: React.FC<Props> = ({ playerName }) => {
  const { selectedColours, updateSelectedColours } =
    React.useContext(PlayerColourContext);

  const changeColour = (currColour: String, newColour: String) => {
    console.log('inside change colour');
    console.log(selectedColours);
    let updatedColours: Array<String> = [...selectedColours];
    if (currColour !== '') {
      let index = selectedColours.indexOf(currColour);
      updatedColours.splice(index, 1);
      console.log('removed curr colour');
    }
    console.log(updatedColours);
    if (newColour !== '') {
      updatedColours.push(newColour);
      console.log('added new colour');
    }
    console.log(updatedColours);
    updateSelectedColours(updatedColours);
  };

  const [colour, setColour] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    let newColour: string = event.target.value as string;
    console.log(newColour);
    console.log(colour);
    if (newColour !== colour) {
      if (selectedColours.includes(newColour)) {
        // TODO: Use UI Error message
        console.error('ERR: colour is taken');
      } else {
        // Assumption: colour change should always add colour to selectedColours
        console.log('before the change');
        console.log(selectedColours);
        changeColour(colour, newColour);
        console.log('after the change');
        console.log(selectedColours);
        setColour(newColour);
      }
    }
  };

  return (
    <Box
      alignContent='center'
      alignItems='center'
      sx={{
        height: '100%',
        backgroundColor: colour !== '' ? colour : 'primary',
        border: 'black 1px solid',
      }}
    >
      <Typography align='center' variant='h4'>
        {playerName}
      </Typography>
      <FormControl sx={{ m: 2, width: '75%' }} size='small'>
        <InputLabel id='colour-select-label'>Choose player colour</InputLabel>

        <Select
          labelId='colour-select-label'
          value={colour}
          color='secondary'
          label='Choose player colour'
          onChange={handleChange}
        >
          <MenuItem value=''>None</MenuItem>
          <MenuItem value='red'>red</MenuItem>
          <MenuItem value='blue'>blue</MenuItem>
          <MenuItem value='green'>green</MenuItem>
          <MenuItem value='yellow'>yellow</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Player;
