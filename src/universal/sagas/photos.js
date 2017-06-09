/* eslint no-console: 0 */

import { takeEvery, call, put, select } from 'redux-saga/effects';
import { actions, types, selectors } from 'modules/photo/reducers';
import * as api from 'api';

function* requestPhotos({ id, uri }) {
  const cachedPhotos = yield select(selectors.getPhotos, id);
  if (!cachedPhotos) {
    try {
      const response = yield call(api.get, uri);
      yield put(actions.receivePhotos(id, response.data));
    } catch (error) {
      console.log('Photos request failed');
    }
  } else {
    console.log('Photos already in store');
  }
}

export default function* watchRequestPhotos() {
  yield takeEvery(types.PHOTOS_REQUEST, requestPhotos);
}
