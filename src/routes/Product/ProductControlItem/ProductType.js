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

class ProductType extends Component{

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

  render(){
    return (
      <div className={style['product-control-item']}>
        <span className={style['product-control-name']}> 产品类型: </span>
        <Select
          onChange={value => this.handleSelect(value)}
          dropdownMatchSelectWidth={true}
          style={{width: 100, textAlign: 'center'}}
          defaultValue={0}
        >
          <Option value={0} key={0}> 所有 </Option>
          {
            mapListKey(this.props.GoodsType).map((key, index) => {
              return (
                <Option value={key} key={index}> {this.props.GoodsType[key]} </Option>
              )
            })
          }
        </Select>
      </div>
    );
  }
}

export default ProductType;