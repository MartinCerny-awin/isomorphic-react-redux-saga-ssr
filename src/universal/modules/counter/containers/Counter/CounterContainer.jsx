// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Counter from 'modules/counter/components/Counter/Counter';

// Actions
import { incrementCount, decrementCount } from 'modules/counter/ducks/counter';

const CounterContainer = props => <Counter {...props} />;

CounterContainer.propTypes = {
  // State
  count: PropTypes.number.isRequired,

  // Dispatchers
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const count = state.counter.get('count');
  return {
    count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementCount: () => {
      dispatch(incrementCount());
    },
    decrementCount: () => {
      dispatch(decrementCount());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
