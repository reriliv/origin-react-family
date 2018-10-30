import React, {Component} from 'react';
import style from './item.css';
import { DatePicker } from 'antd';

class OrderTime extends Component{

  handleStartDate(date, dateString){
    console.log(date, dateString, '开始时间');
    // order_time_1
    /*this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          order_time_1: dateString
        }
      }
    });*/
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {order_time_1: dateString}
    );
  }

  handleEndDate(date, dateString){
    console.log(date, dateString, '结束时间');
    // order_time_2
    /*this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          order_time_2: dateString
        }
      }
    });*/
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {order_time_1: dateString}
    );
  }

  render(){
    return (
      <div className={style['product-control-item']}>
        <span className={style['product-control-name']}> 下单时间: </span>
        {/*<RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['开始时间', '结束时间']}
          onChange={this.handleChange}
          onOk={this.handleOk}
        />*/}
        <DatePicker
          format='YYYY-MM-DD HH:mm:ss'
          onChange={(date, dateString) => this.handleStartDate(date, dateString)}
          style={{marginRight: 15, width: 200}}
        />
        至
        <DatePicker
          format='YYYY-MM-DD HH:mm:ss'
          onChange={(date, dateString) => this.handleEndDate(date, dateString)}
          style={{margin: '0 15px', width: 200}}
        />
        近30天
      </div>
    );
  }
}

export default OrderTime;