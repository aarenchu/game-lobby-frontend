import React from 'react';

export const PlayerIdContext = React.createContext({
  playerId: '',
  changePlayerId: (playerId: string) => {},
});
