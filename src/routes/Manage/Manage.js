import React,{Component} from 'react';
import style from './Manage.css';
import {Button, Table,Row, Input, Modal, Form, message, Radio, Select} from 'antd';
import Request from '../../utils/request';
// import setListKey from '../../utils/setListKey';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const ButtonGroup = Button.Group;

//选择表格中的一行
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    sessionStorage.setItem('rowKeys',selectedRowKeys)
  }
};

class ManageList extends Component{

  constructor(props){
    super(props);
    this.state = {
        manageList: [],
        visible: false,
        userVisible: false,
        disableUserVisible: false,
        inUsegroup: [],
        formLayout: 'hrizontal',
        columns:[
        {
          title: '用户ID',
          dataIndex: 'admin_id',
          key: 'id',
        },
        {
          title: '用户名',
          dataIndex: 'user_name',
          key: 'user_name',
        },
        {
           title: '添加时间',
           dataIndex: 'add_time',
           key: 'add_time',
           render: (e) =>{
                return(new Date(e * 1000).toLocaleString())
           }
        },
        {
           title: '状态',
           dataIndex: 'status',
           key: 'status',
           render: (e) => {
              if(e === 1){
                  return('启用')
              }else{
                  return('禁用')
              }
           }
        },
        {
          title: '操作',
          dataIndex: '',
          key: '',
          render:() => {
            return (
              <div>
                <Button className={style['edit']} type="primary" onClick={() => this.handleEditModal()}>编辑</Button>
                <Button className={style['off']} onClick={() => this.handelDisableUser()}>禁用</Button>
                <Button className={style['reset']} onClick={() => this.handleResetModel()}>重置密码</Button>
              </div>
            );
          }
        }
      ],
      total: '',
      pagesize: '',
      current: '',
      disableUserMsg: '禁用该用户吗？请谨慎操作'
    }
 }

 componentDidMount(){
            const PATH = "api/manager/lists";
            const request = new Request();
            const token = sessionStorage.getItem('token');
            request.setPATH(PATH);
            request.setOPTIONS('POST', token, JSON.stringify({}));
            request.fetch()
            .then(res => {
                if(res.data.code === 200){
                      this.setState({
                        manageList:res.data.data.data,
                        total: res.data.data.total,
                        pagesize: res.data.data.page_num,
                        current: res.data.data.page,
                    })
                       console.log(res.data)
                }else if(res.data.code === 401){
                  message.warning(res.data.info)
                    window.location.href = '/login'
                }
            })
            .catch(err => {
                console.error(err)
            })
  }


  // 添加管理员
  showModal(){
    this.setState({
      visible: !this.state.visible,
    })
  }

  //添加管理员弹层(确定)
 handleOk (e){
    const PATH = "api/manager/add";
    const request = new Request();
    const token = sessionStorage.getItem('token');
    request.setPATH(PATH);
    request.setOPTIONS('POST', token, JSON.stringify({
      user_name: this.state.username,
      status: this.state.status,
    }));
    request.fetch()
    .then(res => {
        console.info(res)
        if(res.data.code === 200){
          message.info(res.data.message);
          const addtime = new Date();
          const manageList = this.state.manageList;
          const total = this.state.total;
          // const columns = this.state.columns;
          const newdata = [{
            admin_id: res.data.data.admin_id,
            user_name: this.state.username,
            add_time: addtime,
            status: this.state.status,
            channel_id:'',
            last_ip:'',
            last_login:'',
            mobile: '',
            sort_order: ''
          }]
          this.setState({
                visible: false,
                manageList: [...manageList,newdata],
                total: total+1,
            })

        }else if(res.data.code === 401){
          message.warning(res.data.info);
          window.location.href = '/login';
        } else {
          message.warning(res.data.info);
        }
    })
    .catch(err => {
        console.error(err);
    })
  }

  // 添加管理员弹层(用户名输入)
  handleUserName(e){
    // console.log(e.target.value);
    const value = e.target.value;
    this.setState({
      username: value
    })
  }

  // 添加管理员弹层(角色选择)
  handleSelect(e){
    this.setState({
      role_id: e
    })
   // console.log(e)
  }

