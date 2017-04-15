import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// Components
import App from 'client/containers/AppContainer';

// Redux
import { Provider } from 'react-redux';
import createStore from 'universal/redux/createStore.js';
import createHistory from 'history/createBrowserHistory';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__INITIAL_STATE__

const history = createHistory();
const store = createStore(history, preloadedState);

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
