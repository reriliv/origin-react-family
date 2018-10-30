import React, {Component} from 'react';
import { Button } from 'antd';
import ProductControlPanel from './ProductControlPanel';
import ProductListPanel from './ProductListPanel';
import style from './Product.css';

class ProductList extends Component{
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      returnApply: 0,
      /*totalPay: 396803.00,
      finishPay: 0,
      adult: 0,
      child: 0,
      long: 0,
      baby: 0*/
    }
  }

  exportExcelAction(){
    console.log('导出Excel');
    const URL = 'http://tpl.jm-test.cn/api/order/orderExcel';
    const filter = this.props.filter;
    console.log(filter, '参数');
    const keyList = [];
    let params = '';
    for(let key in filter){
      keyList.push(key);
    }
    console.log(keyList);
    if (keyList.length > 0) {
      for(let key of keyList){
        if(params.length === 0){
          params += `${key}=${filter[key].toString().replace(/\s+/g,"")}`;
        } else {
          params += `&${key}=${filter[key].toString().replace(/\s+/g,"")}`;
        }
      }
      // window.open(`${URL}?${params}`);
      this.refs.download.src = `${URL}?${params}`;
    } else {
      // window.open(URL);
      this.refs.download.src = URL;
    }
    console.log(params);
  }

  render(){
    return (
      <div style={{width: '100%', height: '100%', overflow: 'auto'}}>
        <h4 style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center', fontSize: 18}}>
          <div>官网订单列表 (火车票退票申请: {this.state.returnApply} 张)</div>
          <div>
            <Button type='primary' onClick={() => this.exportExcelAction()}> 导出Excel </Button>
            <iframe src="" ref='download' style={{display: 'none'}} title='download'></iframe>
          </div>
        </h4>
        <ProductControlPanel
          // showAllControlItem={this.state.showAllControlItem}
          dispatch={this.props.dispatch}
          controlBar={this.props.controlBar}
          productList={this.props.productList}
          filter={this.props.filter}
        />
        <div className={style['product-info-content']}>
          <span>当前订单总金额：</span>
          <div className={style['product-info-item']}>{this.props.orderInfo.all_price}</div>
          <span>当前已支付总金额：</span>
          <div className={style['product-info-item']}>{this.props.orderInfo.order_pay_price}</div>
          <span>已付款人数：</span>
          <span>大</span>
          <div className={style['product-info-item']}>{this.props.orderInfo.adult_num}</div>
          <span>小</span>
          <div className={style['product-info-item']}>{this.props.orderInfo.child_num}</div>
          <span>长</span>
          <div className={style['product-info-item']}>{this.props.orderInfo.elderly_num}</div>
          <span>婴</span>
          <div className={style['product-info-item']}>{this.props.orderInfo.baby_num}</div>
        </div>
        <ProductListPanel
          listHeader={['序号', '产品名称', '订单信息', '订单金额', '大|小|长|婴', '下订/付款时间', '收客来源', '订单状态', '业务跟进', '操作']}
          dispatch={this.props.dispatch}
          productList={this.props.productList}
          productInfo={this.props.productInfo}
          orderInfo={this.props.orderInfo}
        />
      </div>
    );
  }
}

export default ProductList;