 // 添加管理员弹层(禁用/启用)
  handleRadio(e){
    const value = e.target.value;
    this.setState({
        status: value
    })
    console.log(value)
  }

  handleRealName(e){
    const value = e.target.value;
    console.log(value);
  }

  // 添加管理员弹层(取消)
  handleCancel(e){
    this.setState({
      visible: false,
      username:'',
      status: '',
    })
  }

  handleCellchange(record){
      console.log(record)
  }

  // 编辑用户
  handleEditModal(){
           this.setState({
               userVisible: !this.state.userVisible
           })
  }

  // 编辑用户(确定)
  handleEditOk(){
            const PATH ="api/manager/edit";
            const request = new Request();
            const token = sessionStorage.getItem('token');
            request.setPATH(PATH);
            request.setOPTIONS('POST', token, JSON.stringify(
              {
                admin_id: this.state.admin_id
              })
            );
            request.fetch()
            .then(res => {
                console.info(res)
                if(res.data.code === 200){
                    message.info(res.data.message);
                      this.setState({
                        userVisible: !this.state.userVisible,
                    })
                      console.log(res)
                }else if(res.data.code === 401){
                  message.warning(res.data.info);
                  window.location.href = '/login';
                } else {
                  message.warning(res.data.info);
                }
            })
            .catch(err => {
                console.error(err);
            })

  }

  // 编辑用户(取消)
  handleEditCancel(){
      this.setState({
               userVisible: false
      })
  }

  //批量禁用
  showUnuse(){
      const group = sessionStorage.getItem('rowKeys');
      const arr = group.split(',');
      const brr = [];
      arr.map((item) => (
        brr.push(this.state.manageList[item].admin_id)
      ))

      const PATH = "api/manager/enables";
      const request = new Request();
      const token = sessionStorage.getItem('token');
      request.setPATH(PATH);
      request.setOPTIONS('GET', token, JSON.stringify({}));
      request.fetch()
      .then(res => {
      if(res.data.code === 200){
        message.info(res.data.message);
        this.setState({
          admin_ids: brr,
          status: '3'
        })

      }else if(res.data.code === 401){
              message.warning(res.data.info);
              window.location.href = '/login';
      } else {
              message.warning(res.data.info);
            }
      })
      .catch(err => {
            console.error(err);
      })
  }
// 批量启用
showInuse(){
      const group = sessionStorage.getItem('rowKeys');
      const arr = group.split(',');
      const brr = [];
      arr.map((item) => (
        brr.push(this.state.manageList[item].admin_id)
      ))

      const PATH = "api/manager/enables";
      const request = new Request();
      const token = sessionStorage.getItem('token');
      request.setPATH(PATH);
      request.setOPTIONS('GET', token, JSON.stringify({}));
      request.fetch()
      .then(res => {
      console.info(res)
      if(res.data.code === 200){
        message.info(res.data.message);
        this.setState({
          admin_ids: brr,
          status: '1'
        })

      }else if(res.data.code === 401){
              message.warning(res.data.info);
              window.location.href = '/login';
      } else {
              message.warning(res.data.info);
            }
      })
      .catch(err => {
            console.error(err);
      })
  }


  // 重置密码
  handleResetModel(){
    const PATH = "api/manager/reset/{admin_id}";
    const request = new Request();
    const token = sessionStorage.getItem('token');
    request.setPATH(PATH);
    request.setOPTIONS('GET', token, JSON.stringify({}));
    request.fetch()
    .then(res => {
    console.info(res)
    if(res.data.code === 200){
      message.info(res.data.message);
      this.setState({
        visible: !this.state.visible,
      })
             console.log(res)

    }else if(res.data.code === 401){
            message.warning(res.data.info);
            window.location.href = '/login';
    } else {
            message.warning(res.data.info);
          }
    })
    .catch(err => {
          console.error(err);
    })
  }
  // 选择角色
  handleChange(){
      console.log('111')
  }

// 禁用一行
  handelDisableUser(){
    this.setState({
        disableUserVisible: !this.state.visible
    })
  }

