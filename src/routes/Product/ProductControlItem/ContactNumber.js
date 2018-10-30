import React, {Component} from 'react';
import style from './item.css';
import {Mention} from 'antd';
const { toString } = Mention;

class ContactNumber extends Component{

  handleSelect(value){
    console.log(value, '选择');
    // console.log(this.props.filter);
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {contact_mobile: value}
    );
    /*this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          contact_mobile: value
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
      {contact_mobile: value}
    );
  }

  render(){
    return (
      <div className={style['product-control-item']}>
        <span className={style['product-control-name']}> 联系电话: </span>
        <Mention
          style={{width: 135}}
          placeholder='请输入联系电话'
          suggestions={this.props.UserPhoneList}
          onChange={(value) => this.handleChange(toString(value))}
          onSelect={(e) => this.handleSelect(e)}
          prefix=''
        />
      </div>
    );
  }
}

export default ContactNumber;