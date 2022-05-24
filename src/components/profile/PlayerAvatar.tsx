import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { auth, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, getDownloadURL } from 'firebase/storage';
interface Props {
  isHeader: boolean;
}
const PlayerAvatar: React.FC<Props> = ({ isHeader }) => {
  const [user] = useAuthState(auth);
  const [url, setUrl] = useState('');
  const profilePicRef =
    user && user.uid ? ref(storage, 'images/' + user.uid + '.jpg') : null;
  useEffect(() => {
    if (profilePicRef) {
      getDownloadURL(profilePicRef).then((url) => {
        setUrl(url);
      });
    }
  });
  return (
    <>
      {isHeader && url === '' && <AccountCircleIcon />}
      {isHeader && url !== '' && <Avatar src={url} />}
      {!isHeader && url === '' && (
        <Avatar component='span' sx={{ width: 100, height: 100 }}>
          <AccountCircleIcon sx={{ fontSize: 60 }} />
        </Avatar>
      )}
      {!isHeader && url !== '' && (
        <Avatar component='span' sx={{ width: 100, height: 100 }} src={url} />
      )}
    </>
  );
};

export default PlayerAvatar;
