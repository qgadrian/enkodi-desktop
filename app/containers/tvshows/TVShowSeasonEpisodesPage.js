// @flow
import { connect } from 'react-redux';
import TVShowSeasonEpisodes from '../../components/tvshows/seasons/episodes/TVShowSeasonEpisodes';
import { playerStatusChange } from '../../actions/EnkodiActions';

function matchDispatchToProps(dispatch) {
  return {
    onPlayEpisode: () => {
      dispatch(playerStatusChange(true));
    }
  };
}

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(TVShowSeasonEpisodes);
