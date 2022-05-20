import React from 'react';

export const PlayerColourContext = React.createContext({
  selectedColours: [],
  updateSelectedColours: (colours: Array<String>) => {},
});
