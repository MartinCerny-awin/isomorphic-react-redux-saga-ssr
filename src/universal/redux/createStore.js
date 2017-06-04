import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import createSaga, { END } from 'redux-saga';

import * as Reducers from './reducers/index.js';

export default (history, reduxState = undefined) => {
  const saga = createSaga();
  const router = routerMiddleware(history);

  const store = createStore(
    combineReducers(
      {
        ...Reducers,
        router: routerReducer
      },
      reduxState,
    ),
    applyMiddleware(
      saga,
      router,
    )
  );

	store.runSaga = saga.run;
	store.close = () => store.dispatch(END);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducers = require('./reducers/index.js');
      const rootReducer = combineReducers({
        ...nextReducers,
        router: routerReducer
      });

      store.replaceReducer(rootReducer);
    });
    // https://github.com/edwardzhxw/react-universal/blob/1bc5e6a49bf08cdf59eb88fc2c76f42e6995a106/src/common/redux/store.js
    //  module.hot.accept('../sagas', () => {
    //   store.closeSagas();
    //   store.rootTask = sagaMiddleware.run(require('../sagas').default);
    // });
  }

  return store;
}
