/* eslint no-console: 0 */

import { takeLatest, call, put, select } from 'redux-saga/effects';
import { actions, types, selectors } from 'modules/album/reducers';
import * as api from 'api';

function* requestAlbums() {
  const cachedAlbums = yield select(selectors.getAlbums);
  if (cachedAlbums.length === 0) {
    try {
      const response = yield call(api.get, '/albums');
      yield put(actions.receiveAlbums(response.data));
    } catch (error) {
      console.log('Albums request failed');
    }
  } else {
    console.log('Albums already in store');
  }
}

export default function* watchRequestAlbums() {
  yield takeLatest(types.ALBUMS_REQUEST, requestAlbums);
}
