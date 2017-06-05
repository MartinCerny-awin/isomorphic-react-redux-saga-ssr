/* eslint import/no-extraneous-dependencies:0 */
/* eslint no-console: 0 */

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const devWebpackConfig = require('../../webpack/webpack.config.development.js').default;

export default (app) => {
  const compiler = webpack(devWebpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      hot: true,
      publicPath: devWebpackConfig.output.publicPath,
    }),
  );

  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      reload: true,
    }),
  );

  return app;
};
