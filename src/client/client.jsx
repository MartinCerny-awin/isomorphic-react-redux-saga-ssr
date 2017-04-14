import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// Components
import App from 'client/containers/AppContainer';

// Redux
import { Provider } from 'react-redux';
import createStore from 'universal/redux/createStore.js';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const store = createStore(history);

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
