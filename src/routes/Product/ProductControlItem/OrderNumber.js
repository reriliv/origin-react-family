import React, {Component} from 'react';
import style from './item.css';
import {Mention} from 'antd';
const { toString } = Mention;

class OrderNumber extends Component{

  /*handleInput(value){
    console.log(toString(value), '更改');
  }*/

  handleSelect(value){
    console.log(value, '选择');
    console.log(this.props.dispatch);
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {order_no: value}
    );
    // console.log(this.props.filter);
    /*this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          order_no: value
        }
      }
    });*/
  }

  handleChange(value){
    // console.log(value, '选择');
    // console.log(this.props.filter);
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {order_no: value}
    );
  }

  render(){
    // console.log(this.props.orderNumberList);
    return (
      <div className={style['product-control-item']}>
        <span className={style['product-control-name']}> 订单号: </span>
        <Mention
          style={{width: 175}}
          placeholder='请输入订单号'
          suggestions={this.props.orderNumberList}
          onChange={(value) => this.handleChange(toString(value))}
          onSelect={(value) => this.handleSelect(value)}
          prefix=''
        />
      </div>
    );
  }
}

export default OrderNumber;