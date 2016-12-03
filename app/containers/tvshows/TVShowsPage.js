// @flow
import { connect } from 'react-redux';
import TVShows from '../../components/tvshows/TVShows';

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

export default connect(mapStateToProps, matchDispatchToProps)(TVShows);
