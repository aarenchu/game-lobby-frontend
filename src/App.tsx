import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameLobby from './components/GameLobby';
import { PlayerColourContext } from './components/context/PlayerColourContext';

function App(): JSX.Element {
  // Keep track of the colours that are already selected
  const [selectedColours, setSelectedColours] = React.useState([]);

  const updateSelectedColours = (colours) => {
    setSelectedColours(colours);
  };

  return (
    <div className='App'>
      <PlayerColourContext.Provider
        value={{ selectedColours, updateSelectedColours }}
      >
        <Router>
          <Routes>
            <Route path='/' element={<GameLobby />} />
          </Routes>
        </Router>
      </PlayerColourContext.Provider>
    </div>
  );
}

export default App;
