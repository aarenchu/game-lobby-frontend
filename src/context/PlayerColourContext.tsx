import React from 'react';

interface Props {
  selectedColours: any[];
  updateSelectedColours: (colours: String[]) => void;
}

export const PlayerColourContext: React.Context<Props> = React.createContext({
  selectedColours: [],
  updateSelectedColours: (colours: Array<String>) => {},
});
