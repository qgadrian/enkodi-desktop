import React, { Component, PropTypes } from 'react';
import TVShowSeason from './TVShowSeason';

export default class TVShowSeasons extends Component {
  static propTypes = {
    params: PropTypes.shape({
      tvshowid: PropTypes.string.isRequired
    }).isRequired,
    enkodi: PropTypes.shape({
      kodiHandler: PropTypes.object.isRequired
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
    const self = this;

    const filter = {
      tvshowid: Number(this.props.params.tvshowid),
      properties: ['tvshowid', 'season', 'thumbnail']
    };

    this.props.enkodi.kodiHandler.connection.VideoLibrary.GetSeasons(filter)
      .then((data) => {
        const seasons = data.seasons.map((season) => (
          <TVShowSeason
            key={season.season}
            season={season.season}
            thumbnail={season.thumbnail}
            tvshowid={season.tvshowid}
          />
        ));

        self.setState({ seasons });
        self.setState({ loading: false });
        return true;
      }).catch((error) => {
        console.error(error);
        self.setState({ loading: false });
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
