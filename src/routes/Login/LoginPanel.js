import React, {Component} from 'react';
import { Icon, Input, Button, message, Checkbox } from 'antd';
// import { Link } from 'dva/router';
import style from './LoginPanel.css';
import CanvasBackground from './CanvasBackground';
// import Particles from 'react-particles-js';
import Request from '../../utils/request';

const initState = () => {
  const [
    data,
    rotate,
    fz,
    color
  ] = [
    getRandom(109, 48, 4),
    getRandom(65, -65, 4),
    getRandom(24, 26, 4),
    [
      getRandom(51, 200, 3),
      getRandom(51, 200, 4),
      getRandom(51, 100, 3),
      getRandom(51, 100, 3)
    ]
  ];

  let code = '';
  for(let item of data){
    code += String.fromCharCode(item > 57 && item < 84 ? item + 7 : ( item < 57 ? item : item + 13 ))
  }

  return {
    data: data,
    rotate: rotate,
    fz: fz,
    color: color,
    code: code.toUpperCase()
  };
}

const getRandom = (max, min, num) => {
  const asciiNum = ~~(Math.random()*(max-min+1)+min)
  if(!Boolean(num)){
    return asciiNum
  }
  const arr = []
  for(let i = 0; i < num; i++){
    arr.push(getRandom(max, min))
  }
  return arr
}

const canvas = () => {
  // const { getRandom } = this
  const canvas = document.querySelector('#bgi')
  let ctx = canvas.getContext('2d')
  canvas.height = canvas.height
  // ctx.clearRect(0, 0, canvas.width(), canvas.height())
  ctx.strokeStyle = `rgb(${getRandom(100,10,3).toString()})`
  for(let i = 0; i< 7; i++) {
    ctx.lineTo(getRandom(200,0),getRandom(200,10))
    ctx.moveTo(getRandom(200,0),getRandom(200,0))
    ctx.stroke();
  }
}

