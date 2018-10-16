import React from 'react';
import Counter from './Counter';
import {increment, decrement, reset} from '../redux/actions/counter';
import {connect} from 'react-redux';

const HomePage = ({dispatch, counter}) => {
  // console.log(counter);
  // console.log(dispatch);

  const increment = function(){
    dispatch({
      type: 'counter/INCREMENT'
    });
  }

  const decrement = function(){
    dispatch({
      type: 'counter/DECREMENT'
    });
  }

  const reset = function(){
    dispatch({
      type: 'counter/RESET'
    });
  }

  return (
    <Counter
      count={counter.count}
      onIncrement={() => increment()}
      onDecrement={() => decrement()}
      onReset={() => reset()}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
};

/*const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch(increment())
    },
    decrement: () => {
      dispatch(decrement())
    },
    reset: () => {
      dispatch(reset())
    }
  }
};*/

export default connect(mapStateToProps)(HomePage)