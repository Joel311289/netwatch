import { useContext } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { ContainerContext } from '@contexts/ContainerContext';
import { ThemeContext } from '@contexts/ThemeContext';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import HomePage from '@pages/Home/HomePage';
import MoviesPage from '@pages/Movies/MoviesPage';
import SeriesPage from '@pages/Series/SeriesPage';
import MoviesDetailPage from '@pages/Movies/MoviesDetailPage';
import SeriesDetailPage from '@pages/Series/SeriesDetailPage';

import Header from '@components/Layout/Header/Header';

import { routeMediaTypes } from '@services/constants';

import { styles } from '@styles';
import './App.css';

const App = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setContainer } = useContext(ContainerContext);
  const { breakpoint } = useBreakpointViewport();

  return (
    <div className={`App theme-${theme} ${styles} ${breakpoint}`} data-size={breakpoint}>
      <Router>
        <header className="App-header">
          <div className="App-container">
            <Header title="Netwatch" theme={theme} onChangeTheme={setTheme} />
          </div>
        </header>

        <div className="App-body" ref={setContainer}>
          <Switch>
            <Route exact component={HomePage} path="/home" />
            <Route exact component={MoviesPage} path={`/${routeMediaTypes.movie}`} />
            <Route exact component={MoviesDetailPage} path={`/${routeMediaTypes.movie}/:key`} />
            <Route exact component={SeriesPage} path={`/${routeMediaTypes.tv}`} />
            <Route exact component={SeriesDetailPage} path={`/${routeMediaTypes.tv}/:key`} />
            <Redirect to="/home" />
          </Switch>
        </div>

        <footer className="App-footer"></footer>
      </Router>
    </div>
  );
};

export default App;
