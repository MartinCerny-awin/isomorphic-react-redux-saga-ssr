import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Counter.css';

class Counter extends Component {
  handleLinkClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  handleIncrementClick = (event) => {
    this.handleLinkClick(event);
    this.props.incrementCount();
  };

  handleDecrementClick = (event) => {
    this.handleLinkClick(event);
    this.props.decrementCount();
  };

  render() {
    const { count } = this.props;

    return (
      <div className={styles.counterContainer}>
        <div className={styles.counter}>{count}</div>
        <a className={classNames(styles.button, styles.positive)} onClick={this.handleIncrementClick}>
          +
        </a>
        <a className={classNames(styles.button, styles.negative)} onClick={this.handleDecrementClick}>
          -
        </a>
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
