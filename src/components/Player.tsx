import React from 'react';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { PlayerColourContext } from './context/PlayerColourContext';
import Error from './Error';
interface Props {
  playerName: string;
}

const Player: React.FC<Props> = ({ playerName }) => {
  const { selectedColours, updateSelectedColours } =
    React.useContext(PlayerColourContext);

  const changeColour = (currColour: String, newColour: String) => {
    let updatedColours: Array<String> = [...selectedColours];
    if (currColour !== '') {
      let index = selectedColours.indexOf(currColour);
      updatedColours.splice(index, 1);
    }
    if (newColour !== '') {
      updatedColours.push(newColour);
    }
    updateSelectedColours(updatedColours);
  };
  const [isErrorPanelOpen, toggleErrorPanel] = React.useState<boolean>(false);

  const [colour, setColour] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    let newColour: string = event.target.value as string;
    if (newColour !== colour) {
      if (selectedColours.includes(newColour)) {
        // TODO: Use UI Error message
        // console.error(
        //   'ERR: ' +
        //     newColour +
        //     ' is taken. Please choose a different colour instead.'
        // );
        toggleErrorPanel(true);
      } else {
        // Close in case it's open
        toggleErrorPanel(false);
        changeColour(colour, newColour);
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
      {isErrorPanelOpen && (
        <Error
          isOpen={isErrorPanelOpen}
          message={'The colour chosen is taken. Please choose another one.'}
          closeMsg={toggleErrorPanel}
        />
      )}
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
