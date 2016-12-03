import React, { Component, PropTypes } from 'react';
import TVShow from './TVShow';

export default class TVShows extends Component {
  static propTypes = {
    // onPlayerPause: PropTypes.func.isRequired,
    enkodi: PropTypes.shape({
      kodiHandler: PropTypes.object.isRequired
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
    const self = this;

    const filter = { properties: ['title', 'thumbnail'] };

    this.props.enkodi.kodiHandler.connection.VideoLibrary.GetTVShows(filter)
      .then((data) => {
        const tvshows = data.tvshows.map((tvshow) => (
          <TVShow
            key={tvshow.tvshowid}
            title={tvshow.title}
            thumbnail={tvshow.thumbnail}
            tvshowid={tvshow.tvshowid}
          />
        ));

        self.setState({ tvshows });
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