  handleUserVisibleOk(){
    this.setState({
      disableUserVisible: false
    })
  }

  handleUserVisibleCancel(){
    this.setState({
      disableUserVisible: false
    })
  }

// 编辑用户弹出层--选择权限
  handleEditSelect(e){
      // console.log(e)
  }

  render(){

    const FormItemLayout = {
      labelCol:{xs:{span: 24},sm:{span:8}},
      wrapperCol:{xs:{span: 24},sm:{span:16}}
    }

        return (
          <div>
                <h4>管理员列表</h4>
                <div className={style['tab-btns']}>
                    <ButtonGroup>
                      <Button className={`${style.all} ${style.cur}`}>全部</Button>
                      <Button className={style['normal']}>正常</Button>
                      <Button className={style['lock']}>锁定</Button>
                      <Button className={style['stop']}>停用</Button>
                    </ButtonGroup>
                </div>
                <Row className={style['select_menu']}>
                        <span className={style['keywords']}>关键词：</span>
                        <Input  className={style['search']}
                                    placeholder="ID/用户名/姓名"
                                  />
                        <span className={style['role-text']}>用户角色：</span>
                        <Select style={{width: 120}} labelInValue  defaultValue={{key: '请选择'}} onChange={e => this.handleSelect(e)}>
                            <Option value="1">管理员</Option>
                            <Option value="2">超级管理员</Option>
                        </Select>
                        <Button type="primary" className={style['ensure']}>搜索</Button>

                        <Button className={style['start-using']} onClick={() => this.showUnuse()}>批量禁用</Button>
                        <Button className={style['start-using']} onClick={() => this.showInuse()}>批量启用</Button>
                        <Button className={style['plus']} icon="plus" type="primary" onClick={() => this.showModal()}>添加用户</Button>
                </Row>

                <Table className={style['manage-list']} rowSelection={rowSelection} dataSource={this.state.manageList} columns={this.state.columns} size="middle" bordered/>

                <Modal className="plus-modal"  title="添加用户"  visible={this.state.visible}   onOk={() => this.handleOk()}   onCancel={() => this.handleCancel()}>
                    <Form formlayout={this.state.formLayout}>
                        <FormItem {...FormItemLayout} label="用户名">
                            <Input className={style['user-name']} id="username" ref="userInp" onChange={e => this.handleUserName(e)}/>
                        </FormItem>
                        <FormItem {...FormItemLayout} label="真实户名" >
                            <Input className={style['real-name']} onChange={e => this.handleRealName(e)}/>
                        </FormItem>
                        <FormItem {...FormItemLayout} label="设置角色">
                          <Select style={{width: 200}} labelInValue  defaultValue={{key: '请选择'}} onChange={e => this.handleSelect(e)}>
                            <Option value="1">管理员</Option>
                            <Option value="2">超级管理员</Option>
                          </Select>
                        </FormItem>
                        <FormItem {...FormItemLayout} label="是否启用">
                              <RadioGroup className={style['radio-group']} onChange={e => this.handleRadio(e)}>
                                 <Radio value="1">启用</Radio>
                                 <Radio value="3">禁用</Radio>
                              </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal className="plus-modal"  title="编辑用户"  visible={this.state.userVisible}   onOk={() => this.handleEditOk()}   onCancel={() => this.handleEditCancel()}>
                    <Form formlayout={this.state.formLayout}>
                        <FormItem {...FormItemLayout} label="用户名称">
                            <Input className={style['user-name']}  />
                        </FormItem>
                        <FormItem {...FormItemLayout} label="选择权限">
                          <Select style={{width: 200}} labelInValue  defaultValue={{key:'请选择'}} onChange={e => this.handleEditSelect(e)}>
                            <Option value="1">管理员</Option>
                            <Option value="2">超级管理员</Option>
                          </Select>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal className="plus-modal" title="提示信息" visible={this.state.disableUserVisible}  onOk={() => this.handleUserVisibleOk()}
                onCancel={() => this.handleUserVisibleCancel()}>
                  {this.state.disableUserMsg}
                </Modal>

          </div>
            )
  }

}

export default ManageList;