import React from 'react';
interface Props {
  url: string;
  changeProfilePicUrl: (url: string) => void;
}

export const ProfilePicUrlContext: React.Context<Props> = React.createContext({
  url: '',
  changeProfilePicUrl: (url: string) => {},
});
