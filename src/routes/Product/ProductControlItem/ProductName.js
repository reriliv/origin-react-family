import React, {Component} from 'react';
import style from './item.css';
import {Mention} from 'antd';
const { toString } = Mention;

class ProductName extends Component{

  handleSelect(value){
    console.log(value, '选择');
    /*console.log(this.props.filter);
    this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          goods_name: value
        }
      }
    });*/
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {goods_name: value}
    );
  }

  handleChange(value){
    // console.log(value, '选择');
    // console.log(this.props.filter);
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {goods_name: value}
    );
  }

  render(){
    return (
      <div className={style['product-control-item']}>
        <span className={style['product-control-name']}> 产品名称: </span>
        <Mention
          style={{width: 130}}
          placeholder='请输入产品名称'
          suggestions={this.props.ProductNameList}
          onChange={(value) => this.handleChange(toString(value))}
          onSelect={(value) => this.handleSelect(value)}
          prefix=''
        />
      </div>
    );
  }
}

export default ProductName;