class LoginPanel extends Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      isRemember: sessionStorage.getItem('isRemember') === 'true' ? true : false,
      ...initState(),
      inputCode: '',
      isChecked: false,
      showChecked: false
    }
  }

  handleForgetPassward(){
    console.log('忘记密码');
  }

  handleLogin(){
    // message.success('登录');
    const username = this.state.username;
    const password = this.state.password;
    const inputCode = this.state.inputCode.toUpperCase();
    const code = this.state.code.toUpperCase();
    const isRemember = sessionStorage.getItem('isRemember');
    console.log(username, '用户名');
    console.log(password, '密码');
    if(username === ''){
      message.warning('请输入用户名');
    } else if(password === ''){
      message.warning('请输入密码');
    } else if(inputCode === ''){
      message.warning('请输入验证码');
    } else if(inputCode !== code){
      message.warning('验证码不正确');
    } else {
      isRemember ? sessionStorage.setItem('username', username) : sessionStorage.removeItem('username');
      // const _this = this;
      const request = new Request();
      const PATH = '/api/login/login';
      let reqData = {
        user_name: username,
        password: password
      }
      request.setPATH(PATH);
      request.setOPTIONS('POST', '', JSON.stringify(reqData));
      request.fetch()
      .then(res => {
        console.log(res);
        if(res.data.code === 200){
          message.success('登录成功', 1, () => {
            sessionStorage.setItem('token', res.data.token);
            window.location.href = '/product';
          });
        } else {
          message.warning(res.data.info);
        }
      })
      .catch(err => console.error(err));
    }
  }

  handleInputCode(e){
    console.log(e.target.value.toUpperCase() === this.state.code);
    let value = e.target.value.replace(/[^\w\.\/]/ig, '');
    value.replace(/[\`\~\!\@\#\$\%\^\&\*\+\\\]\}\{\'\;\:\"\/\.\,\>\<\s\|\=\-\?]/g, '');
    value.replace(/[^\d]/g, '');
    value.replace(/\D/g, '');
    if(value === '.') value = '';
    if(value === '/') value = '';
    if(value.includes('.')) value = value.substring(0, value.indexOf('.'));
    if(value.includes('/')) value = value.substring(0, value.indexOf('/'));
    console.log(value.toUpperCase());
    if(value.toUpperCase() === this.state.code){
      this.setState({
        inputCode: value,
        showChecked: true,
        isChecked: true
      });
    } else {
      this.setState({
        inputCode: value,
        showChecked: true,
        isChecked: false
      });
    }
  }

  handleUserName(e){
    console.log(e.target.value);
    this.setState({
      username: e.target.value
    });
  }

  handlePassWord(e){
    console.log(e.target.value);
    this.setState({
      password: e.target.value
    });
  }

  handleRemember(e){
    console.log(e.target.checked, '记住用户名');
    sessionStorage.setItem('isRemember', e.target.checked);
    if(!e.target.checked){
      sessionStorage.removeItem('username');
    } else {
      sessionStorage.setItem('username', '');
    }
    this.setState({
      isRemember: e.target.checked
    });
  }

  componentDidMount(){
    if(sessionStorage.getItem('isRemember')){
      this.setState({
        username: sessionStorage.getItem('username') || ''
      });
    }
  }

  render(){
    const { rotate, fz, color } = this.state;
    return (
      <div className={style['page-content']} style={{width: window.innerWidth+'px', height: window.innerHeight+'px',}}>
        <div className={style['login-background']}>
          <img className={style['login-background-image']} src="/src/assets/background.jpg" alt="登录背景"/>
          <CanvasBackground className={style['login-particle']}/>
        </div>
        <div className={style['login-content']}>
          <h2 className={style['login-content-title']}>后台管理系统</h2>

          <Input
            prefix={<Icon type="user" style={{ color: '#8b8b8b' }} />}
            defaultValue={this.state.isRemember ? sessionStorage.getItem('username') : ''}
            onChange={e => this.handleUserName(e)}
            placeholder="Username"
            className={style['login-username']}
          />

          <Input
            prefix={<Icon type="lock" style={{ color: '#8b8b8b' }} />}
            onChange={e => this.handlePassWord(e)}
            type="password"
            placeholder="Password"
            className={style['login-password']}
          />

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}} >
            <Input
              prefix={
                this.state.showChecked
                ?
                this.state.isChecked
                ?
                <Icon type="check-circle" theme="filled" style={{color: '#179a35'}} />
                :
                <Icon type="close-circle" theme="filled" style={{color: '#bf4443'}} />
                :
                <Icon type="code" style={{ color: '#8b8b8b' }} />
              }
              type='text'
              placeholder="验证码"
              onChange={e => this.handleInputCode(e)}
              value={this.state.inputCode}
              minLength={4}
              maxLength={4}
              className={style['login-code']}
            />
            <div className={style['vcodewrap']} >
              <canvas id="bgi" className={style['bgi']} width="200" height="200"></canvas>
              {this.state.data.map((v,i) => 
                <div 
                  key={i}
                  className={style['itemStr']}
                  style={{
                    transform:`rotate(${rotate[i]}deg)`,
                    fontSize: `${fz[i]}px`,
                    color: `rgb(${color[i].toString()})`,
                    fontWeight: 'bold'
                  }}
                  // onMouseEnter={() => this.setState({refresh:true})}
                >
                  { String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 )) }
                </div>  
              )}
              <div
                className={style['mask']}
                onClick={() => {
                  this.setState({...initState()})
                  canvas()
                }}
                // onMouseLeave={() => {this.setState({refresh: false})}}
                // onMouseOut={() => {this.setState({refresh: false})}}
              > 看不清？点击刷新  
              </div> 
            </div>
          </div>

          <div style={{width: '100%', textAlign: 'left'}}>
            <Checkbox
              onChange={e => this.handleRemember(e)}
              defaultChecked={this.state.isRemember}
              className={style['login-remember-action']}
            >记住用户名</Checkbox>
            {/*<Link to='#'> 忘记密码？ </Link>*/}
          </div>

          <Button block={true} onClick={() => this.handleLogin()} type="primary"> 登录<Icon type="key" theme="outlined" /> </Button>

        </div>
      </div>
    );
  }

}

export default LoginPanel;