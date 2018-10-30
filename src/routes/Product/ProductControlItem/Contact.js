import React, {Component} from 'react';
import style from './item.css';
import {Mention} from 'antd';
const { toString } = Mention;

class Contact extends Component{

  handleSelect(value){
    console.log(value, '选择');
    // console.log(this.props.filter);
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {contact_name: value}
    );
    /*this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          contact_name: value
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
      {contact_name: value}
    );
  }

  render(){
    return (
      <div className={style['product-control-item']}>
        <span className={style['product-control-name']}> 联系人: </span>
        <Mention
          style={{width: 120}}
          placeholder='请输入联系人'
          suggestions={this.props.UserNameList}
          onSelect={value => this.handleSelect(value)}
          onChange={value => this.handleChange(toString(value))}
          prefix=''
        />
      </div>
    );
  }
}

export default Contact;