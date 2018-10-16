import counter from './reducers/counter';

function combineReducers(state = {}, action) {
  return {
    counter: counter(state.counter, action)
  }
}

export default combineReducers;