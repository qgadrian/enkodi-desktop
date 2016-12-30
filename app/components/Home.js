// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  static propTypes = {
    onNameChange: PropTypes.func.isRequired,
    onHostChange: PropTypes.func.isRequired,
    onPortChange: PropTypes.func.isRequired,
    onSaveAndConnect: PropTypes.func.isRequired,
    enkodi: PropTypes.shape({
      connection: PropTypes.shape({
        info: PropTypes.shape({
          name: PropTypes.string.isRequired,
          host: PropTypes.string.isRequired,
          port: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);

    const { name, host, port } = this.props.enkodi.connection.info;

    this.state = {
      name,
      host,
      port
    };
  }

  handleOnNameChange(event) {
    const name = event.target.value;
    this.setState({ name });
    this.props.onNameChange(name);
  }

  handleOnHostChange(event) {
    const host = event.target.value;
    this.setState({ host });
    this.props.onHostChange(host);
  }

  handleOnPortChange(event) {
    const port = event.target.value;
    this.setState({ port });
    this.props.onPortChange(port);
  }

  render() {
    return (
      <div id="content center_content">
        <div className="title">
          <h2>Configure your kodi...</h2>
        </div>

        <div className="configuration">
          <div className="field">
            <label htmlFor="name">Just a name for your server</label>
            <input
              id="name" type="text"
              value={this.state.name}
              onChange={this.handleOnNameChange.bind(this)}
            />
          </div>

          <div className="field">
            <label htmlFor="host">Server host name or address</label>
            <input
              id="host" type="text"
              value={this.state.host}
              onChange={this.handleOnHostChange.bind(this)}
            />
          </div>

          <div className="field">
            <label htmlFor="port">Websocket port</label>
            <input
              id="port" type="text"
              value={this.state.port}
              onChange={this.handleOnPortChange.bind(this)}
            />
          </div>
        </div>

        <div className="action">
          <Link
            className="button connect"
            onClick={() => this.props.onSaveAndConnect(this.state.name, this.state.host, this.state.port)}
            to={{ pathname: '/controller' }}
          >
            <span>Save and connect!</span>
          </Link>
        </div>

      </div>
    );
  }
}

export default Home;
