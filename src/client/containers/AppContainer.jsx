import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import Routes from 'universal/routes/Routes';

const AppContainer = (props) => {
  console.log(props.history);
  return (
    <ConnectedRouter history={props.history}>
      <Route render={({ location }) => <Routes location={location} />} />
    </ConnectedRouter>
  );
};

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AppContainer;
