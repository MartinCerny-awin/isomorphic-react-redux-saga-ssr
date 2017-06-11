/* eslint global-require: 0 */
/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';

const Html = (props) => {
  const { initialState, rootComponent, assets, PROD, splitPoints } = props;

  const { manifest, app, vendor } = assets || {};

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>title</title>
        {PROD && <link rel="stylesheet" href="/static/prerender.css" type="text/css" />}
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: initialState }} />
        <script dangerouslySetInnerHTML={{ __html: splitPoints }} />
        {PROD
          ? <div id="root" dangerouslySetInnerHTML={{ __html: renderToString(rootComponent) }} />
          : <div id="root" />}
        {PROD && <script dangerouslySetInnerHTML={{ __html: manifest.text }} />}
        {PROD && <script src={vendor.js} />}
        <script src={PROD ? app.js : '/static/app.js'} />
      </body>
    </html>
  );
};

Html.defaultProps = {
  assets: undefined,
  rootComponent: null,
};

Html.propTypes = {
  initialState: PropTypes.string.isRequired,
  splitPoints: PropTypes.string.isRequired,
  rootComponent: PropTypes.element,
  assets: PropTypes.shape({
    manifest: PropTypes.object,
    app: PropTypes.object,
    vendor: PropTypes.object,
  }),
  PROD: PropTypes.bool.isRequired,
};

export default Html;
