import React, { Component } from 'react';
import { Link } from 'react-router';

class Menu extends Component {

  render() {
    return (
      <div className="main_menu">
        <Link className="controller" to={'/controller'}>
          <span>Controller</span>
        </Link>
        <Link className="player" to={'/player'}>
          <span>Player</span>
        </Link>
        <Link className="tv_shows" to={'/tvshows'}>
          <span>Tv shows</span>
        </Link>
        <Link className="movies" to={'/movies'}>
          <span>Movies</span>
        </Link>
        <Link className="music disabled">
          <span>Music</span>
        </Link>
      </div>
    );
  }

}

export default Menu;
