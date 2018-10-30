import React, {Component} from 'react';
import { Button, /*Input,*/ Icon, } from 'antd';
import style from './Product.css';
import Request from '../../utils/request';
import ProductControlList from './ProductControlItem';

// const { toString } = Mention;
// const { RangePicker } = DatePicker;

const hasValue = (list, value) => {
  // console.log(list);
  for(let item of list){
    // console.log(item);
    if(item === value){
      return true;
    }
  }
  return false;
};

const mapListToOrderNumber = (list) => {
  const arr = [];
  for(let item of list){
    if(!hasValue(arr, item.order_no)){
      arr.push(item.order_no);
    }
  }
  return arr;
};

const mapListToUserName = (list) => {
  const arr = [];
  for(let item of list){
    if(!hasValue(arr, item.contact_name)){
      arr.push(item.contact_name);
    }
  }
  return arr;
};

const mapListToUserPhone = (list) => {
  const arr = [];
  for(let item of list){
    if(!hasValue(arr, item.contact_mobile)){
      arr.push(item.contact_mobile);
    }
  }
  return arr;
};

const mapListToProductId = (list) => {
  const arr = [];
  for(let item of list){
    if(!hasValue(arr, JSON.stringify(item.goods_id))){
      arr.push(JSON.stringify(item.goods_id));
    }
  }
  return arr;
};

const mapListToProductName = (list) => {
  // console.log(list);
  const arr = [];
  for(let item of list){
    if(!hasValue(arr, item.goods_name)){
      arr.push(item.goods_name);
    }
  }
  return arr;
};

class ProductControlPanel extends Component{

  constructor(props){
    super(props);
    this.state = {
      showAllControlItem: false,
    };
  }

  UNSAFE_componentWillMount(){
    const _this = this;
    const PATH = '/api/order/orderCondition';
    const token = sessionStorage.getItem('token');
    const request = new Request();
    console.log(request);
    console.log(URL, '组件即将渲染');
    request.setPATH(PATH);
    request.setOPTIONS('POST', token, JSON.stringify({}));
    request.fetch()
    .then(res => {
      console.info(res.data.data);
      _this.props.dispatch({
        type: 'product/updateControlBar',
        payload: {
          controlBar: res.data.data
        }
      })
    })
    .catch(err => {
      console.error(err);
    });
  }

  /*handleChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }*/

  /*handleOk(value) {
    console.log('onOk: ', value);
  }*/

  handleFilter(){
    const _this = this;
    console.log('筛选');
    console.log(this.props.filter);
    const PATH = '/api/order/lists';
    const token = sessionStorage.getItem('token');
    const request = new Request();
    // console.log(request, 27);
    request.setPATH(PATH);
    request.setOPTIONS('POST', token, JSON.stringify(this.props.filter));
    request.fetch()
    .then(res => {
      console.info(res.data.code === 200);
      if(res.data.code === 200){
        /*_this.setState({
          list: res.data.data.data
        });*/
        console.log('筛选更新');
        _this.props.dispatch({
          type: 'product/updateProductList',
          payload: {
            productList: res.data.data.data,
            orderInfo: res.data.data.countResult,
            productInfo: {
              currentPage: res.data.data.page,
              pageTotal: res.data.data.pageTotal,
              totalSize: res.data.data.total,
              pageSize: res.data.data.page_num
            },
          }
        })
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  handleShowAllControlsItem(){
    console.log(this.state.showAllControlItem);
    this.setState({
      showAllControlItem: !this.state.showAllControlItem
    });
  }

  render(){
    const { controlBar } = this.props;
    if(controlBar.length === 0){
      return (
        <div>控制栏</div>
      )
    } else {
      const [
        OrderNumberList,
        UserNameList,
        UserPhoneList,
        ProductIdList,
        ProductNameList,
      ] = [
        mapListToOrderNumber(this.props.productList),
        mapListToUserName(this.props.productList),
        mapListToUserPhone(this.props.productList),
        mapListToProductId(this.props.productList),
        mapListToProductName(this.props.productList),
      ]
      // console.log(controlBar.pay_state[0]);
      // console.log(OrderNumberList, 'list');
      return (
        <div className={style['product-control-panel']}>

          <ProductControlList
            controlBar={this.props.controlBar}
            orderNumberList={OrderNumberList}
            userNameList={UserNameList}
            userPhoneList={UserPhoneList}
            productIdList={ProductIdList}
            productNameList={ProductNameList}
            isShow={this.state.showAllControlItem}
            dispatch={this.props.dispatch}
            filter={this.props.filter}
            /*className={
              !this.state.showAllControlItem ? `${style['control-panel']}` : `${style['control-panel']} ${style['show-control-panel']}`
            }*/
          />

          <div className={style['product-control-action']}>
            <Button type='primary' onClick={() => this.handleFilter()}> 确定 </Button>
            <Button type='danger'> 重置 </Button>
            <Button onClick={() => this.handleShowAllControlsItem()}>
            {
              this.state.showAllControlItem ? <Icon type="up" theme="outlined" /> : <Icon type="down" theme="outlined" />
            }
            </Button>
          </div>

        </div>
      );
    }
  }
}

export default ProductControlPanel;