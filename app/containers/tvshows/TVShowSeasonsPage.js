// @flow
import { connect } from 'react-redux';
import TVShowSeasons from '../../components/tvshows/seasons/TVShowSeasons';

function matchDispatchToProps(dispatch) {
  return {
    // TODO
    // onFilePlay: (name) => {
    //   dispatch(connectionName(name));
    // }
  };
}

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(TVShowSeasons);
