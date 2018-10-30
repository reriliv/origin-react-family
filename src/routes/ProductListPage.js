import React from 'react';
import {connect} from 'dva';
import ProductList from './Product/ProductList';
// import Page from './Page';

const ProductListPage = ({dispatch, productList, productInfo, orderInfo, controlBar, filter}) => {
  // console.log(productList, '产品列表');
  return (
    <ProductList
      dispatch={dispatch}
      productList={productList}
      productInfo={productInfo}
      orderInfo={orderInfo}
      controlBar={controlBar}
      filter={filter}
    />
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    productList: state.product.productList,
    productInfo: state.product.productInfo,
    orderInfo: state.product.orderInfo,
    controlBar: state.product.controlBar,
    filter: state.product.filter,
  };
};

export default connect(mapStateToProps)(ProductListPage);
