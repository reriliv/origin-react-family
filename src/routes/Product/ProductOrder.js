import React, {Component} from 'react';
import { Button, Skeleton, Icon, Modal, Tabs, Input } from 'antd';
import ReriComponent from '../ReriComponent';
import style from './Product.css';
import TimeStampToDate from '../../utils/TimeStampToDate';

const ReriDrawer = ReriComponent.ReriDrawer;
const TabPane = Tabs.TabPane;

function mapSafeItem(list){
  let safeList = [];
  for(let key in list){
    safeList.push(list[key]);
  }
  return safeList;
}

class ProductOrder extends Component{

  constructor(props){
    super(props);
    this.state = {
      showMessage: false,
      customMessage: '',
      groupMessage: '',
      ticketMessage: '',
    };
  }

  showMessagePanel(){
    this.setState({
      showMessage: true
    });
  }

  handleSend(){
    console.log('发送');
  }

  handleCancel(){
    console.log('不发送');
    this.setState({
      showMessage: false
    });
  }

  callback(key) {
    console.log(key);
  }

  handleInputCustomMessage(e){
    console.log(e.target.value);
    this.setState({
      customMessage: e.target.value
    });
  }

  handleInputGroupMessage(e){
    console.log(e.target.value);
    this.setState({
      groupMessage: e.target.value
    });
  }

  handleInputTicketMessage(e){
    console.log(e.target.value);
    this.setState({
      ticketMessage: e.target.value
    });
  }

