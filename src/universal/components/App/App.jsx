import React from 'react';
import PropTypes from 'prop-types';

import styles from './App.css';

const App = props =>
  (<div className={styles.app}>
    {props.children}
  </div>);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
