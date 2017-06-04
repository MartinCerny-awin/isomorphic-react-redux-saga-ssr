// Node Modules
import fs from 'fs';
import {basename, join} from 'path';

// Libraries
import React from 'react';
import {renderToString} from 'react-dom/server';
import { Provider } from 'react-redux';
import {StaticRouter} from 'react-router';
import createHistory from 'history/createMemoryHistory'

// Redux
// import {push} from 'react-router-redux';
import createStore from 'universal/redux/createStore';
import rootSaga from 'universal/sagas/sagas'

// Components
import Html from 'server/Html';

function renderApp(url, res, store, assets) {
  const PROD = process.env.NODE_ENV === 'production';

  const Layout = PROD ? require( '../../build/prerender.js').default : () => {};
  const rootComponent = PROD && renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={{}}>
        <Layout />
      </StaticRouter>
    </Provider>
  );

  store.runSaga(rootSaga).done.then(() => {
    // get state from store after sagas were run and strigify it for rendering in HTML
    const state = store.getState();
    const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`;

    const html = renderToString(
      <Html
        initialState={initialState}
        rootComponent={rootComponent}
        assets={assets}
        PROD={PROD}
      />
    );
    res.send('<!DOCTYPE html>'+html);
  });

  // Trigger sagas for component to run
  // https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
  rootComponent;

  // Dispatch a close event so sagas stop listening after they're resolved
  store.close();
}

export const renderPage = function (req, res) {
  const history = createHistory( );
  const store  = createStore(history);

  const assets = require('../../build/assets.json');

  assets.manifest.text = fs.readFileSync(
    join(__dirname, '..', '..', 'build', basename(assets.manifest.js)),
    'utf-8'
  );

  renderApp(req.url, res, store, assets);
};

export const renderDevPage = function (req, res) {
  const history =  createHistory( );
  const store   = createStore(history);
  renderApp(req.url, res, store);
};

export default renderPage;
