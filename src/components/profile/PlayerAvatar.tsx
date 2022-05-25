import React, { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { auth, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { ProfilePicUrlContext } from '../context/ProfilePicUrlContext';

interface Props {
  isHeader: boolean;
}

const PlayerAvatar: React.FC<Props> = ({ isHeader }) => {
  const [user] = useAuthState(auth);
  const { url, changeProfilePicUrl } = React.useContext(ProfilePicUrlContext);

  useEffect(() => {
    if (user && user.uid) {
      const imagesRef = ref(storage, 'images/');
      listAll(imagesRef)
        .then((res) => {
          const imageRef = res.items.find(
            (itemRef) => itemRef.name === user.uid + '.jpg'
          );
          if (imageRef) {
            getDownloadURL(imageRef)
              .then((url) => {
                changeProfilePicUrl(url);
              })
              .catch((err) => {
                if (err.code === 'storage/object-not-found') {
                  changeProfilePicUrl('');
                }
              });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user, url, changeProfilePicUrl]);
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
