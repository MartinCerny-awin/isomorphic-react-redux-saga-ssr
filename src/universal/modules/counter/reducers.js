export const types = {
  COUNTER_INCREMENT: 'COUNTER_INCREMENT',
  COUNTER_DECREMENT: 'COUNTER_DECREMENT',
};

const initialState = {
  count: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.COUNTER_INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case types.COUNTER_DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export const actions = {
  incrementCount: () => ({ type: types.COUNTER_INCREMENT }),
  decrementCount: () => ({ type: types.COUNTER_DECREMENT }),
};
