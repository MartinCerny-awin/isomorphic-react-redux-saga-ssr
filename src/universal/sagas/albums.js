import { takeLatest, call, put, select } from 'redux-saga/effects';
import { ALBUMS_REQUEST, receiveAlbums } from 'actions/albums';
// import { albumsSelector } from 'selectors';

function* requestAlbums({ uri }) {
	const cachedAlbums = yield select(albumsSelector);

	if (!cachedAlbums) {
		try {
			const albums = yield call(request, uri);
			yield put(receiveAlbums(albums));
		} catch (error) {
			console.log('Albums request failed');
		}
	} else {
        console.log('Albums already in store');
    }
}

export function* watchRequestAlbums() {
	yield* takeLatest(ALBUMS_REQUEST, requestAlbums);
}