// @flow
import React, { Component, PropTypes } from 'react';
import VolumeSlider from 'rc-slider';

const kodiHandler = require('../utils/kodi/KodiHandler')();
const inputActions = require('../actions/kodi/InputActions');
const volumeActions = require('../actions/kodi/VolumeActions');

// TODO check leaks when gc deferrences this remote object
const mainWindow = require('electron').remote.getCurrentWindow();
const globalShortcut = require('electron').remote.globalShortcut;

class Controller extends Component {
  static propTypes = {
    onVolumeChange: PropTypes.func.isRequired,
    enkodi: PropTypes.shape({
      connection: PropTypes.shape({
        info: PropTypes.shape({
          name: PropTypes.string.isRequired,
          host: PropTypes.string.isRequired,
          port: PropTypes.string.isRequired
        }).isRequired,
        client: PropTypes.object,
        connected: PropTypes.bool.isRequired,
      }).isRequired,
      player: PropTypes.shape({
        volume: PropTypes.number.isRequired
      }).isRequired,
    }).isRequired
  };

  componentDidMount() {
    const self = this;

    if (mainWindow.isFocused()) {
      this.registerKeyEvents(globalShortcut);
    }

    mainWindow.on('focus', () => self.registerKeyEvents(globalShortcut));

    mainWindow.on('blur', () => self.unregisterKeyEvents(globalShortcut));
  }

  componentWillUnmount() {
    this.unregisterKeyEvents(globalShortcut);
  }

  getConnectionStatusText() {
    if (this.props.enkodi.connection.connected) {
      const { name, host, port } = this.props.enkodi.connection.info;
      return `Connected to ${name} at ${host}:${port}`;
    }

    return 'Connecting...';
  }

  registerKeyEvents(keyListener) {
    const self = this;

    keyListener.register('CommandOrControl+Shift+P', () => {
      self.unregisterKeyEvents(globalShortcut);
    });

    keyListener.register('Up', () => {
      self.handleOnUp();
    });

    keyListener.register('Down', () => {
      self.handleOnDown();
    });

    keyListener.register('Right', () => {
      self.handleOnRight();
    });

    keyListener.register('Left', () => {
      self.handleOnLeft();
    });

    keyListener.register('Enter', () => {
      self.handleOnEnter();
    });

    keyListener.register('Tab', () => {
      self.handleOnMenu();
    });

    keyListener.register('Backspace', () => {
      self.handleOnBack();
    });

    keyListener.register('CommandOrControl+Q', () => {
      self.handleOnContextMenu();
    });

    keyListener.register('PageUp', () => {
      self.handleVolumeChange(this.props.enkodi.player.volume + 10);
    });

    keyListener.register('PageDown', () => {
      self.handleVolumeChange(this.props.enkodi.player.volume - 10);
    });

    keyListener.register('CommandOrControl+U', () => {
      self.handleScanLibrary();
    });
  }

  unregisterKeyEvents(keyListener) {
    keyListener.unregisterAll();
  }

  handleOnUp() {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, inputActions.inputUpAction());
  }

  handleOnDown() {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, inputActions.inputDownAction());
  }

  handleOnRight() {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, inputActions.inputRightAction());
  }

  handleOnLeft() {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, inputActions.inputLeftAction());
  }

  handleOnEnter() {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, inputActions.inputEnter());
  }

  handleOnMenu() {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, inputActions.inputMenu());
  }

  handleOnBack() {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, inputActions.inputBack());
  }

  handleOnHome() {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, inputActions.inputHome());
  }

  handleOnContextMenu() {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, inputActions.inputContextMenu());
  }

  handleScanLibrary() {
    this.props.enkodi.connection.client.VideoLibrary.Scan();
  }

  handleVolumeChange(volumeValue) {
    kodiHandler.handleSendEvent(this.props.enkodi.connection.client, volumeActions.audioSetVolume(volumeValue));
    this.props.onVolumeChange(volumeValue);
  }

  handleChange(volumeValue) {
    this.props.onVolumeChange(volumeValue);
  }

  render() {
    return (
      <div className="controllers">
        <p>{this.getConnectionStatusText()}</p>

        <div className="volume">
          <span className="label">Volume</span>
          <VolumeSlider
            min={0} max={100} defaultValue={30} step={1}
            value={this.props.enkodi.player.volume}
            tipFormatter={null}
            onChange={this.handleChange.bind(this)}
            onAfterChange={this.handleVolumeChange.bind(this)}
          />
        </div>

        <div className="control_buttons">
          <div className="input">
            <div className="row">
              <button className="up" onClick={this.handleOnUp.bind(this)}>
                <i className="control_up" />
              </button>
            </div>
            <div className="row">
              <button className="left" onClick={this.handleOnLeft.bind(this)}>
                <i className="control_left" />
              </button>
              <button className="enter" onClick={this.handleOnEnter.bind(this)}>
                <i className="control_ok" />
              </button>
              <button className="right" onClick={this.handleOnRight.bind(this)}>
                <i className="control_right" />
              </button>
            </div>
            <div className="row">
              <button className="down" onClick={this.handleOnDown.bind(this)}>
                <i className="control_down" />
              </button>
            </div>
          </div>

          <div className="actions">
            <div className="row">
              <button className="back" onClick={this.handleOnBack.bind(this)}>
                <i className="action_left" />
              </button>
              <button className="home" onClick={this.handleOnHome.bind(this)}>
                <i className="action_home" />
              </button>
              <button className="menu" onClick={this.handleOnMenu.bind(this)}>
                <i className="action_menu" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Controller;
