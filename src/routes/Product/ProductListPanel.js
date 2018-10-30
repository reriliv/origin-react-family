import React, {Component} from 'react';
import { Button, Pagination, Spin, } from 'antd';
import ProductOrder from './ProductOrder';
import TimeStampToDate from '../../utils/TimeStampToDate';
import Request from '../../utils/request';
import style from './Product.css';

/*const setProductList = (list) => {
  const arr = [];
  for(let index = 0; index < list.length; index++){
    if(index >= 10) break;
    arr[index] = list[index];
  }
  return arr;
}*/

class ProductListPanel extends Component{

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      loading: false
      // orderInfo: [],
      /*list: [
        {},
      ]*/
    }
  }

  handleUpdateProductList(page, page_num){
    this.setState({
      loading: true
    });
    let _this = this;
    const PATH = '/api/order/lists';
    const token = sessionStorage.getItem('token');
    const body = {
      page: page || 1,
      page_num: page_num || 10
    };
    const request = new Request();
    request.setPATH(PATH);
    request.setOPTIONS('POST', token, JSON.stringify(body));
    request.fetch()
    .then(res => {
      console.info(res.data);
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
      });
      setTimeout(function(){
        _this.setState({
          loading: false
        });
      }, 500);
    })
    .catch(err => {
      console.error(err);
    });
  }

  componentDidMount(){
    console.log('已渲染组件');
    this.handleUpdateProductList();
  }

  showDrawer(e){
    const orderId = e.target.dataset.orderid;
    const request = new Request();
    const PATH = '/api/order/orderDetail';
    const token = sessionStorage.getItem('token');
    request.setPATH(PATH);
    request.setOPTIONS('POST', token, JSON.stringify({order_id: orderId}));
    const _this = this;
    this.setState({
      visible: true
    });
    request.fetch()
    .then(res => {
      console.log(res.data.data);
      _this.props.dispatch({
        type: 'product/updateOrderInfo',
        payload: {
          orderInfo: res.data.data
        }
      });
    })
    .catch(err => console.error(err));
  };

  onClose() {
    this.setState({
      visible: false
    });
  };

  handleChangePage(page, pageSize){
    console.log(page);
    console.log(pageSize);
    console.log('onChange');
  }

  handleChangePageSize(current, size){
    console.log(current);
    console.log(size);
    console.log('onChangeSize');
    this.handleUpdateProductList(current, size);
  }

  componentDidUpdate(){
    console.log('已更新组件');
  }

  render(){
    console.log(this.props.productList);
    return (
      this.state.loading ?
        <Spin spinning={this.state.loading} delay={500}/>
        :
        <div style={{width: '100%'}}>

          <table style={{width: '100%', minWidth: 1200}}>
            <thead style={{width: '100%', borderBottom: '1px solid #ddd'}}>
              <tr style={{width: '100%', background: '#f2f2f2'}}>
                {
                  this.props.listHeader.map((name, key) => {
                    return (
                      <th key={key}>{name}</th>
                    );
                  })
                }
                {/*<th key={key}>支付时间/下订时间</th>
                <th>产品名称</th>
                <th>订单金额</th>
                <th>大|小|长|婴|车位</th>
                <th>联系人/电话</th>
                <th>订单状态</th>
                <th>操作人</th>
                <th>业务跟进</th>
                <th>个人店</th>
                <th>操作</th>*/}
              </tr>
            </thead>
            <tbody style={{width: '100%'}}>
            {
              this.props.productList.map((item, key) => {
                return (
                  <tr style={{width: '100%'}} key={key}>
                    <td>{key+1}</td>
                    <td>
                      <div className={style['product-item-name']} style={{maxWidth: window.innerWidth*.3, maxHeight: 60}}>{item.goods_name}</div>
                      <br/>
                      <div style={{display: 'inline-block', maxWidth: window.innerWidth*.3}}>系统编号: {item.goods_id}</div>
                    </td>
                    <td>
                      <div>{item.order_no}</div>
                      <div>{item.contact_name}</div>
                      <div>{item.contact_mobile}</div>
                    </td>
                    <td>
                      <div>订单: {item.order_price}</div>
                      <div>付款: {
                        item.pay_state === 0 ? '0.00' : '无，待修改'
                      }</div>
                    </td>
                    <td>{item.adult_num}|{item.child_num}|{item.elderly_num}|{item.baby_num}</td>
                    <td>
                      <div>下单: {item.order_time ? TimeStampToDate(item.order_time) : '0000-00-00 00:00:00'}</div>
                      <div>支付: {item.pay_time ? TimeStampToDate(item.pay_time) : '0000-00-00 00:00:00'}</div>
                      <div>出发: {item.date_out}</div>
                    </td>
                    <td>
                      <div>【{
                        item.order_source === 1 ? 'PC'
                        :
                        item.order_source === 2 ? 'Mobile'
                        :
                        item.order_source === 3 ? '微信'
                        :
                        item.order_source === 4 ? 'android'
                        :
                        item.order_source === 5 ? 'ios'
                        :
                        item.order_source === 11 ? '金马微店'
                        :
                        item.order_source === 7 ? '小程序'
                        : ''
                      }】</div>
                    </td>
                    <td>
                      {
                        item.order_state === 0 ?
                        <span style={{color: "red"}}>未付款</span>
                        :
                        item.order_state === 1 ?
                        <span style={{color: "#333"}}>待付款</span>
                        :
                        item.order_state === 2 ?
                        <span style={{color: "#333"}}>已取消</span>
                        :
                        item.order_state === 3 ?
                        <span style={{color: '#333'}}>已出票</span>
                        :
                        item.order_state === 4 ?
                        <span style={{color: "red"}}>出票失败</span>
                        :
                        item.order_state === 5 ?
                        <span style={{color: "#333"}}>退款审批中</span>
                        :
                        item.order_state === 6 ?
                        <span style={{color: "#333"}}>已退款</span>
                        :
                        <span style={{color: "red"}}>拒绝退款</span>
                      }
                    </td>
                    {/*<td>{item.web_locked_id !== 0 ? item.web_locked_id : '-'}</td>*/}
                    <td>
                      <div id={item.order_id}>{item.kf_people ? item.kf_people : '未分配'}</div>
                      <Button>重新分配</Button>
                    </td>
                    {/*<td>{item.other_attr ? item.other_attr : '-'}</td>*/}
                    <td><Button onClick={e => this.showDrawer(e)} data-orderid={item.order_id}>查看</Button></td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>

          <div style={{marginTop: 15, textAlign: 'left'}}>
            <Pagination
              showSizeChanger
              defaultCurrent={1}
              total={this.props.productInfo.totalSize}
              pageSizeOptions={['10', '15', '20', '30']}
              onChange={(page, pageSize) => this.handleChangePage(page, pageSize)}
              onShowSizeChange={(current, size) => this.handleChangePageSize(current, size)}
            />

          </div>

          <ProductOrder
            Visible={this.state.visible}
            onClose={() => this.onClose()}
            orderInfo={this.props.orderInfo}
          />

        </div>
    )
  }
}

export default ProductListPanel;