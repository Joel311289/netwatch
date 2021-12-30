import { useContext } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useBreakpointViewport } from './hooks/useBreakpointViewport';
import { ContainerContext } from './contexts/ContainerContext';
import HomePage from './pages/Home/HomePage';
import MoviesPage from './pages/Movies/MoviesPage';
import SeriesPage from './pages/Series/SeriesPage';
import MoviesDetailPage from './pages/Movies/MoviesDetailPage';
import SeriesDetailPage from './pages/Series/SeriesDetailPage';
import Header from './components/Layout/Header/Header';
import { mediaTypes } from './services/index';
import { styles } from './styles/index.js';
import './App.css';

const App = () => {
  const [theme, handleTheme] = useTheme();
  const { setContainer } = useContext(ContainerContext);
  const breakpoint = useBreakpointViewport();

  return (
    <div className={`App theme-${theme} ${styles}`} data-size={breakpoint}>
      <Router>
        <header className="App-header">
          <div className="App-container">
            <Header title="Netwatch" theme={theme} onChangeTheme={handleTheme} />
          </div>
        </header>

        <div className="App-body" ref={setContainer}>
          <div className="App-container App-content">
            <Switch>
              <Route exact component={HomePage} path="/home" />
              <Route exact component={MoviesPage} path={`/${mediaTypes.movie}`} />
              <Route exact component={MoviesDetailPage} path={`/${mediaTypes.movie}/:key`} />
              <Route exact component={SeriesPage} path={`/${mediaTypes.tv}`} />
              <Route exact component={SeriesDetailPage} path={`/${mediaTypes.tv}/:key`} />
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
