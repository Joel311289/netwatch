import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import HomePage from './pages/Home/HomePage';
import MoviesPage from './pages/Movies/MoviesPage';
import SeriesPage from './pages/Series/SeriesPage';
import Header from './components/Layout/Header/Header';
import './App.css';

const App = () => {
  const [theme, handleTheme] = useTheme();

  return (
    <div className={`App theme-${theme}`}>
      <Router>
        <header className="App-header">
          <div className="App-container">
            <Header title="Netwatch" theme={theme} onChangeTheme={handleTheme} />
          </div>
        </header>

        <div className="App-body">
          <div className="App-container">
            <Switch>
              <Route exact component={HomePage} path="/home" />
              <Route exact component={MoviesPage} path="/movies" />
              <Route exact component={SeriesPage} path="/series" />
              <Redirect to="/home" />
            </Switch>
          </div>
        </div>

        <footer className="App-footer"></footer>
      </Router>
    </div>
  );
};

export default App;
