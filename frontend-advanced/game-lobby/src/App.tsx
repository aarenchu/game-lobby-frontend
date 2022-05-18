import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GameLobby from './components/GameLobby';
import { PlayerColourContext } from './components/context/PlayerColourContext';

function App() {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#00acea',
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'black',
          },
        },
      },
    },
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#808080',
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  });

  // Filter colours included in the charts based on the selectedColours state
  const [selectedColours, setSelectedColours] = React.useState([
    'red',
    'green',
    'blue',
  ]);
  const updateSelectedColours = (colours) => {
    setSelectedColours(colours);
  };
  return (
    <div className='App'>
      <PlayerColourContext.Provider
        value={{ selectedColours, updateSelectedColours }}
      >
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path='/' element={<GameLobby />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </PlayerColourContext.Provider>
    </div>
  );
}

export default App;
