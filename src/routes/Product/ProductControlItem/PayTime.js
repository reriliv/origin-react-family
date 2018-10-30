import React, {Component} from 'react';
import style from './item.css';
import {DatePicker} from 'antd';

const {RangePicker} = DatePicker;

class PayTime extends Component{

  handleStartDate(date, dateString){
    console.log(date, dateString, '开始时间');
    // pay_time_1
    /*this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          pay_time_1: dateString
        }
      }
    });*/
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {pay_time_1: dateString}
    );
  }

  handleEndDate(date, dateString){
    console.log(date, dateString, '结束时间');
    // pay_time_2
    /*this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          pay_time_2: dateString
        }
      }
    });*/
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {pay_time_2: dateString}
    );
  }

  render(){
    return (
      <div className={style['product-control-item']}>
        <span className={style['product-control-name']}> 支付时间: </span>
        <RangePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['开始时间', '结束时间']}
          onChange={this.handleChange}
          onOk={this.handleOk}
        />
        {/*<DatePicker
          format='YYYY-MM-DD HH:mm:ss'
          onChange={(date, dateString) => this.handleStartDate(date, dateString)}
          style={{marginRight: 15, width: 200}}
        />
        至
        <DatePicker
          format='YYYY-MM-DD HH:mm:ss'
          onChange={(date, dateString) => this.handleEndDate(date, dateString)}
          style={{marginLeft: 15, width: 200}}
        />*/}
      </div>
    );
  }
}

export default PayTime;