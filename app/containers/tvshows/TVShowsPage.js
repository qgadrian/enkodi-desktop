// @flow
import { connect } from 'react-redux';
import TVShows from '../../components/tvshows/TVShows';

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

export default connect(mapStateToProps)(TVShows);
