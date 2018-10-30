import React, {Component} from 'react';
import { Link } from 'dva/router';
import {connect} from 'dva';
import { Layout, Menu, Icon, Dropdown, Tooltip, Badge } from 'antd';
import PropTypes from 'prop-types';
import Logo from './../assets/logo.png';
import style from './Page.css';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const menu = (
  <Menu className={style['news']}>
    <Menu.Item key="0">
      <Link to='#'>最新消息1</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to='#'>最新消息2</Link>
    </Menu.Item>
  </Menu>
);

const userMenu = (
  <Menu className={style['user-menu']}>
    <Menu.Item key="0">
      <Link className={style['info']}  to='#'>基本资料</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link className={style['reset-code']}  to='#'>修改密码</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <Link className={style['exit']} to='#'>退出</Link>
    </Menu.Item>
  </Menu>
);

class Page extends Component {

  constructor(props){
    super(props);
    // console.log(this, '当前');
    // console.log(React, 'react');
    this.state = {
      SubList: {
        sub1: '订单管理',
        sub2: '系统管理',
        sub3: '日志管理',
      },
      KeyList: [
        '订单列表',
        '账号管理',
        '权限管理',
        '部门管理',
        '登录日志'
      ],
      hasMessage: true,
      collapsed: false,
    }
  }

  /*handleRedirect(e){
    const URL = e.item.props.url;
    console.log(URL);
    this.props.dispatch({
      type: 'page/redirect',
      payload: {
        url: URL
      }
    });
  }*/

  menuCollapsed(){
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleLocation(e, activeSub, activeKey){
    const URL = e.item.props.to;
    console.log(activeSub);
    localStorage.setItem('activeKey', activeKey);
    localStorage.setItem('activeSub', activeSub);
    localStorage.setItem('URL', URL);
    console.log(URL);
    window.location.href = URL;
  }

  render(){
    const PATHNAME = window.location.pathname;
    console.log(PATHNAME);
    let [activeSub, activeKey] = ['', '',];
    console.log(localStorage.getItem('URL') !== '/');
    if(localStorage.getItem('URL') !== '/'){
      [
        activeSub,
        activeKey
      ] = [
        localStorage.getItem('activeSub') || '',
        localStorage.getItem('activeKey') || '',
      ];
    }
    // activeSub='sub1' activeKey={0}
    return (
      <Layout style={{height: window.innerHeight+'px'}}>
        <Header className={style['layout-header']}>
          <div className={style['header-left']}>
            <div className={style['header-logo']}>
              <img src={Logo} alt='logo'/>
            </div>
            <Tooltip placement='bottom' title={this.state.collapsed ? '展开' : '收起'}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={() => this.menuCollapsed()} className={style['menu-toggle']}></Icon>
            </Tooltip>
            <Tooltip placement='bottom' title='重新加载'>
              <Icon type='reload' className={style['reload']} onClick={() => window.location.href = window.location.href}></Icon>
            </Tooltip>
          </div>
          <div className={style['header-right']}>
            <div className={style['menu-down']}>
              <Dropdown overlay={menu} placement={'bottomCenter'}>
                <Link to="#" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '100%'}}>
                  {
                    this.state.hasMessage ?
                    <Badge dot>
                      <Icon type='mail' theme="filled" className={style['mail']} />
                    </Badge>
                    :
                    <Icon type='mail' theme="filled" className={style['mail']} />
                  }
                </Link>
              </Dropdown>
            </div>
            <div className={style['user']}>
              <Dropdown overlay={userMenu} placement={'bottomCenter'}>
                <Link to="#" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '100%'}}>
                  <span className={style['username']}>jinma</span>
                  {/*<Icon type="caret-down" theme="filled" className={style['user-caret-down']}/>*/}
                </Link>
              </Dropdown>
            </div>
            <div style={{fontSize: 14, color: '#fff',}}>|</div>
            <div style={{color: '#fff', fontSize: 14}}>超级管理员</div>
            <Tooltip placement='bottom' title='主题'>
              <Icon type='bars' className={style['header-bars']}></Icon>
            </Tooltip>
          </div>
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            width={220}
          >
            <Menu
              defaultSelectedKeys={[`${activeKey}`]}
              defaultOpenKeys={[`${activeSub}`]}
              style={{ height: '100%', borderRight: 0 }}
              theme='dark'
              mode='inline'
            >
              <SubMenu key="sub1" title={<div><Icon type="laptop" /><span>订单管理</span></div>}>
                <Menu.Item key="0" to='/product' onClick={e => this.handleLocation(e, 'sub1', 0)}>订单列表</Menu.Item>
              </SubMenu>

              <SubMenu key="sub2" title={<div><Icon type="database" /><span>系统管理</span></div>}>
                <Menu.Item key="1" to='/manage' onClick={e => this.handleLocation(e, 'sub2', 1)}>用户管理</Menu.Item>
                <Menu.Item key="2" to='/powers' onClick={e => this.handleLocation(e, 'sub2', 2)}>菜单管理</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<div><Icon type="tags" /><span>日志管理</span></div>}>
                <Menu.Item key="3" to='/log' onClick={e => this.handleLocation(e, 'sub3', 3)}>日志详情</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: 15, minWidth: 1000, overflow: 'auto' }}>
            <Content style={{ background: '#fff', padding: 15, margin: 0, width: '100%', height: '100%'}}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

}

Page.propTypes = {
  activeSub: PropTypes.string,
  activeKey: PropTypes.number
};

export default connect()(Page);
