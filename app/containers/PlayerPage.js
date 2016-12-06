// @flow
import { connect } from 'react-redux';
import Player from '../components/Player';
import { playerStatusChange, playerPlayDetails, playerRefreshPlayTime } from '../actions/EnkodiActions';

function matchDispatchToProps(dispatch) {
  return {
    onRefreshPlayerDetails: (nextCurrentTime) => {
      const currentTime = {
        hours: nextCurrentTime.hours(),
        minutes: nextCurrentTime.minutes(),
        seconds: nextCurrentTime.seconds(),
        millis: nextCurrentTime.milliseconds(),
      };
      dispatch(playerRefreshPlayTime(currentTime));
    },
    onRefreshPlayerTime: (connection) => {
      const playerFilter = { playerid: 1, properties: ['percentage', 'time', 'totaltime', 'audiostreams', 'subtitles'] };
      connection.Player.GetProperties(playerFilter).then((playDetails) =>
        dispatch(playerPlayDetails(playDetails.percentage, playDetails.time, playDetails.totaltime))
      ).catch((error) => console.error(error));
    },
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
