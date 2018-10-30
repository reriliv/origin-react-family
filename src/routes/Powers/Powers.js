import React,{Component} from 'react';
import style from './Powers.css';
import {Button, Icon, Table, Row, Col, Modal, Form, Select, Radio, message, Input, Upload, Switch} from 'antd';
import Request from '../../utils/request';
import setListKey from '../../utils/setListKey';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === '',
    name: record.name,
  }),
};

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class PowerList extends Component{

  constructor(props){
    super(props);
    this.state = {
      manageList: [],
      childList: [],
      rangeNum: '',
      visible: false,
      useVisible: false,
      useMsg: ' 启用菜单吗？',
      formLayout: 'hrizontal',
      columns:[
        {
           title: '菜单名称',
           dataIndex: 'title',
           key: 'title',
        },
        {
           title: '排序',
           dataIndex: 'sort',
           key: 'sort',
           render:(e) => {
             return(
                <Input className={style['range-inp']} value={e}/>
              )
           }
        },
        {
           title: '状态',
           dataIndex: 'status',
           key: '',
           render:(e) => {
              return(
                <Switch className={style['switch']} checkedChildren="正常" unCheckedChildren="禁用" checked={e === 1 ? true : false}></Switch>
              )
           }
        },
        {
          title: '操作',
          dataIndex: '',
          key: '',
          render:() => {
            return (
              <div>
                <Button className={style['edit']} icon="edit" onClick={() => this.handleEdit()}>编辑</Button>
                <Button className={style['add']} icon="plus" onClick={() => this.handleAddmenu()}>添加子菜单</Button>
                <Button className={style['del']} onClick={() => this.handleDelMenu()}><Icon type="minus"/>删除</Button>
              </div>
            );
          }
        }
      ],
    };
  }

  componentDidMount(){
    const PATH = "/api/menu/lists";
    const request = new Request();
    const token = sessionStorage.getItem('token');
    request.setPATH(PATH);
    request.setOPTIONS('POST', token, JSON.stringify({}));
    request.fetch()
    .then(res => {
      console.info(res.data.data)
      if(res.data.code === 200){
        this.setState({
          manageList: setListKey(res.data.data.data),
        });
      }else if(res.data.code === 401){
        message.warning(res.data.info)
        window.location.href = '/login';
      }
    })
    .catch(err => {
      console.error(err)
    });
  }

  handleEdit(){
    this.setState({
      visible: !this.state.visible
    })
  }

// 添加子菜单
  handleAddmenu(){
    this.setState({
      visible: !this.state.visible
    });
  }

  showModal(){
    this.setState({
      visible: !this.state.visible
    });
  }

  handleOk (e){
    this.setState({
      visible: false,
    });
  }

  handleCancel(e){
    this.setState({
      visible: false,
    });
  }

  handleUseOk (e){
    this.setState({
      useVisible: false,
    });
  }

  showUseModal(){
    this.setState({
      useVisible: !this.state.useVisible
    })
  }

  handleUseCancel(e){
    this.setState({
      useVisible: false,
    });
  }

  showEnableModal(){
    this.setState({
      useVisible: !this.state.useVisible,
      useMsg: '禁用该菜单以及该菜单下的所有子菜单吗？'
    })
  }

  showDeleteModal(){
    this.setState({
      useVisible: !this.state.useVisible,
      useMsg: '确定删除该菜单吗？'
    })
  }

  handleDelMenu(){
     this.setState({
      useVisible: !this.state.useVisible,
      useMsg: '确定删除该菜单吗？'
    })
  }

  handleMenuClick(e){
    console.log('test111')
  }

  // 编辑弹窗--选择所属菜单
  handleEditSelect(e){
    // const menuName = e.label;
  }

  render(){

    const FormItemLayout = {
      labelCol: {xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: {xs: { span: 24 }, sm:{ span: 16 }}
    }


    return (
      <div>
        <h4>菜单管理</h4>
        <Row className={style['select_menu']}>
          <Col span={12}>
            <Button className={style['top-btn']} onClick={() => this.showModal()}><Icon type="plus"/>添加菜单</Button>
            <Button className={style['top-btn']} onClick={() => this.showUseModal()}><Icon type="check"/>启用</Button>
            <Button className={style['top-btn']} onClick={() => this.showEnableModal()}><Icon type="minus"/>禁用</Button>
            <Button className={style['top-btn']} onClick={() => this.showDeleteModal()}><Icon type="close"/>删除</Button>
           </Col>
        </Row>

        <Table
          className={style['power-list']}
          rowSelection={rowSelection}
          dataSource={this.state.manageList}
          columns={this.state.columns}
          bordered
        />

        <Modal className={style['plus-modal']}  title="添加菜单"  visible={this.state.visible}   onOk={() => this.handleOk()}   onCancel={() => this.handleCancel()}>
             <Form formlayout={this.state.formLayout}>
                <FormItem {...FormItemLayout} label="所属菜单">
                    <Select style={{width: 200}} labelInValue  defaultValue={{key: this.state.key}} onChange={e => this.handleEditSelect(e)}>
                    <Option value="1">订单管理</Option>
                    <Option value="2">系统管理</Option>
                  </Select>
                </FormItem>
                <FormItem {...FormItemLayout} label="菜单名称" >
                    <Input className={style['menu-name']}/>
                </FormItem>
                <FormItem {...FormItemLayout} label="图标设置">
                     <Input className={style['icon-name']}/>
                     <Input className={style['system-icon-name']}/>
                     <Upload {...props}><Button className={style['search-icons']}>系统图标</Button></Upload>
                </FormItem>
                <FormItem {...FormItemLayout} label="菜单链接">
                      <Input className={style['menu-name']}/>
                </FormItem>
                 <FormItem {...FormItemLayout} label="状态设置">
                      <RadioGroup className={style['radio-group']}>
                         <Radio value="1">启用</Radio>
                         <Radio value="2">禁用</Radio>
                      </RadioGroup>
                </FormItem>
                 <FormItem {...FormItemLayout} label="排序">
                       <Input className={style['menu-name']}/>
                </FormItem>
          </Form>
        </Modal>

        <Modal className={style['in-use']} title="提示信息" visible={this.state.useVisible} onOk={() => this.handleUseOk()} onCancel={() => this.handleUseCancel()}>
          {this.state.useMsg}
        </Modal>
      </div>
    )
  }

}
export default PowerList;