import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { PlayerColourContext } from '../context/PlayerColourContext';
import { auth, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import ChangeColourDropdown from './ChangeColourDropdown';
import PlayerAvatar from './PlayerAvatar';

const PlayerProfilePage = () => {
  const [user] = useAuthState(auth);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const { updateSelectedColours } = React.useContext(PlayerColourContext);

  const Input = styled('input')({
    display: 'none',
  });

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(
      'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/'
    )
      .then((response) => response.json())
      .then((data) => {
        let colours = data.reduce(function (result, player) {
          if (player.colour && player.colour !== "''") {
            result.push(player.colour);
          }
          return result;
        }, []);
        updateSelectedColours(colours);
      });
  }, []);

  const handleUpload = () => {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + user.uid + '.jpg');
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
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
              <PlayerAvatar isHeader={false} />
              <label htmlFor='contained-button-file'>
                <Input
                  accept='image/*'
                  id='contained-button-file'
                  multiple
                  type='file'
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                <Button variant='contained' component='span'>
                  Choose image
                </Button>
              </label>
              <Button variant='contained' onClick={handleUpload}>
                Upload
              </Button>
              <ChangeColourDropdown />
            </Stack>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PlayerProfilePage;
