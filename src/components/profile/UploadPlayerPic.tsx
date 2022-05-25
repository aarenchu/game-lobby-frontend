import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayerAvatar from './PlayerAvatar';
import { auth, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ProfilePicUrlContext } from '../context/ProfilePicUrlContext';

const UploadPlayerPic = () => {
  const [user] = useAuthState(auth);
  const [image, setImage] = useState(null);
  const [percent, setPercent] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const { changeProfilePicUrl } = React.useContext(ProfilePicUrlContext);

  const handleChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };

    // Upload file and metadata
    const storageRef = ref(storage, 'images/' + user.uid + '.jpg');
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          changeProfilePicUrl(downloadURL);
        });
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
      {percent < 100 && percent > 0 && (
        <Typography variant='subtitle2'> {percent}% done</Typography>
      )}

      <PlayerAvatar isHeader={false} />
      <Typography variant='subtitle2'> Upload new profile picture </Typography>
      <input
        accept='image/*'
        id='contained-button-file'
        type='file'
        onChange={handleChange}
      />

      <Button variant='contained' onClick={handleUpload}>
        Upload
      </Button>
    </>
  );
};

export default UploadPlayerPic;
