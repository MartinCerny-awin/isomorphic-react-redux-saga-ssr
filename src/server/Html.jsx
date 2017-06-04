// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Html extends Component {
  static propTypes = {
    initialState: PropTypes.object,
    rootComponent: PropTypes.object,
    manifest: PropTypes.object,
    PROD: PropTypes.bool.isRequired,
  }

  render () {
    const {
      initialState,
      rootComponent,
      assets,
      PROD,
    } = this.props;

    const {
      manifest,
      app,
      vendor
    } = assets || {};

    return(
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>title</title>
          {PROD && <link rel="stylesheet" href="/static/prerender.css" type="text/css" />}
        </head>
        <body>
          <script dangerouslySetInnerHTML={{__html: initialState}} />
            {PROD ? <div id="root" dangerouslySetInnerHTML={{__html: rootComponent}}></div> : <div id="root"></div>}
            {PROD && <script dangerouslySetInnerHTML={{__html: manifest.text}}/>}
            {PROD && <script src={vendor.js}/>}
          <script src={PROD ? app.js : '/static/app.js'} />
        </body>
      </html>
    )
  }

}

export default Html;
