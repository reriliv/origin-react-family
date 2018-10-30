import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Avatar,Button } from 'antd';
import PropTypes from 'prop-types';
import Logo from '../../assets/logo.png';
import style from './index.css';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Page extends Component {

  constructor(props){
    super(props);
    console.log(this, '当前');
    console.log(React, 'react');
    this.state = {
      SubList: {
        sub1: '商品管理',
        sub2: '订单管理',
        sub3: '系统管理',
        sub4: '日志管理',
      },
      KeyList: [
        '商品列表',
        '订单列表',
        '订单列表',
        '账号管理',
        '权限管理',
        '部门管理',
        '登录日志'
      ],
    }
  }

  render(){
    const { SubList, KeyList } = this.state;
    const { activeSub, activeKey } = this.props;
    console.log(activeKey);
    return (
      <Layout style={{height: window.innerHeight+'px'}}>
        <Header style={{padding: '0'}}>
           <h1 style={{width: 200,height:'100%',display: 'inline-block',margin: 0,float:'left',textAlign: 'center'}}><img style={{marginBottom: 10}} src={Logo}/></h1>
           <div style={{width: '85%',height: '100%',display:'inline-block',float: 'left'}} >
             <Icon type="menu-fold" style={{ display: 'inline-block',marginLeft: 24, marginRight: 10, marginTop: 20, fontSize: 20, color: '#fff', }}/>
             <Icon type="reload" style={{ fontSize: 20, color: '#fff',display: 'inline-block',marginLeft: 24, marginRight: 10, marginTop: 20}} />
             <Icon type="bars" style={{ fontSize: 20, color: '#fff',display: 'inline-block',marginLeft: 24,marginRight: 10, marginTop: 20,float: 'right'}} />
             <span style={{display: 'inline-block', marginLeft: 15, color: '#fff',float: 'right'}}>超级管理员</span>
             <span style={{display: 'inline-block', marginLeft: 15, color: '#fff',float: 'right'}}>jinma</span>
             <Icon type="mail" style={{ fontSize: 20, color: '#fff',display: 'inline-block',marginLeft: 24,marginRight: 10,marginTop: 20,float: 'right'}} />
           </div>
        </Header>
        <Layout>
          <Sider>
            <Menu
              mode="inline"
              defaultSelectedKeys={[`${activeKey}`]}
              defaultOpenKeys={[`${activeSub}`]}
              style={{ height: '100%', borderRight: 0 }}
              theme='dark'
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />商品管理</span>}>
                <Menu.Item key="1"><Link to="/goods">商品列表</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />订单管理</span>}>
                <Menu.Item key="2"><Link to='/product'>订单列表</Link></Menu.Item>
                <Menu.Item key="3"><Link to='/'>订单列表</Link></Menu.Item>
              </SubMenu>

              <SubMenu key="sub4" title={<span><Icon type="database" />系统管理</span>}>
                <Menu.Item key="6"><Link to='/'>账号管理</Link></Menu.Item>
                <Menu.Item key="7"><Link to='/'>权限管理</Link></Menu.Item>
                <Menu.Item key="8"><Link to='/'>部门管理</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="tags" />日志管理</span>}>
                <Menu.Item key="4"><Link to='/'>登录日志</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
             <div style={{width: '100%'}}>
                <Breadcrumb style={{width: '50%',margin: '16px 0',display: 'inline-block'}}>
                  <Breadcrumb.Item>{SubList[activeSub]}</Breadcrumb.Item>
                  <Breadcrumb.Item>{KeyList[activeKey]}</Breadcrumb.Item>
                </Breadcrumb>
                <Icon type="search" style={{ fontSize: 28, color: '#999',display: 'inline-block',marginLeft: 20,marginRight: 10,marginTop: 12,float: 'right'}} />
                 <Button type='primary' style={{float: 'right',marginTop: 10}}>导出Excel</Button>
             </div>

            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

Page.propTypes = {
  activeSub: PropTypes.string.isRequired,
  activeKey: PropTypes.number.isRequired
};

export default Page;
