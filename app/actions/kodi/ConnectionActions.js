export const KODI_CONNECT = 'KODI_CONNECT';
export function kodiConnect(name, host, port, kodiClient) {
  return {
    type: KODI_CONNECT,
    info: {
      name,
      host,
      port
    },
    kodiClient
  };
}

export const UPDATE_CONNECTION_NAME = 'UPDATE_CONNECTION_NAME';
export function connectionName(name) {
  return {
    type: UPDATE_CONNECTION_NAME,
    name
  };
}

export const UPDATE_CONNECTION_HOST = 'UPDATE_CONNECTION_HOST';
export function connectionHost(host) {
  return {
    type: UPDATE_CONNECTION_HOST,
    host
  };
}

export const UPDATE_CONNECTION_PORT = 'UPDATE_CONNECTION_PORT';
export function connectionPort(port) {
  return {
    type: UPDATE_CONNECTION_PORT,
    port
  };
}
