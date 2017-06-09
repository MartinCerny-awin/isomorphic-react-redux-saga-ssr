export const types = {
  PHOTOS_REQUEST: 'PHOTOS_REQUEST',
  PHOTOS_RECEIVE: 'PHOTOS_RECEIVE',
};

export default (state = [], action = {}) => {
  switch (action.type) {
    case types.PHOTOS_RECEIVE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  requestPhotos: id => ({
    type: types.PHOTOS_REQUEST,
    uri: `/photos?albumId=${id}`,
    id,
  }),
  receivePhotos: (id, payload) => ({
    type: types.PHOTOS_RECEIVE,
    payload: { [id]: payload },
  }),
};

export const selectors = {
  getPhotos: (state, id) => state.photos[id],
};
