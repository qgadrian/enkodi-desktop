// @flow
import { connect } from 'react-redux';
import TVShowSeasons from '../../components/tvshows/seasons/TVShowSeasons';

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

export default connect(mapStateToProps)(TVShowSeasons);
