import { fork } from 'redux-saga/effects';

import { watchRequestAlbums } from './albums';
import { watchRequestPhotos } from './photos';

export default function* rootSaga() {
	yield [
		fork(watchRequestAlbums),
		fork(watchRequestPhotos),
	];
}
