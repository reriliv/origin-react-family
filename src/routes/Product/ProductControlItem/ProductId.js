import React, {Component} from 'react';
import style from './item.css';
import {Mention} from 'antd';
const { toString } = Mention;

class ProductId extends Component{

  handleSelect(value){
    console.log(value, '选择');
    /*console.log(this.props.filter);
    this.props.dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...this.props.filter,
          goods_id: value
        }
      }
    });*/
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {goods_id: value}
    );
  }

  handleChange(value){
    // console.log(value, '选择');
    // console.log(this.props.filter);
    this.props.onClick(
      this.props.dispatch,
      this.props.filter,
      {goods_id: value}
    );
  }

  render(){
    return (
      <div className={style['product-control-item']}>
        <span className={style['product-control-name']}> 产品ID: </span>
        <Mention
          style={{width: 120}}
          placeholder='请输入订单号'
          suggestions={this.props.ProductIdList}
          onChange={(value) => this.handleChange(toString(value))}
          onSelect={(value) => this.handleSelect(value)}
          prefix=''
        />
      </div>
    );
  }
}

export default ProductId;