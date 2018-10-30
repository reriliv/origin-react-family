import React, {Component} from 'react';
import style from './item.css';
import { Select } from 'antd';
const Option = Select.Option;

const mapListKey = (list) => {
  const arr = [];
  for(let key in list){
    arr.push(key);
  }
  return arr;
}

class OrderFrom extends Component{

  handleSelect(value){
    console.log(value, '选择');
    /*console.log(this.props.filter);
    this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          order_way: value
        }
      }
    });*/
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {order_way: value}
    );
  }

  render(){
    return (
      <div className={style['product-control-item']}>
        <span className={style['product-control-name']}> 订单来源: </span>
        <Select
          dropdownMatchSelectWidth={true}
          style={{width: 100, textAlign: 'center'}}
          defaultValue={0}
          onChange={value => this.handleSelect(value)}
        >
          <Option value={0} key={0}> 所有 </Option>
          {
            mapListKey(this.props.OrderSource).map((item, key) => {
              return (
                <Option value={key+1} key={key+1}> {this.props.OrderSource[item]} </Option>
              );
            })
          }
        </Select>
      </div>
    );
  }
}

export default OrderFrom;