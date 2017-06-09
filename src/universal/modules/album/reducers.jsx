export const types = {
  ALBUMS_REQUEST: 'ALBUMS_REQUEST',
  ALBUMS_RECEIVE: 'ALBUMS_RECEIVE',
};

export default (state = [], action = {}) => {
  switch (action.type) {
    case types.ALBUMS_RECEIVE:
      return action.payload;

    default:
      return state;
  }
};

export const actions = {
  requestAlbums: () => ({ type: types.ALBUMS_REQUEST }),
  receiveAlbums: payload => ({ type: types.ALBUMS_RECEIVE, payload }),
};

export const selectors = {
  getAlbums: state => state.albums,
};
