// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ControllerPage from './containers/ControllerPage';
import PlayerPage from './containers/PlayerPage';
import MoviesPage from './containers/MoviesPage';
import TVShowsPage from './containers/tvshows/TVShowsPage';
import TVShowSeasonsPage from './containers/tvshows/TVShowSeasonsPage';
import TVShowSeasonEpisodesPage from './containers/tvshows/TVShowSeasonEpisodesPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/controller" component={ControllerPage} />
    <Route path="/player" component={PlayerPage} />
    <Route path="/movies" component={MoviesPage} />
    <Route path="/tvshows" component={TVShowsPage} />
    <Route path="/tvshows/:tvshowid" component={TVShowSeasonsPage} />
    <Route path="/tvshows/:tvshowid/:season" component={TVShowSeasonEpisodesPage} />
  </Route>
);
