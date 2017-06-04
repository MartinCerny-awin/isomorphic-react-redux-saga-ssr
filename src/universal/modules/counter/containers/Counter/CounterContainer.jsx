// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import Counter from 'modules/counter/components/Counter/Counter';

// Actions
import {
  incrementCount,
  decrementCount,
} from 'modules/counter/ducks/counter.js';

import { requestPhotos } from 'actions/photos';
import { requestAlbums } from 'actions/albums';

class CounterContainer extends Component {
  static propTypes = {
    // State
    counter: PropTypes.number.isRequired,

    // Dispatchers
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired
  }

  render () {
    return (<Counter {...this.props} />);
  }
}


function mapStateToProps(state, props) {
  const counter = state.counter;
  return {
    counter
  };
}


function mapDispatchToProps(dispatch, props) {
  return {
    incrementCount: () => {
      dispatch(incrementCount());
      dispatch(requestPhotos(1));
      dispatch(requestAlbums());
    },
    decrementCount: () => {
      dispatch(decrementCount());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
