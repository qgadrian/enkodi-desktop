import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Menu extends Component {

  render() {
    return (
      <div className="main_menu">
        <button className="back" onClick={browserHistory.goBack}>
          <i className="fa fa-arrow-left fa-3x" />
        </button>
        <Link className="view controller" to={'/controller'}>
          <span>Controller</span>
        </Link>
        <Link className="view player" to={'/player'}>
          <span>Player</span>
        </Link>
        <Link className="view tv_shows" to={'/tvshows'}>
          <span>Tv shows</span>
        </Link>
        <Link className="view movies" to={'/movies'}>
          <span>Movies</span>
        </Link>
        <Link className="view music disabled">
          <span>Music</span>
        </Link>
      </div>
    );
  }

}

export default Menu;
