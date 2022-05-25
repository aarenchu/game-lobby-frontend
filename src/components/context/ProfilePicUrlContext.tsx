import React from 'react';

export const ProfilePicUrlContext = React.createContext({
  url: '',
  changeProfilePicUrl: (url: string) => {},
});
