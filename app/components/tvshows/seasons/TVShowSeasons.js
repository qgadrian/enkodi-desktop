import React, { Component, PropTypes } from 'react';
import TVShowSeason from './TVShowSeason';

const kodiHandler = require('../../../utils/kodi/KodiHandler')();
const LibraryActions = require('../../../actions/kodi/LibraryActions');

export default class TVShowSeasons extends Component {
  static propTypes = {
    params: PropTypes.shape({
      tvshowid: PropTypes.string.isRequired
    }).isRequired,
    enkodi: PropTypes.shape({
      connection: PropTypes.shape({
        client: PropTypes.object.isRequired
      }).isRequired,
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      seasons: []
    };
  }

  componentDidMount() {
    const tvshowid = Number(this.props.params.tvshowid);

    kodiHandler.handleGetData(this.props.enkodi.connection.client, LibraryActions.libraryGetTVShowSeasons(tvshowid))
      .then((data) => {
        const seasons = data.seasons.map((season) => (
          <TVShowSeason
            key={season.season}
            season={season.season}
            thumbnail={season.thumbnail}
            tvshowid={season.tvshowid}
          />
        ));

        this.setState({ seasons });
        this.setState({ loading: false });
        return true;
      }).catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  render() {
    let children;

    if (this.state.loading) {
      children = (<span className="loading">Loading seasons...</span>);
    } else {
      children = this.state.seasons;
    }

    return (
      <div className="seasons">
        {children}
      </div>
    );
  }
}
