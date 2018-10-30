import React, {Component} from 'react';
import style from './item.css';
import { Select } from 'antd';
const Option = Select.Option;

class OrderType extends Component{

  handleSelect(value){
    console.log(value);
    // console.log(this.props.filter);
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {order_state: value}
    );
    /*this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          order_state: value
        }
      }
    });*/
  }

  render(){
    console.log(this.props.filter);
    return (
      <div className={style['product-control-item']}>
        <span className={style['product-control-name']}> 订单状态: </span>
        <Select
          dropdownMatchSelectWidth={true}
          style={{width: 100, textAlign: 'center'}}
          defaultValue={0}
          onSelect={(value) => this.handleSelect(value)}
        >
          {
            this.props.PayState.map((item, key) => {
              return (
                <Option value={key} key={key+1}> {item} </Option>
              )
            })
          }
        </Select>
      </div>
    );
  }
}

export default OrderType;