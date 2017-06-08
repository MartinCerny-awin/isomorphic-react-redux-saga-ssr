import { takeEvery, call, put, select } from 'redux-saga/effects';
import { PHOTOS_REQUEST, receivePhotos } from 'actions/photos';
// import { photosSelector } from 'selectors';

function* requestPhotos({ id, uri }) {
  // const cachedPhotos = yield select(photosSelector, id);

  // if (!cachedPhotos) {
  try {
    const photos = yield call(request, uri);
    yield put(receivePhotos(id, photos));
  } catch (error) {
    console.log('Photos request failed');
  }
  // } else {
  //       console.log('Photos already in store');
  //   }
}

export default function* watchRequestPhotos() {
  yield takeEvery(PHOTOS_REQUEST, requestPhotos);
}
