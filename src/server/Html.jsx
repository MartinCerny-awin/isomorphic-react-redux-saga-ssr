/* eslint global-require: 0 */
/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

const Html = (props) => {
  const PROD = process.env.NODE_ENV === 'production';
  const { initialState, url, assets, store } = props;

  const { manifest, app, vendor } = assets || {};

  const Layout = PROD ? require('../../build/prerender.js').default : () => {};
  const rootComponent =
    PROD &&
    renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={{}}>
          <Layout />
        </StaticRouter>
      </Provider>,
    );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>title</title>
        {PROD && <link rel="stylesheet" href="/static/prerender.css" type="text/css" />}
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: initialState }} />
        {PROD ? <div id="root" dangerouslySetInnerHTML={{ __html: rootComponent }} /> : <div id="root" />}
        {PROD && <script dangerouslySetInnerHTML={{ __html: manifest.text }} />}
        {PROD && <script src={vendor.js} />}
        <script src={PROD ? app.js : '/static/app.js'} />
      </body>
    </html>
  );
};

Html.defaultProps = {
  assets: undefined,
};

Html.propTypes = {
  initialState: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  store: PropTypes.shape({
    dispatch: PropTypes.func,
    subscribe: PropTypes.func,
    getState: PropTypes.func,
  }).isRequired,
  assets: PropTypes.shape({
    manifest: PropTypes.object,
    app: PropTypes.object,
    vendor: PropTypes.object,
  }),
};

export default Html;
