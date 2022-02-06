import { useContext, useEffect, useRef } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { ContainerContext } from '@contexts/ContainerContext';
import { ThemeContext } from '@contexts/ThemeContext';

import { useBreakpointViewport } from '@hooks/useBreakpointViewport';

import HomePage from '@pages/Home/HomePage';
import MediaPage from '@pages/Media/MediaPage';
import MediaDetailPage from '@pages/MediaDetail/MediaDetailPage';
import MediaDetailSectionPage from '@pages/MediaDetailSection/MediaDetailSectionPage';

import Header from '@components/Layout/Header/Header';

import { routeMediaTypes } from '@services/constants';

import { styles } from '@styles';
import './App.css';

const ScrollToTop = ({ container }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    container && container.scrollTo && container.scrollTo(0, 0);
  }, [pathname, container]);

  return null;
};

const App = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setContainer } = useContext(ContainerContext);
  const { breakpoint } = useBreakpointViewport();
  const scrollerRef = useRef({});

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false
      }}
    >
      <div
        ref={scrollerRef}
        className={`App theme-${theme} ${styles} ${breakpoint}`}
        data-size={breakpoint}
      >
        <Router>
          <ScrollToTop container={scrollerRef.current} />

          <header className="App-header">
            <div className="App-container">
              <Header title="Netwatch" theme={theme} onChangeTheme={setTheme} />
            </div>
          </header>

          <div className="App-body" ref={setContainer}>
            <Switch>
              <Route exact component={HomePage} path="/home" />
              <Route
                exact
                component={MediaPage}
                path={[`/${routeMediaTypes.tv}`, `/${routeMediaTypes.movie}`]}
              />
              <Route
                exact
                component={MediaDetailPage}
                path={[
                  `/${routeMediaTypes.tv}/:key`,
                  `/${routeMediaTypes.movie}/:key`,
                  `/${routeMediaTypes.person}/:key`
                ]}
              />
              <Route
                exact
                component={MediaDetailSectionPage}
                path={[
                  `/${routeMediaTypes.tv}/:key/videos`,
                  `/${routeMediaTypes.tv}/:key/images`,
                  `/${routeMediaTypes.tv}/:key/credits`,
                  `/${routeMediaTypes.tv}/:key/seasons`,
                  `/${routeMediaTypes.tv}/:key/seasons/:number_season`,
                  `/${routeMediaTypes.tv}/:key/seasons/:number_season/episodes/:number_episode`,
                  `/${routeMediaTypes.movie}/:key/videos`,
                  `/${routeMediaTypes.movie}/:key/images`,
                  `/${routeMediaTypes.movie}/:key/credits`,
                  `/${routeMediaTypes.person}/:key/images`
                ]}
              />
              <Redirect to="/home" />
            </Switch>
          </div>

          <footer className="App-footer"></footer>
        </Router>
      </div>
    </SWRConfig>
  );
};

export default App;
