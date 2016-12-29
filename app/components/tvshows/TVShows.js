import React, { Component, PropTypes } from 'react';
import TVShow from './TVShow';

const kodiHandler = require('../../utils/kodi/KodiHandler')();
const LibraryActions = require('../../actions/kodi/LibraryActions');

export default class TVShows extends Component {
  static propTypes = {
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
      tvshows: []
    };
  }

  componentDidMount() {
    kodiHandler.handleGetData(this.props.enkodi.connection.client, LibraryActions.libraryGetTVShows())
      .then((data) => {
        const tvshows = data.tvshows.map((tvshow) => (
          <TVShow
            key={tvshow.tvshowid}
            title={tvshow.title}
            thumbnail={tvshow.thumbnail}
            tvshowid={tvshow.tvshowid}
          />
        ));

        this.setState({ tvshows });
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
      children = (<span className="loading">Loading tv shows...</span>);
    } else {
      children = this.state.tvshows;
    }

    return (
      <div className="tvshows">
        {children}
      </div>
    );
  }
}
