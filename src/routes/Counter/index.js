import React, {Component} from 'react';


class Counter extends Component {
  render() {
    return (
      <div>
        <div>当前计数为{this.props.count}</div>
        <button onClick={this.props.onIncrement}>自增
        </button>
        <button onClick={this.props.onDecrement}>自减
        </button>
        <button onClick={this.props.onReset}>重置
        </button>
      </div>
    )
  }
}

export default Counter;