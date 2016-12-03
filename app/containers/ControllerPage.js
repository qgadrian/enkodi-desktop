// @flow
import { connect } from 'react-redux';
import Controller from '../components/Controller';
import { volumeChange } from '../actions/EnkodiActions';

function matchDispatchToProps(dispatch) {
  return {
    onVolumeChange: (volumeValue) => {
      dispatch(volumeChange(volumeValue));
    }
  };
}

function mapStateToProps(state) {
  return {
    enkodi: state.enkodi
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Controller);
