import React, {Component} from 'react';
import style from './item.css';
import OrderNumber from './OrderNumber';
// import OrderFrom from './OrderFrom';
import OrderTime from './OrderTime';
import OrderType from './OrderType';
import PayTime from './PayTime';
import ProductId from './ProductId';
import ProductName from './ProductName';
// import ProductType from './ProductType';
import Contact from './Contact';
import ContactNumber from './ContactNumber';

class ProductControlList extends Component{

  handleUpdateFilter(dispatch, filter, newFilter) {
    // console.log(this.props);
    dispatch({
      type: 'product/updatefilter',
      payload: {
        filter: {
          ...filter,
          ...newFilter
        }
      }
    });
  }

  render(){

    // console.log(this.props);
    const { controlBar } = this.props;

    return (
      <div
        className={`${style['product-control-list']} ${this.props.className}`}
        style={{height: this.props.isShow ? 'auto': ''}}
      >

        <OrderType PayState={controlBar.pay_state} dispatch={this.props.dispatch} filter={this.props.filter} onClick={this.handleUpdateFilter} />
        <OrderNumber orderNumberList={this.props.orderNumberList} dispatch={this.props.dispatch} filter={this.props.filter} onClick={this.handleUpdateFilter} />
        <Contact UserNameList={this.props.userNameList} dispatch={this.props.dispatch} filter={this.props.filter} onClick={this.handleUpdateFilter} />
        <ContactNumber UserPhoneList={this.props.userPhoneList} dispatch={this.props.dispatch} filter={this.props.filter} onClick={this.handleUpdateFilter} />
        <PayTime dispatch={this.props.dispatch} filter={this.props.filter} onClick={this.handleUpdateFilter} />
        <OrderTime dispatch={this.props.dispatch} filter={this.props.filter} onClick={this.handleUpdateFilter} />
        <ProductId ProductIdList={this.props.productIdList} dispatch={this.props.dispatch} filter={this.props.filter} onClick={this.handleUpdateFilter} />
        <ProductName ProductNameList={this.props.productNameList} dispatch={this.props.dispatch} filter={this.props.filter} onClick={this.handleUpdateFilter} />
        {/*<ProductType GoodsType={controlBar.goods_type}  dispatch={this.props.dispatch} filter={this.props.filter} onClick={this.handleUpdateFilter} />
        <OrderFrom OrderSource={controlBar.order_source} dispatch={this.props.dispatch} filter={this.props.filter} onClick={this.handleUpdateFilter} />*/}

        {/*<div className={style['product-control-item']}>
          <span className={style['product-control-name']}> 业务跟进人: </span>
          <Select dropdownMatchSelectWidth={true} style={{width: 100, textAlign: 'center'}} defaultValue='all'>
            <Option value='all'> 所有 </Option>
          </Select>
        </div>*/}

      </div>
    );
  }
}

export default ProductControlList;