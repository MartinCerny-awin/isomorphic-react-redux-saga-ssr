// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

// Routes
// For Development only
import * as RouteMap from 'routes/static';

// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'routes/async';

// Containers
import AppContainer from 'containers/App/AppContainer';
// import PrivateRouteContainer from 'containers/PrivateRoute/PrivateRouteContainer.js';

const Routes = (props) => {
  const { location } = props;

  return (
    <AppContainer>
      <div>
        <Route exact location={location} path="/" component={RouteMap.Home} />
        <Route exact location={location} path="/counter" component={RouteMap.Counter} />
      </div>
    </AppContainer>
  );
};

Routes.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Routes;
