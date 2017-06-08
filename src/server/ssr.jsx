/* eslint global-require: 0 */

// Node Modules
import fs from 'fs';
import { basename, join } from 'path';

// Libraries
import React from 'react';
import { renderToString } from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

// Redux
// import {push} from 'react-router-redux';
import createStore from 'universal/redux/createStore';
import rootSaga from 'universal/sagas/index';

// Components
import Html from 'server/Html';

function renderApp(url, res, store, assets) {
  const PROD = process.env.NODE_ENV === 'production';
  const Layout = PROD ? require('../../build/prerender.js').default : () => {};
  const rootComponent = PROD
    ? (<Provider store={store}>
      <StaticRouter location={url} context={{}}>
        <Layout />
      </StaticRouter>
    </Provider>)
    : null;

  store.runSaga(rootSaga).done.then(() => {
    // get state from store after sagas were run and strigify it for rendering in HTML
    const state = store.getState();
    const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`;

    const html = renderToString(
      <Html initialState={initialState} rootComponent={rootComponent} assets={assets} PROD={PROD} />,
    );
    res.send(`<!DOCTYPE html>${html}`);
  });
  if (PROD) {
    // Do first render, trigger sagas for component to run
    renderToString(rootComponent);
  }

  // Dispatch a close event so sagas stop listening after they're resolved
  store.closeSagas();
}

export const renderPage = (req, res) => {
  const history = createHistory();
  const store = createStore(history);

  const assets = require('../../build/assets.json');

  assets.manifest.text = fs.readFileSync(join(__dirname, '..', '..', 'build', basename(assets.manifest.js)), 'utf-8');

  renderApp(req.url, res, store, assets);
};

export const renderDevPage = (req, res) => {
  const history = createHistory();
  const store = createStore(history);
  renderApp(req.url, res, store);
};

export default renderPage;
