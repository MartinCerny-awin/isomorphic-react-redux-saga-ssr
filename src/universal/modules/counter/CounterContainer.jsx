import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Counter from './Counter';
import { actions } from './counter';

const CounterContainer = props => <Counter {...props} />;

CounterContainer.propTypes = {
  count: PropTypes.number.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const count = state.counter.get('count');
  return {
    count,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
