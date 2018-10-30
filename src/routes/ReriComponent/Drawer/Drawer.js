import React, {Component} from 'react';
import { Icon } from 'antd';
import style from './Drawer.css';

class ReriDrawer extends Component{

  constructor(props){
    super(props);
    this.state = {
      width: 256,
      height: 256
    };
    console.log(this.props, 'reri drawer');
  }

  componentDidUpdate(){
    if(!this.props.Visible){
      document.querySelector(`.${style['draw-wrapper']}`).style.transform = 'translateX(100%)';
      setTimeout(function(){
        document.querySelector(`.${style['draw-content']}`).className = style['draw-content'];
      }, 500);
    } else {
      document.querySelector(`.${style['draw-wrapper']}`).style.transform = '';
      document.querySelector(`.${style['draw-content']}`).className = `${style['draw-open']} ${style['draw-content']}`;
      // setTimeout(function(){
      // }, 500);
    }
  }

  /*componentDidMount(){
    console.log(style['draw-open']);
    if(!this.props.Visible){
      document.querySelector(`.${style['draw-wrapper']}`).style.transform = '';
    } else {
      document.querySelector(`.${style['draw-wrapper']}`).style.transform = 'translateX(100%)';
    }
  }*/

  render(){
    const {
      Visible,
      masked,
      title,
      onClose,
      maskClosable,
    } = this.props;
    console.log(title);
    console.log('是否隐藏', !Visible);
    /*if(!Visible){
      document.querySelector(`.${style['draw-wrapper']}`).style.transform = 'translateX(100%)';
    }*/
    return (
      <div className={style['draw-content']}>
        {
          maskClosable ? <div className={!masked ? style['draw-shadow'] : `${style['draw-shadow']} ${style['draw-shadow-black']}`} onClick={onClose}></div>
          :
          <div className={!masked ? style['draw-shadow'] : `${style['draw-shadow']} ${style['draw-shadow-black']}`}></div>
        }
        <div className={style['draw-wrapper']} style={{transform: 'translateX(100%)'}}>
          <div className={style['draw-header']}>
            <div className={style['draw-header-title']}>
              <h3 style={{margin: 0, fontSize: 20}}>{title}</h3>
            </div>
            <div className={style['draw-header-close']} onClick={onClose}><Icon type="close" theme="outlined" /></div>
          </div>
          <div className={style['draw-body']}>
          {
            this.props.children
          }
          </div>
        </div>
      </div>
    );
  }

}

export default ReriDrawer;
