import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './App.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render () {
    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    );
  }
}

export default App;
