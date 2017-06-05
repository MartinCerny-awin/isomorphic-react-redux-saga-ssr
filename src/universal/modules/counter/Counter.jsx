import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Counter.css';

class Counter extends Component {
  handleIncrementClick = () => {
    this.props.incrementCount();
  };

  handleDecrementClick = () => {
    this.props.decrementCount();
  };

  render() {
    const { count } = this.props;

    return (
      <div className={styles.counterContainer}>
        <div className={styles.counter}>{count}</div>
        <button className={classNames(styles.button, styles.positive)} onClick={this.handleIncrementClick}>
          +
        </button>
        <button className={classNames(styles.button, styles.negative)} onClick={this.handleDecrementClick}>
          -
        </button>
      </div>
    );
  }
}

Counter.propTypes = {
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default Counter;
