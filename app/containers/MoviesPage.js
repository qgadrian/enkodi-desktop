// @flow
import { connect } from 'react-redux';
import Movies from '../components/movies/Movies';
// import { playerStatusChange } from '../actions/EnkodiActions';

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

export default connect(mapStateToProps, matchDispatchToProps)(Movies);
