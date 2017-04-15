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

import * as Reducers from './reducers/index.js';

export default (history, reduxState = undefined) => {
  const middleware = routerMiddleware(history);

  const store = createStore(
    combineReducers(
      {
        ...Reducers,
        router: routerReducer
      },
      reduxState,
    ),
    applyMiddleware(middleware)
  );


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
   }


  return store;
}