  render(){
    // console.log(this.props.orderInfo);
    if(this.props.orderInfo.order_pay !== undefined){
      // console.log(this.props.orderInfo, 'orderinfo');
      const [traveller, goodsType] = [this.props.orderInfo.traveller, this.props.orderInfo.goods_type];
      const orderInfo = this.props.orderInfo.order;
      const orderPayInfo = this.props.orderInfo.order_pay;
      // console.log(orderInfo.serial_num === null);
      return (
        <div style={{height: 'calc(100%-64px)', overflow: 'hidden'}}>
          <ReriDrawer
            Visible={this.props.Visible}
            title={'官网订单详情'}
            masked={true}
            maskClosable={true}
            onClose={this.props.onClose}
          >
            <div className={style['order-content']}>

              <div className={style['order-action-panel']}>
                <Button type='primary' onClick={() => this.showMessagePanel()}> 发送短信 </Button>
                <Button type='danger'> 关闭订单 </Button>
                <Button> 订单备注 </Button>
                <Button> 操作记录 </Button>
              </div>

              <div className={style['order-title']}>
                <Icon type="tag" theme="filled" />
                <span> 订单信息 </span>
              </div>

              <div className={style['order-list-content']}>
                <div className={style['order-list']}>
                  <div className={style['order-item']}>
                    <span style={{marginRight: 15}}> 产品名称： </span>
                    <span style={{marginRight: 15}}> {orderInfo.goods_name} </span>
                  </div>
                </div>

                <div className={style['order-list']}>
                  <div className={style['order-item']}>
                    <span style={{marginRight: 15}}> 订单类型： </span>
                    <span style={{marginRight: 15}}> {goodsType[orderInfo.goods_type]} </span>
                  </div>
                  <div className={style['order-item']} style={{width: 250}}>
                    <span style={{marginRight: 15}}> 出发时间： </span>
                    <span style={{marginRight: 15}}> {orderInfo.date_out} </span>
                  </div>
                </div>

                <div className={style['order-list']}>
                  <div className={style['order-item']}>
                    <span style={{marginRight: 15}}> 订单号： </span>
                    <span style={{marginRight: 15}}> {orderInfo.order_no} </span>
                  </div>
                  <div className={style['order-item']} style={{width: 250}}>
                    <span style={{marginRight: 15}}> 下单时间： </span>
                    <span style={{marginRight: 15}}> {TimeStampToDate(orderInfo.order_time)} </span>
                  </div>
                </div>

                <div className={style['order-list']}>
                  <div className={style['order-item']}>
                    <span style={{marginRight: 15}}> 订单金额： </span>
                    <span style={{marginRight: 15, color: '#ef4351', fontWeight: 'bold'}}> ￥{orderInfo.order_price} </span>
                    <span style={{marginRight: 15}}> (优惠￥{orderInfo.promote_amount}) </span>
                  </div>
                  <div className={style['order-item']} style={{width: 250}}>
                    <span style={{marginRight: 15}}> 付款状态： </span>
                    <span style={{marginRight: 15, color: '#7aa209'}}> {
                      orderInfo.pay_state === 0 ?
                      '未付款'
                      :
                      orderInfo.pay_state === 1 ?
                      '未付清'
                      :
                      orderInfo.pay_state === 2 ?
                      '已付'
                      :
                      '未过审'
                    } </span>
                  </div>
                </div>

                {
                  !orderInfo.serial_num === null ?
                  <div className={style['order-list']}>
                    <div className={style['order-item']}>
                      <span style={{marginRight: 15}}> 流水帐号： </span>
                      <span style={{marginRight: 15}}> {orderInfo.serial_num} </span>
                    </div>
                    <div className={style['order-item']}>
                      <span style={{marginRight: 15}}> 付款方式： </span>
                      <span style={{marginRight: 15}}> (金额：0) </span>
                    </div>
                  </div>
                  : ''
                }

                <div className={style['order-list']}>
                  <div className={style['order-item']} style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
                    <span style={{marginRight: 15}}> 费用公式： </span>
                    <span style={{marginRight: 15}}>
                      <div>
                        <span style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 15}}>{orderInfo.formula}</span>
                        <span style={{display: 'inline-block', verticalAlign: 'middle'}}>(团费 + 小费 + 接送费 + 外宾费 + 门票差 + 附加产品费 + 其它加收 + 房差 + 业务损失 + 违约金 - 优惠)</span>
                      </div>
                    </span>
                  </div>
                </div>

                <div className={style['order-list']}>
                  <div className={style['order-item']}>
                    <span style={{marginRight: 15}}> 旅客备注： </span>
                    <span style={{marginRight: 15}}> {orderInfo.customer_remark} </span>
                  </div>
                </div>
              </div>

              <div className={style['order-title']}>
                <Icon type="tag" theme="filled" />
                <span> 联系人信息 </span> 
              </div>

              <div className={style['order-list-content']}>
                <div className={style['order-list']} style={{justifyContent: 'flex-start'}}>
                  <div className={style['order-item']}>
                    <span style={{marginRight: 15}}> 联系人： </span>
                    <span style={{marginRight: 15}}> {orderInfo.contact_name} </span>
                  </div>
                  <div className={style['order-item']}>
                    <span style={{marginRight: 15}}> 手机号码： </span>
                    <span style={{marginRight: 15}}> {orderInfo.contact_mobile} </span>
                  </div>
                </div>
              </div>

              <div className={style['order-title']}>
                <Icon type="tag" theme="filled" />
                <span> 旅客信息 </span> 
              </div>

              <div className={style['order-list-content']}>

                <table style={{margin: '25px 0 30px', width: '100%'}}>
                  <thead>
                    <tr>
                      <th style={{paddingTop: 5, paddingBottom: 5}}> 旅客姓名 </th>
                      <th style={{paddingTop: 5, paddingBottom: 5}}> 电话号码 </th>
                      <th style={{paddingTop: 5, paddingBottom: 5}}> 证件类型 </th>
                      <th style={{paddingTop: 5, paddingBottom: 5}}> 证件号 </th>
                      <th style={{paddingTop: 5, paddingBottom: 5}}> 性别 </th>
                      <th style={{paddingTop: 5, paddingBottom: 5}}> 类型 </th>
                      <th style={{paddingTop: 5, paddingBottom: 5}}> 保险 </th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    traveller.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td style={{paddingTop: 5, paddingBottom: 5}}> {item.tra_name} </td>
                          <td style={{paddingTop: 5, paddingBottom: 5}}> {item.tra_mobile} </td>
                          <td style={{paddingTop: 5, paddingBottom: 5}}> {
                            item.document_type === 0?
                            '-'
                            :
                            item.document_type === 1?
                            '身份证'
                            :
                            item.document_type === 2?
                            '护照'
                            :
                            item.document_type === 3?
                            '台胞证'
                            :
                            item.document_type === 4?
                            '港澳通行证'
                            :
                            item.document_type === 5?
                            '台湾通行证'
                            :
                            item.document_type === 6?
                            '入台证'
                            :
                            item.document_type === 7?
                            '回乡证'
                            :
                            item.document_type === 8?
                            '军官证'
                            :
                            item.document_type === 9?
                            '户口本'
                            :
                            item.document_type === 10?
                            '警官证'
                            :
                            item.document_type === 11?
                            '驾驶证'
                            :
                            item.document_type === 12?
                            '海员证'
                            :
                            item.document_type === 13?
                            '外国人在中国永久居留证'
                            :
                            item.document_type === 14?
                            '学生证'
                            :
                            ''
                          } </td>
                          <td style={{paddingTop: 5, paddingBottom: 5}}> {item.document_number} </td>
                          <td style={{paddingTop: 5, paddingBottom: 5}}> {item.gender === 0 ? '男' : '女'} </td>
                          <td style={{paddingTop: 5, paddingBottom: 5}}> {
                            item.man_type === 1 ?
                            '成人'
                            :
                            item.man_type === 2 ?
                            '婴儿'
                            :
                            item.man_type === 3 ?
                            '儿童'
                            :
                            '长者'
                          } </td>
                          <td style={{paddingTop: 5, paddingBottom: 5}}>
                          {
                            // Object.keys(item.goods_added)
                            mapSafeItem(item.goods_added).map((safeItem, safeKey) => {
                              return(
                                <div key={safeKey}>{safeItem.t_goods_name} ￥ {safeItem.t_goods_price} * 1</div>
                              );
                            })
                          }
                          </td>
                        </tr>
                        
                      );
                    })
                  }
                  </tbody>
                </table>

              </div>

              <div className={style['order-title']}>
                <Icon type="tag" theme="filled" />
                <span> 销售备注信息 </span>
              </div>

              <div className={style['order-list-content']}>
                <div style={{padding: '15px 45px'}}>{'信息'}</div>
              </div>

              <div className={style['order-title']}>
                <Icon type="tag" theme="filled" />
                <span> 付款记录 </span>
              </div>

              <table style={{marginTop: 15, width: '100%'}}>
                <thead>
                  <tr>
                    <th style={{padding: 14, textAlign: 'left', background: '#f2f2f2', borderColor: '#e6e6e6', fontSize: 14, color: '#4c4c4c',}}> 支付时间 </th>
                    <th style={{padding: 14, textAlign: 'left', background: '#f2f2f2', borderColor: '#e6e6e6', fontSize: 14, color: '#4c4c4c',}}> 支付金额 </th>
                    <th style={{padding: 14, textAlign: 'left', background: '#f2f2f2', borderColor: '#e6e6e6', fontSize: 14, color: '#4c4c4c',}}> 支付方式 </th>
                    <th style={{padding: 14, textAlign: 'left', background: '#f2f2f2', borderColor: '#e6e6e6', fontSize: 14, color: '#4c4c4c',}}> 流水账号 </th>
                  </tr>
                </thead>
                <tbody>
                {
                  orderPayInfo.map((item, key) => (
                    <tr key={key}>
                      <td style={{padding: 14, textAlign: 'left', background: '#f2f2f2', borderColor: '#e6e6e6', fontSize: 14, color: '#4c4c4c',}}> {item} </td>
                      <td style={{padding: 14, textAlign: 'left', background: '#f2f2f2', borderColor: '#e6e6e6', fontSize: 14, color: '#4c4c4c',}}> {item} </td>
                      <td style={{padding: 14, textAlign: 'left', background: '#f2f2f2', borderColor: '#e6e6e6', fontSize: 14, color: '#4c4c4c',}}> {item} </td>
                      <td style={{padding: 14, textAlign: 'left', background: '#f2f2f2', borderColor: '#e6e6e6', fontSize: 14, color: '#4c4c4c',}}> {item} </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>

            </div>
            <Modal
              title="发送短信"
              visible={this.state.showMessage}
              onOk={() => this.handleSend()}
              onCancel={() => this.handleCancel()}
            >
              <div className={style['message-contact-info']}>
                <div>
                  <span> 联系人： </span>
                  <span> {orderInfo.contact_name} </span>
                </div>
                <div>
                  <span> 手机号码： </span>
                  <span> {orderInfo.contact_mobile} </span>
                </div>
              </div>
              <div className={style['message-content']}>
                <Tabs defaultActiveKey="1" onChange={e => this.callback(e)}>
                  <TabPane tab="Tab 1" key="1">
                    <Input
                      onChange={e => this.handleInputCustomMessage(e)}
                      placeholder='请输入自定义内容'
                      className={style['message-text']}
                      value={this.state.customMessage}
                    />
                  </TabPane>
                  <TabPane tab="Tab 2" key="2">
                    <Input
                      onChange={e => this.handleInputGroupMessage(e)}
                      placeholder='请输入出团内容'
                      className={style['message-text']}
                      value={this.state.customMessage}
                    />
                  </TabPane>
                  <TabPane tab="Tab 3" key="3">
                    <Input
                      onChange={e => this.handleInputTicketMessage(e)}
                      placeholder='请输入出票内容'
                      className={style['message-text']}
                      value={this.state.customMessage}
                    />
                  </TabPane>
                </Tabs>
              </div>
            </Modal>
          </ReriDrawer>
        </div>
      );
    } else {
      return (
        <div style={{height: 'calc(100%-64px)', overflow: 'hidden'}}>
          <ReriDrawer
            Visible={this.props.Visible}
            title={'官网订单详情'}
            masked={true}
            maskClosable={true}
            onClose={this.props.onClose}
          >
            <div>
              <Skeleton active={true} paragraph={{rows: 4}} />
              <Skeleton active={true} paragraph={{rows: 2}} />
              <Skeleton active={true} paragraph={{rows: 3}} />
              <Skeleton active={true} paragraph={{rows: 4}} />
            </div>
          </ReriDrawer>
        </div>
      );
    }
  }
}

export default ProductOrder;