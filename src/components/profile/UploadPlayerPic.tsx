import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PlayerAvatar from './PlayerAvatar';
import { styled } from '@mui/material/styles';
import { auth, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, uploadBytesResumable } from 'firebase/storage';

const UploadPlayerPic = () => {
  const [user] = useAuthState(auth);
  const [image, setImage] = useState(null);
  //   const [url, setUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const Input = styled('input')({
    display: 'none',
  });

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
        setImage(null);
        setIsSuccess(true);
      }
    );
  };
  return (
    <>
      {isSuccess && (
        <Collapse in={isSuccess}>
          <Alert
            severity='success'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setIsSuccess(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Profile image successfully uploaded
          </Alert>
        </Collapse>
      )}

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
    </>
  );
};

export default UploadPlayerPic;
