/* eslint global-require: 0 */
/* eslint no-underscore-dangle: 0*/
/* eslint import/no-extraneous-dependencies:0 */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import App from 'client/containers/AppContainer';
import createStore from 'universal/redux/createStore';
import rootSaga from 'universal/sagas/index';
import RouteMap from 'universal/routes/RouteMap';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__INITIAL_STATE__;
const splitPoints = window.__SPLIT_POINTS__ || [];

const history = createHistory();
const store = createStore(history, preloadedState);

store.rootTask = store.runSaga(rootSaga);

const rootEl = document.getElementById('root');
const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component history={history} />
      </Provider>
    </AppContainer>,
    rootEl,
  );
};

// Wait for all promises to resolve before rendering.
// These promises are returned by the loadComponent function on asyncComponent.

const PROD = process.env.NODE_ENV === 'production';
if (PROD) {
  Promise.all(splitPoints.map(chunk => RouteMap[chunk].loadComponent())).then(() => {
    renderApp(App);
  });
} else {
  renderApp(App);
}

if (module.hot) {
  module.hot.accept('client/containers/AppContainer', () => {
    const newApp = require('client/containers/AppContainer').default;
    renderApp(newApp);
  });

  module.hot.accept('universal/sagas', () => {
    store.closeSagas();
    store.rootTask = store.runSaga(require('universal/sagas').default);
  });
}
