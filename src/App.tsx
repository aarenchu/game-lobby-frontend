import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameLobby from './components/home-ui/GameLobby';
import { PlayerColourContext } from './components/context/PlayerColourContext';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

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
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Router>
      </PlayerColourContext.Provider>
    </div>
  );
}

export default App;
