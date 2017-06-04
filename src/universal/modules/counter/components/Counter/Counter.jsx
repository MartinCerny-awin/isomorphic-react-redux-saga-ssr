import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.css';
import classNames from 'classnames';

class Counter extends Component {

  static propTypes = {
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
  }

  handleLinkClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleIncrementClick (incrementCount, event) {
    this.handleLinkClick(event);
    incrementCount();
  }

  handleDecrementClick(decrementCount, event) {
    this.handleLinkClick(event);
    decrementCount();
  }

  render () {
    const {
      counter,
      incrementCount,
      decrementCount
    } = this.props;

    return (
      <div className={styles.counterContainer}>
        <div className={styles.counter}>{counter.get('count')}</div>
        <a className={classNames(styles.button, styles.positive)} onClick={this.handleIncrementClick.bind(this, incrementCount)}>+</a>
        <a className={classNames(styles.button, styles.negative)} onClick={this.handleDecrementClick.bind(this, decrementCount)}>-</a>
      </div>
    )
  }
}

export default Counter;
