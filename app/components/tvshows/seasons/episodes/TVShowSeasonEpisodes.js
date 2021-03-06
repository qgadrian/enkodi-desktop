import React, { Component, PropTypes } from 'react';
import TVShowSeasonEpisode from './TVShowSeasonEpisode';

const kodiHandler = require('../../../../utils/kodi/KodiHandler')();
const LibraryActions = require('../../../../actions/kodi/LibraryActions');

export default class TVShowSeasonEpisodes extends Component {
  static propTypes = {
    onPlayEpisode: PropTypes.func.isRequired,
    params: PropTypes.shape({
      tvshowid: PropTypes.string.isRequired,
      season: PropTypes.string.isRequired
    }).isRequired,
    enkodi: PropTypes.shape({
      connection: PropTypes.shape({
        client: PropTypes.object.isRequired
      }).isRequired,
    }).isRequired
  };

  constructor(props) {
    super(props);

    const onScanFinished =
      this.props.enkodi.connection.client.VideoLibrary.OnScanFinished(this.refreshEpisodes);

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
    this.props.enkodi.connection.client.Player.Open(playParams);
    this.props.onPlayEpisode();
  }

  refreshEpisodes = () => {
    const tvshowid = Number(this.props.params.tvshowid);
    const season = Number(this.props.params.season);

    kodiHandler.handleGetData(this.props.enkodi.connection.client,
      LibraryActions.libraryGetTVShowSeasonEpisodes(tvshowid, season))
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
            playcount={episode.playcount}
            onPlayEpisode={this.onPlayEpisode.bind(this)}
          />
        ));

        this.setState({ episodes });
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
