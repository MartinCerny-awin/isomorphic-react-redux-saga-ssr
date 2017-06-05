// Libraries
import React from 'react';
import PropTypes from 'prop-types';

const Html = (props) => {
  const { initialState, rootComponent, assets, PROD } = props;

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
        {PROD ? <div id="root" dangerouslySetInnerHTML={{ __html: rootComponent }} /> : <div id="root" />}
        {PROD && <script dangerouslySetInnerHTML={{ __html: manifest.text }} />}
        {PROD && <script src={vendor.js} />}
        <script src={PROD ? app.js : '/static/app.js'} />
      </body>
    </html>
  );
};

Html.propTypes = {
  initialState: PropTypes.object,
  rootComponent: PropTypes.object,
  assets: PropTypes.object,
  PROD: PropTypes.bool.isRequired,
};

export default Html;
