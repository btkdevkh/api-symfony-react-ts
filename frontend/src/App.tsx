import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import Home from './pages/Home';
import Create from './pages/Create';
import Favorites from './pages/Favorites';
import Layout from './components/Layout';
import Update from './pages/Update';
import Details from './pages/Details';
import Movies from './pages/Movies';

const theme = createTheme({
  palette: {
    primary: {
      main: "#4682b4"
    }
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/create" element={<Create />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/update/:id" element={<Update />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
