import React, { Component, PropTypes } from 'react';
import TVShowSeasonEpisode from './TVShowSeasonEpisode';

export default class TVShowSeasonEpisodes extends Component {
  static propTypes = {
    onPlayEpisode: PropTypes.func.isRequired,
    params: PropTypes.shape({
      tvshowid: PropTypes.string.isRequired,
      season: PropTypes.string.isRequired
    }).isRequired,
    enkodi: PropTypes.shape({
      kodiHandler: PropTypes.object.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);

    const onScanFinished =
      this.props.enkodi.kodiHandler.connection.VideoLibrary.OnScanFinished(this.refreshEpisodes);

    this.state = {
      loading: true,
      onScanFinished,
      episodes: []
    };
  }

  componentDidMount() {
    this.refreshEpisodes();
  }

  componentWillUnmount() {
    this.state.onScanFinished.removeListener('VideoLibrary.OnScanFinished', this.refreshEpisodes);
  }

  onPlayEpisode = (file) => {
    // TODO create api action
    const playParams = { item: { file } };
    this.props.enkodi.kodiHandler.connection.Player.Open(playParams);
    this.props.onPlayEpisode();
  }

  refreshEpisodes = () => {
    const self = this;

    const filter = {
      tvshowid: Number(this.props.params.tvshowid),
      season: Number(this.props.params.season),
      properties: ['title', 'plot', 'episode', 'showtitle', 'season', 'file', 'thumbnail']
    };

    this.props.enkodi.kodiHandler.connection.VideoLibrary.GetEpisodes(filter)
      .then((data) => {
        const episodes = data.episodes.map((episode) => (
          <TVShowSeasonEpisode
            key={episode.episode}
            title={episode.title}
            plot={episode.plot}
            season={episode.season}
            episode={episode.episode}
            file={episode.file}
            thumbnail={episode.thumbnail}
            onPlayEpisode={this.onPlayEpisode.bind(this)}
          />
        ));

        self.setState({ episodes });
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
      children = (<span className="loading">Loading episodes...</span>);
    } else {
      children = this.state.episodes;
    }

    return (
      <div className="episodes">
        {children}
      </div>
    );
  }
}
