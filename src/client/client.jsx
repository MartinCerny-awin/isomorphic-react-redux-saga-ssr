import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import App from 'client/containers/AppContainer';
import createStore from 'universal/redux/createStore';
import rootSaga from 'universal/sagas/sagas'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__INITIAL_STATE__

const history = createHistory();
const store = createStore(history, preloadedState);

store.runSaga(rootSaga);

const rootEl = document.getElementById('root')
const renderApp = (Component) => {
    render(
      <AppContainer>
        <Provider store={store}>
          <Component history={history} />
        </Provider>
      </AppContainer>,
      rootEl
    );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('client/containers/AppContainer', () => {
    const nextApp = require('client/containers/AppContainer');
    renderApp(nextApp);
  });
}
