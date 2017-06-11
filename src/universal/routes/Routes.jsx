// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import AppContainer from 'containers/App/AppContainer';
import RouteMap from './RouteMap';

const Routes = (props) => {
  const { location } = props;

  return (
    <AppContainer>
      <div>
        <Route exact location={location} path="/" component={RouteMap.Home} />
        <Route exact location={location} path="/counter" component={RouteMap.Counter} />
        <Route path="/albums" component={RouteMap.Albums} />
        <Route exact location={location} path="/albums" component={RouteMap.AlbumsList} />
        <Route path="/albums/:albumId" component={RouteMap.Photos} />
      </div>
    </AppContainer>
  );
};

Routes.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Routes;
