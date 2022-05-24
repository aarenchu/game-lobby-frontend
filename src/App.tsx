import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameLobby from './components/home-ui/GameLobby';
import { PlayerColourContext } from './components/context/PlayerColourContext';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import PlayerProfilePage from './components/profile/PlayerProfilePage';
import { PlayerIdContext } from './components/context/PlayerIdContext';

function App(): JSX.Element {
  // Keep track of the colours that are already selected
  const [selectedColours, setSelectedColours] = React.useState([]);
  const [playerId, setPlayerId] = React.useState('');

  const updateSelectedColours = (colours) => {
    setSelectedColours(colours);
  };

  const changePlayerId = (pid) => {
    setPlayerId(pid);
  };

  return (
    <div className='App'>
      <PlayerIdContext.Provider value={{ playerId, changePlayerId }}>
        <PlayerColourContext.Provider
          value={{ selectedColours, updateSelectedColours }}
        >
          <Router>
            <Routes>
              <Route path='/' element={<GameLobby />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/profile' element={<PlayerProfilePage />} />
            </Routes>
          </Router>
        </PlayerColourContext.Provider>{' '}
      </PlayerIdContext.Provider>
    </div>
  );
}

export default App;
