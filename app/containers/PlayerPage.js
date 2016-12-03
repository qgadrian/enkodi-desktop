// @flow
import { connect } from 'react-redux';
import Player from '../components/Player';
import { playerStatusChange } from '../actions/EnkodiActions';

function matchDispatchToProps(dispatch) {
  return {
    onPlayerSatusChange: (isPlaying) => {
      dispatch(playerStatusChange(isPlaying));
    }
  };
}

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Player);
